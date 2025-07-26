import axios, { InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { API_BASE_URL } from './config';

type JwtPayload = {
    exp: number;
};

let logoutCallback: (() => void) | null = null;

export function setLogoutCallback(cb: () => void) {
    logoutCallback = cb;
}

function isAccessTokenExpiringSoon(token: string): boolean {
    try {
        const decoded = jwtDecode<JwtPayload>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime + 60;
    } catch {
        return true;
    }
}

async function refreshAccessToken(): Promise<string | null> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;

    try {
        const res = await axios.post(`${API_BASE_URL}/api/auth/refresh`, null, {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        });

        const newAccessToken = res.data.access_token;
        localStorage.setItem('access_token', newAccessToken);
        return newAccessToken;
    } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (logoutCallback) {
            logoutCallback();
        } else {
            window.location.href = '/login';
        }
        return null;
    }
}

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
});

axiosClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        let token = localStorage.getItem('access_token');

        if (token && isAccessTokenExpiringSoon(token)) {
            const newToken = await refreshAccessToken();
            if (newToken) token = newToken;
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosClient;

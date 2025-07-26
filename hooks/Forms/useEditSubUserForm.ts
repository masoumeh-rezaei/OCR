'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { getSubUserById, updateSubUser } from '@/lib/api/auth';
import type { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';

interface SubUserForm {
    id: string;
    email: string;
    name: string;
    last_name: string;
    position: string;
    role: string;
}

export function useEditSubUserForm(id: string) {
    const router = useRouter();
    const t = useTranslations('editForm');

    const [form, setForm] = useState<SubUserForm>({
        id: '',
        email: '',
        name: '',
        last_name: '',
        position: '',
        role: '',
    });

    const [errors, setErrors] = useState<Partial<SubUserForm>>({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        void (async () => {
            try {
                const data = await getSubUserById(id);
                setForm({
                    id: data.id,
                    email: data.email || '',
                    name: data.name || '',
                    last_name: data.last_name || '',
                    position: data.position || '',
                    role: data.role || '',
                });
            } catch (error) {
                const err = error as AxiosError<{ msg?: string }>;
                toast.error(err.response?.data?.msg || t('fetch_error'));
            } finally {
                setLoading(false);
            }
        })();
    }, [id, t]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const validate = () => {
        const newErrors: Partial<SubUserForm> = {};
        if (!form.name.trim()) newErrors.name = t('required_name');
        if (!form.last_name.trim()) newErrors.last_name = t('required_last_name');
        if (!form.role.trim()) newErrors.role = t('required_role');
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setSubmitting(true);
        try {
            await updateSubUser({
                id: form.id,
                name: form.name,
                last_name: form.last_name,
                position: form.position,
                role: form.role,
            });

            toast.success(t('update_success'));
            router.push('/user');
        } catch (error) {
            const err = error as AxiosError<{ msg?: string }>;
            toast.error(err.response?.data?.msg || t('update_error'));
        } finally {
            setSubmitting(false);
        }
    };

    return {
        form,
        errors,
        loading,
        submitting,
        handleChange,
        handleSubmit,
    };
}

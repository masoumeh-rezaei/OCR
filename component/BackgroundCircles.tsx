// components/ui/BackgroundCircles.tsx
'use client';

export default function BackgroundCircles() {
  return (
    <div>
      {/* دایره بزرگ */}
      <div
        className="absolute w-[600px] h-[600px] left-[-100px] bottom-[20%] rounded-full z-10"
        style={{
          background: 'radial-gradient(circle at 35% 35%, #3b82f6, #1e3a8a 70%, #1e293b)',
          boxShadow: `
            inset 20px 20px 45px rgba(255,255,255,0.1),
            inset -20px -20px 45px rgba(0,0,0,0.35),
            0 50px 90px rgba(0,0,0,0.35)
          `,
          animation: 'fadeIn 0.6s ease-out forwards, pulseSoft 3s ease-in-out infinite',
        }}
      />

      {/* دایره میانی */}
      <div
        className="absolute w-[300px] h-[300px] left-[-120px] top-[60%] rounded-full shadow-[inset_20px_20px_35px_rgba(255,255,255,0.15),inset_-15px_-15px_35px_rgba(0,0,0,0.4),0_45px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm z-20"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #3b82f6, #1e40af 60%, #0f172a)',
        }}
      />

      {/* دایره کوچک */}
      <div
        className="absolute w-[200px] h-[200px] right-[10%] bottom-[20%] rounded-full z-30"
        style={{
          background: 'radial-gradient(circle at 40% 40%, #1d4ed8, #1e3a8a 60%, #0f172a)',
          boxShadow: `
            inset 10px 10px 25px rgba(255,255,255,0.15),
            inset -10px -10px 25px rgba(0,0,0,0.4),
            0 28px 50px rgba(0,0,0,0.45)
          `,
          animation: 'fadeIn 0.6s ease-out forwards, pulseSoft 3s ease-in-out infinite',
        }}
      />
    </div>
  );
}

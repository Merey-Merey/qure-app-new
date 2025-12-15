import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/onboarding', { replace: true });
    }, 800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div 
      className="min-h-screen w-screen flex items-center justify-center bg-background overflow-hidden"
      style={{
        background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
      }}
    >
      <div className="w-full h-screen flex flex-col items-center justify-center p-8 md:p-10 lg:p-12">
        <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-3xl mx-auto">
          <img
            src="/assets/images/logo.png" 
            alt="Qure Logo"
            className="h-20 w-20 md:h-24 md:w-24 lg:h-28 lg:w-28 object-contain"
          />
          
          <h1
            className="text-[48px] md:text-[56px] lg:text-[60px] font-bold leading-[90%] tracking-[-0.03em] text-center px-6 md:px-8"
            style={{
              fontFamily: 'Manrope, sans-serif',
              color: '#2B865A',
            }}
          >
            Qure
          </h1>
        </div>
      </div>

      <style>{`
        @media (max-width: 1023px) {
          .desktop-first {
            padding: 1.5rem 1rem !important;
          }
          .logo-mobile {
            height: 64px !important;
            width: 64px !important;
          }
          .title-mobile {
            font-size: 36px !important;
            line-height: 95% !important;
            padding-left: 0.75rem !important;
            padding-right: 0.75rem !important;
          }
        }
        @media (max-width: 640px) {
          .title-mobile {
            font-size: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
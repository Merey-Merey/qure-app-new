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
      <div className="w-full h-screen flex flex-col items-center justify-center p-12 lg:p-16 xl:p-20">
        <div className="flex flex-col items-center justify-center space-y-12 w-full max-w-4xl mx-auto">
                    <img
            src="/assets/images/logo.png" 
            alt="Qure Logo"
            className="h-32 w-32 lg:h-40 lg:w-40 xl:h-40 xl:w-40 object-contain"
          />
          
          <h1
            className="text-[62px] lg:text-[80px] xl:text-[70px] font-bold leading-[90%] tracking-[-0.03em] text-center px-8 lg:px-12"
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
            padding: 2rem 1rem !important;
          }
          .logo-mobile {
            height: 80px !important;
            width: 80px !important;
          }
          .title-mobile {
            font-size: 48px !important;
            line-height: 95% !important;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
        @media (max-width: 640px) {
          .title-mobile {
            font-size: 40px !important;
          }
        }
      `}</style>
    </div>
  );
}

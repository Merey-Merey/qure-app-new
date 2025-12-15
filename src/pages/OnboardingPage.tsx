import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'iconoir-react';

const onboardingSlides = [
  {
    image: '/assets/images/onboarding-1.png',
    title: (
      <>
        Qure — <br className="md:hidden" /> больше чем аптека
      </>
    ),
    description:
      'Ваш личный помощник в заботе о здоровье. Лекарства, витамины и рецептурные препараты — быстро, удобно и безопасно.',
    button: 'Далее',
  },
  {
    image: '/assets/images/onboarding-2.png',
    title: 'Всё, что нужно в одном месте',
    description:
      'Для рецептурных препаратов просто загрузите фото рецепта — фармацевт проверит его и подготовит заказ.',
    button: 'Далее',
  },
  {
    image: '/assets/images/onboarding-3.png',
    title: 'Быстро, удобно, надёжно',
    description: (
      <>
        Оплата картой Kaspi или Halyk,{' '}
        <br className="md:hidden" />
        а также наличными при получении.{' '}
        <br className="md:hidden" />
        Доставка на дом или самовывоз из аптеки.
      </>
    ),
    button: 'Начать',
  },
];

export default function OnboardingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/welcome', { replace: true });
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const skipOnboarding = () => {
    navigate('/welcome', { replace: true });
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'linear-gradient(191.14deg, #FCF8F5 6.45%, #E0EFBD 94.12%)',
        }}
      >
        <div className="hidden md:block absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#2B865A]/5 to-transparent blur-2xl"></div>
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-60 h-60 rounded-full bg-gradient-to-tr from-[#E0EFBD]/30 to-transparent blur-2xl"></div>
        <div className="hidden md:block absolute top-10 right-10 w-48 h-48 rounded-full bg-gradient-to-br from-[#FCF8F5]/40 to-transparent blur-xl"></div>
      </div>

      <div className="relative z-10 w-full h-screen">
        <div className="hidden md:flex w-full h-full">
          <div className="w-[60%] h-full flex flex-col justify-between p-8 xl:p-16 2xl:p-20">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2.5">
                <span 
                  className="text-[#2B865A] font-semibold"
                  style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
                >
                  Qure Health Assistant
                </span>
              </div>
              
              <button
                onClick={skipOnboarding}
                className="flex items-center gap-2 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
                style={{ fontFamily: 'Manrope, sans-serif' }}
              >
                Пропустить
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-2xl mx-auto w-full">
              <div className="space-y-6 mb-8">
                <h1
                  className="text-3xl xl:text-4xl 2xl:text-5xl font-bold leading-tight"
                  style={{ 
                    color: '#222021', 
                    fontFamily: 'Manrope, sans-serif',
                    lineHeight: '1.1'
                  }}
                >
                  {onboardingSlides[currentSlide].title}
                </h1>
                <p
                  className="text-lg xl:text-xl leading-relaxed"
                  style={{ 
                    color: '#4D7059', 
                    fontFamily: 'Manrope, sans-serif',
                    lineHeight: '1.2'
                  }}
                >
                  {onboardingSlides[currentSlide].description}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2.5">
                    {onboardingSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'w-12 bg-[#2B865A]' 
                            : 'w-2 bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-[#2B865A] font-medium text-sm"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {currentSlide + 1} / {onboardingSlides.length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {currentSlide > 0 && (
                    <button
                      onClick={prevSlide}
                      className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#2B865A] text-[#2B865A] hover:bg-[#2B865A] hover:text-white transition-all duration-300 shadow-md"
                    >
                      <ArrowRight className="rotate-180" width={20} height={20} />
                    </button>
                  )}

                  <button
                    onClick={nextSlide}
                    className="group flex items-center justify-center gap-3 px-6 py-3 rounded-full bg-[#2B865A] text-white font-medium hover:bg-[#24704A] transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.03]"
                    style={{ 
                      fontFamily: 'Manrope, sans-serif', 
                      fontSize: '16px',
                      minWidth: '180px'
                    }}
                  >
                    {onboardingSlides[currentSlide].button}
                    <ArrowRight 
                      className="transform group-hover:translate-x-1.5 transition-transform" 
                      width={20} 
                      height={20} 
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[#4D7059]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: '#2B865A' }}>✓</span>
                </div>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px' }}>
                  Безопасные платежи
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center">
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '12px', color: '#2B865A' }}>✓</span>
                </div>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px' }}>
                  Быстрая доставка
                </span>
              </div>
            </div>
          </div>

          <div className="w-[40%] h-full relative flex items-center justify-center p-6 xl:p-10 2xl:p-12">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[60vh] h-[60vh] rounded-full bg-gradient-to-br from-transparent via-white/10 to-white/5"></div>
              </div>
              
              <img
                src={onboardingSlides[currentSlide].image}
                alt="Onboarding"
                className="relative z-10 w-full h-auto max-h-[60vh] object-contain animate-float"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/600x600?text=Onboarding')}
              />
              
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="md:hidden w-full h-full overflow-hidden">
          <div className="flex h-full flex-col justify-between p-4 pb-4">
            <div className="flex-1 flex flex-col items-center translate-y-4">
              <img
                src={onboardingSlides[currentSlide].image}
                alt="Onboarding"
                className="h-[300px] w-full object-contain animate-float"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x300?text=Onboarding')}
              />
              <h1
                className="mb-3 text-center text-[24px] font-bold leading-[110%] mt-3"
                style={{ color: '#222021', fontFamily: 'Manrope, sans-serif' }}
              >
                {onboardingSlides[currentSlide].title}
              </h1>
              <p
                className="text-center text-sm leading-[130%] w-[320px]"
                style={{ color: '#4D7059', fontFamily: 'Manrope, sans-serif' }}
              >
                {onboardingSlides[currentSlide].description}
              </p>
            </div>

            <div className="relative flex flex-col items-center -translate-y-4">
              <button
                onClick={nextSlide}
                className="group w-[150px] h-[36px] rounded-[80px] bg-[#2B865A] px-5 py-0 text-white font-medium shadow-[0_-1px_12px_0_#14652F33] flex items-center justify-center gap-1.5 hover:bg-[#25734c] transition-all duration-300 mb-8"
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', lineHeight: '120%' }}
              >
                {onboardingSlides[currentSlide].button}
                <ArrowRight 
                  className="transform group-hover:translate-x-1 transition-transform" 
                  width={14} 
                  height={14} 
                />
              </button>
            </div>

            <div className="mb-2 flex justify-center space-x-1.5 -translate-y-4">
              {onboardingSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-[#2B865A] w-6' 
                      : 'bg-[#F6F9F7] hover:bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
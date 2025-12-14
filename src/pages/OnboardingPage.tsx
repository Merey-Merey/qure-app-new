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
        <div className="hidden md:block absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-[#2B865A]/5 to-transparent blur-3xl"></div>
        <div className="hidden md:block absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-tr from-[#E0EFBD]/30 to-transparent blur-3xl"></div>
        <div className="hidden md:block absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#FCF8F5]/40 to-transparent blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full h-screen">
        <div className="hidden md:flex w-full h-full">
          <div className="w-[60%] h-full flex flex-col justify-between p-12 xl:p-20 2xl:p-24">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
            
                <span 
                  className="text-[#2B865A] font-semibold"
                  style={{ fontFamily: 'Manrope, sans-serif', fontSize: '18px' }}
                >
                  Qure Health Assistant
                </span>
              </div>
              
              <button
                onClick={skipOnboarding}
                className="flex items-center gap-2 text-[#2B865A] hover:text-[#24704A] transition-colors group"
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
              >
                Пропустить
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-3xl mx-auto w-full">
              <div className="space-y-8 mb-12">
                <h1
                  className="text-5xl xl:text-5xl 2xl:text-7xl font-bold leading-tight"
                  style={{ 
                    color: '#222021', 
                    fontFamily: 'Manrope, sans-serif',
                    lineHeight: '1.1'
                  }}
                >
                  {onboardingSlides[currentSlide].title}
                </h1>
                <p
                  className="text-2xl xl:text-1xl leading-relaxed"
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
                <div className="flex items-center gap-6">
                  <div className="flex gap-3">
                    {onboardingSlides.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 ${
                          index === currentSlide 
                            ? 'w-16 bg-[#2B865A]' 
                            : 'w-3 bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span 
                      className="text-[#2B865A] font-medium"
                      style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}
                    >
                      {currentSlide + 1} / {onboardingSlides.length}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {currentSlide > 0 && (
                    <button
                      onClick={prevSlide}
                      className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#2B865A] text-[#2B865A] hover:bg-[#2B865A] hover:text-white transition-all duration-300 shadow-lg"
                    >
                      <ArrowRight className="rotate-180" width={24} height={24} />
                    </button>
                  )}

                  <button
                    onClick={nextSlide}
                    className="group flex items-center justify-center gap-4 px-3 py-3 rounded-full bg-[#2B865A] text-white font-medium hover:bg-[#24704A] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                    style={{ 
                      fontFamily: 'Manrope, sans-serif', 
                      fontSize: '20px',
                      minWidth: '220px'
                    }}
                  >
                    {onboardingSlides[currentSlide].button}
                    <ArrowRight 
                      className="transform group-hover:translate-x-2 transition-transform" 
                      width={24} 
                      height={24} 
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center text-[#4D7059]">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#2B865A' }}>✓</span>
                </div>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}>
                  Безопасные платежи
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center">
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px', color: '#2B865A' }}>✓</span>
                </div>
                <span style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px' }}>
                  Быстрая доставка
                </span>
              </div>
            </div>
          </div>

          <div className="w-[40%] h-full relative flex items-center justify-center p-8 xl:p-12 2xl:p-16">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80vh] h-[80vh] rounded-full bg-gradient-to-br from-transparent via-white/10 to-white/5"></div>
              </div>
              
              <img
                src={onboardingSlides[currentSlide].image}
                alt="Onboarding"
                className="relative z-10 w-full h-auto max-h-[70vh] object-contain animate-float"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/800x800?text=Onboarding')}
              />
              
              <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white/5 to-transparent"></div>
            </div>
          </div>
        </div>

        <div className="md:hidden w-full h-full overflow-hidden">
          <div className="flex h-full flex-col justify-between p-6 pb-5">
            <div className="flex-1 flex flex-col items-center translate-y-6">
              <img
                src={onboardingSlides[currentSlide].image}
                alt="Onboarding"
                className="h-[370px] w-full object-contain animate-float"
                onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/300x400?text=Onboarding')}
              />
              <h1
                className="mb-4 text-center text-[28px] font-bold leading-[110%] mt-4"
                style={{ color: '#222021', fontFamily: 'Manrope, sans-serif' }}
              >
                {onboardingSlides[currentSlide].title}
              </h1>
              <p
                className="text-center text-base leading-[130%] w-[362px]"
                style={{ color: '#4D7059', fontFamily: 'Manrope, sans-serif' }}
              >
                {onboardingSlides[currentSlide].description}
              </p>
            </div>

            <div className="relative flex flex-col items-center -translate-y-6">
              <button
                onClick={nextSlide}
                className="group w-[170px] h-[40px] rounded-[100px] bg-[#2B865A] px-6 py-0 text-white font-medium shadow-[0_-2px_15.6px_0_#14652F33] flex items-center justify-center gap-2 hover:bg-[#25734c] transition-all duration-300 mb-12"
                style={{ fontFamily: 'Manrope, sans-serif', fontSize: '16px', lineHeight: '120%' }}
              >
                {onboardingSlides[currentSlide].button}
                <ArrowRight 
                  className="transform group-hover:translate-x-1 transition-transform" 
                  width={16} 
                  height={16} 
                />
              </button>
            </div>

            <div className="mb-3 flex justify-center space-x-2 -translate-y-6">
              {onboardingSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-[#2B865A] w-8' 
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
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
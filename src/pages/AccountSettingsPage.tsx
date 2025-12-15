import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'iconoir-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useProfileStore } from '../store/profile';

export default function AccountSettingsPage() {
  const navigate = useNavigate();
  const setFullProfile = useProfileStore((s) => s.setFullProfile);

  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('male');

  const isValidName = (value: string): boolean => {
    const re = /^[\p{L}\s\-–]+$/u;
    return re.test(value.trim()) && value.trim().length >= 2;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    if (nameError) setNameError(null);
    if (value.trim() !== '' && !isValidName(value)) {
      setNameError('Имя может содержать только буквы и знак «–»');
    }
  };

  const handleNameBlur = () => {
    if (name.trim() === '') {
      setNameError('Пожалуйста, введите ваше имя');
    } else if (!isValidName(name)) {
      setNameError('Имя может содержать только буквы и знак «–»');
    } else {
      setNameError(null);
    }
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(prev => !prev);
  };

  const handleSubmit = () => {
    setFullProfile({ name, gender, birthDate });
    navigate('/account-settings/step2');
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-background">
      <div className="hidden md:flex w-full h-screen">
        <div className="w-2/5 h-full flex flex-col items-center p-8 lg:p-10 xl:p-12 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-sm mx-auto w-full">
            <button
              onClick={() => navigate('/register/success')}
              className="flex items-center gap-2 mb-8 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <ArrowLeft className="transform group-hover:-translate-x-1 transition-transform" width={16} height={16} />
              Назад
            </button>

            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div className="text-xs font-medium text-[#2B865A]">Шаг 1 из 3</div>
                <div className="flex gap-1">
                  <div className="w-6 h-1.5 rounded-full bg-[#2B865A]"></div>
                  <div className="w-6 h-1.5 rounded-full bg-gray-300"></div>
                  <div className="w-6 h-1.5 rounded-full bg-gray-300"></div>
                </div>
              </div>

              <h1
                className="text-2xl xl:text-2xl font-bold leading-tight mb-4"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                  lineHeight: '1.2'
                }}
              >
                Основная информация
              </h1>
              
              <p
                className="text-sm xl:text-sm text-[#4D7059] leading-relaxed mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.3'
                }}
              >
                Заполните ваши персональные данные, чтобы мы могли создавать для вас полезные подборки и рекомендации
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-md bg-[#2B865A]/10 flex items-center justify-center">
                    <User className="text-[#2B865A]" width={16} height={16} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#222021] text-sm">Персональный подход</h3>
                    <p className="text-xs text-[#4D7059]">Рекомендации под ваши потребности</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center shadow">
                <span 
                  className="text-[#2B865A] font-bold text-base"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Q
                </span>
              </div>
              <div>
                <h2 
                  className="text-base font-bold text-[#2B865A]"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Qure
                </h2>
                <p className="text-xs text-[#4D7059]">Health Assistant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex items-center justify-center p-8 lg:p-10 xl:p-12">
          <div className="w-full max-w-lg mx-auto">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6 lg:p-8">
              <h2
                className="text-xl lg:text-xl font-bold text-center mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                }}
              >
                Заполните данные
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Как вас зовут
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    placeholder="Введите ваше имя"
                    className={`w-full rounded-lg border px-3 py-3 text-sm transition-all duration-300 ${
                      nameError
                        ? 'border-[#FE5F55] bg-[#FFF0F0] text-[#FE5F55]'
                        : 'border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white text-[#222021]'
                    }`}
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      height: '44px',
                    }}
                  />
                  {nameError && (
                    <p
                      className="mt-1 text-xs text-[#FE5F55]"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {nameError}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Выберите ваш пол
                  </label>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setGender('male')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all duration-300 text-sm ${
                        gender === 'male'
                          ? 'border-[#2B865A] bg-[#2B865A]/5 text-[#2B865A]'
                          : 'border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] text-[#635436]'
                      }`}
                    >
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>Мужчина</span>
                    </button>
                    <button
                      onClick={() => setGender('female')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border transition-all duration-300 text-sm ${
                        gender === 'female'
                          ? 'border-[#2B865A] bg-[#2B865A]/5 text-[#2B865A]'
                          : 'border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] text-[#635436]'
                      }`}
                    >
                      <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 500 }}>Женщина</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    День рождения
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value={
                        birthDate
                          ? birthDate.toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })
                          : 'Выберите дату'
                      }
                      onClick={toggleCalendar}
                      className="w-full rounded-lg border border-[#F0F0F0] bg-white/50 px-3 py-3 text-sm hover:border-[#2B865A] focus:border-[#2B865A] cursor-pointer"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        height: '44px',
                        color: birthDate ? '#222021' : '#989C99',
                      }}
                    />
                    <button
                      type="button"
                      onClick={toggleCalendar}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#635436] hover:text-[#2B865A] transition-colors"
                    >
                      <Calendar width={16} height={16} />
                    </button>
                  </div>
                  
                  {isCalendarOpen && (
                    <div className="mt-3 bg-white rounded-lg shadow-md p-3">
                      <DatePicker
                        selected={birthDate}
                        onChange={(date) => {
                          setBirthDate(date);
                          setIsCalendarOpen(false);
                        }}
                        locale="ru"
                        dateFormat="d MMMM yyyy"
                        inline
                        className="custom-datepicker"
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!name.trim()}
                  className={`w-full rounded-lg px-5 py-3 text-base font-bold transition-all duration-300 mt-6 ${
                    !name.trim()
                      ? 'bg-[#F8F8F8] text-[#D1D3D2] cursor-not-allowed'
                      : 'bg-[#2B865A] text-white shadow hover:shadow-md hover:scale-[1.02] hover:bg-[#24704A] active:scale-[0.98]'
                  }`}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    height: '48px',
                  }}
                >
                  Далее
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden w-full h-full">
        <div className="w-[390px] h-[844px] border-[3px] overflow-y-auto rounded-[30px] border-divider-green-first shadow-xl relative mx-auto">
          {/* Мобильный код остается без изменений */}
          <div
            className="flex h-[40px] w-full items-center px-4 pt-8"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 700,
              fontSize: '16px',
              lineHeight: '120%',
              letterSpacing: '0px',
              color: '#767B78',
            }}
          >
            <button onClick={() => navigate(-1)} aria-label="Назад">
              <ArrowLeft width={16} height={16} style={{ color: '#635436' }} />
            </button>
            <div className="w-[290px] text-center text-[#635436] ml-6 font-bold">Настройки аккаунта</div>
          </div>

          <div
            className="mx-auto w-[390px] flex-1"
            style={{
              height: '638px',
              marginTop: '1rem',
              paddingTop: '36px',
              paddingRight: '16px',
              paddingBottom: '36px',
              paddingLeft: '16px',
            }}
          >
            <div className="flex h-full flex-col">
              <div
                className="inline-flex items-center justify-center rounded-[8px]"
                style={{
                  width: '90px',
                  height: '26px',
                  gap: '10px',
                  borderRadius: '8px',
                  paddingTop: '4px',
                  paddingRight: '10px',
                  paddingBottom: '4px',
                  paddingLeft: '10px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  background: '#E7F0EA',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '130%',
                  letterSpacing: '0px',
                  textAlign: 'center',
                  color: '#2B865A',
                }}
              >
                Шаг 1/3
              </div>
              <h1
                className="mb-2 text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 700,
                  fontSize: '27px',
                  lineHeight: '110%',
                  color: '#222021',
                  width: '358px',
                  marginTop: '10px',
                }}
              >
                Основная информация
              </h1>
              <p
                className="mb-6 text-center"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '130%',
                  color: '#635436',
                  marginTop: '3px',
                }}
              >
                Заполните ваши персональные данные, <br /> чтобы мы могли создавать для вас полезные подборки и рекомендации
              </p>

              <div className="mb-6 flex justify-evenly">
                <div
                  className="h-1 w-[30%] rounded-full"
                  style={{ background: '#2B865A' }}
                ></div>
                <div
                  className="h-1 w-[30%] rounded-full"
                  style={{ background: '#D0E0D5' }}
                ></div>
                <div
                  className="h-1 w-[30%] rounded-full"
                  style={{ background: '#D0E0D5' }}
                ></div>
              </div>

              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Как вас зовут
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={handleNameBlur}
                  placeholder="Введите ваше имя"
                  className={`w-full rounded-[12px] px-4 py-3 text-base outline-none ${
                    nameError
                      ? 'border border-[#FE5F55] bg-[#FFF0F0] text-[#FE5F55]'
                      : 'border border-[#F8F8F8] bg-white text-[#989C99]'
                  }`}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#989C99',
                    height: '48px',
                  }}
                />
                {nameError && (
                  <p
                    className="mt-1 text-sm"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '130%',
                      color: '#FE5F55',
                    }}
                  >
                    {nameError}
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  Выберите ваш пол
                </label>
                <div className="flex rounded-[12px] overflow-hidden border border-[#F8F8F8]">
                  <button
                    className="flex-1 py-3 text-center"
                    style={{
                      width: '179px',
                      height: '41px',
                      borderRadius: '12px 0 0 12px',
                      padding: '2px',
                      background: gender === 'male' ? '#FFFFFF' : '#F4EDE6',
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '130%',
                      letterSpacing: '0px',
                      color: gender === 'male' ? '#222021' : '#635436',
                    }}
                    onClick={() => setGender('male')}
                  >
                    Мужчина
                  </button>
                  <button
                    className="flex-1 py-3 text-center"
                    style={{
                      width: '179px',
                      height: '41px',
                      borderRadius: '0 12px 12px 0',
                      padding: '2px',
                      background: gender === 'female' ? '#FFFFFF' : '#F4EDE6',
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      fontSize: '14px',
                      lineHeight: '130%',
                      letterSpacing: '0px',
                      color: gender === 'female' ? '#222021' : '#635436',
                    }}
                    onClick={() => setGender('female')}
                  >
                    Женщина
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label
                  className="mb-2 block text-sm font-semibold"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#222021',
                  }}
                >
                  День рождения
                </label>
                <div
                  className="flex items-center rounded-[12px] "
                >
                  <input
                    type="text"
                    readOnly
                    value={
                      birthDate
                        ? birthDate.toLocaleDateString('ru-RU', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          })
                        : '1 января 2024'
                    }
                    placeholder="1 января 2024"
                    className="flex-1 bg-transparent px-3 py-3 text-base outline-none"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '130%',
                      letterSpacing: '0px',
                      color: birthDate ? '#222021' : '#989C99',
                      border: '1px solid #F4EDE6 ',
                    }}
                  />

                  <button
                    type="button"
                    onClick={toggleCalendar}
                    className="flex h-[48px] w-[48px] items-center justify-center"
                    style={{ color: '#635436' }}
                    aria-label="Выбрать дату"
                  >
                    <Calendar width={20} height={20} />
                  </button>
                </div>
                {isCalendarOpen && (
                  <div className="mt-4">
                    <DatePicker
                      selected={birthDate}
                      onChange={(date) => {
                        setBirthDate(date);
                        setIsCalendarOpen(false);
                      }}
                      locale="ru"
                      dateFormat="d MMMM yyyy"
                      calendarClassName="apple-calendar"
                      inline
                    />
                  </div>
                )}
              </div>
              <button
                onClick={handleSubmit}
                className={`mb-6 w-full rounded-[100px] bg-[#2B865A] px-6 py-3 text-white font-bold transition-all ${
                  isCalendarOpen ? 'mt-6' : 'mt-44'
                }`}
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '120%',
                  height: '40px',
                  width: '170px',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  boxShadow: '0px -2px 15.6px 0px #14652F33',
                }}
              >
                Далее
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
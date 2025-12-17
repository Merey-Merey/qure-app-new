import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Download,
  Camera,
  User,
  Phone,
} from 'iconoir-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/apple-datepicker.css';
import { useProfileStore } from '../store/profile';

type Gender = 'male' | 'female';

export default function PersonalDataPage() {
  const navigate = useNavigate();

  const profile = useProfileStore((s) => s.profile);
  const setFullProfile = useProfileStore((s) => s.setFullProfile);

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);

  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState<string | null>(null);

  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const [gender, setGender] = useState<Gender>('male');
  const [birthDate, setBirthDate] = useState<Date | null>(null);

  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (profile) {
      setName(profile.name ?? '');
      setCity(profile.city ?? '');
      setPhone(profile.phone ?? '');
      setGender((profile.gender as Gender) || 'male');
      setBirthDate(profile.birthDate ?? null);

      if (profile.avatarFile) {
        setAvatarFile(profile.avatarFile);
        const url = URL.createObjectURL(profile.avatarFile);
        setAvatarPreview(url);
      }
    }
  }, [profile]);

  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const validateName = (value: string): string | null => {
    if (!value.trim()) return 'Введите имя';
    if (!/^[\p{L}\s\-–]+$/u.test(value.trim())) {
      return 'Имя может содержать только буквы и знак «–»';
    }
    if (value.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
    return null;
  };

  const validateCity = (value: string): string | null => {
    if (!value.trim()) return 'Введите город';
    return null;
  };

  const validatePhone = (value: string): string | null => {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 11) {
      return 'Неправильный формат номера телефона, проверьте количество цифр';
    }
    return null;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (isSubmitted) setNameError(validateName(value));
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
    if (isSubmitted) setCityError(validateCity(value));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (isSubmitted) setPhoneError(validatePhone(value));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const isValidType =
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpg';

    if (!isValidType) {
      setAvatarError(
        'Невозможно загрузить изображение. Используйте формат png или jpeg.'
      );
      setAvatarFile(null);
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setAvatarError('Размер изображения не должен превышать 5MB');
      setAvatarFile(null);
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
      setAvatarPreview(null);
      return;
    }

    setAvatarError(null);
    setAvatarFile(file);

    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    const preview = URL.createObjectURL(file);
    setAvatarPreview(preview);
  };

  const handleAvatarButtonClick = () => {
    document.getElementById('avatar-input')?.click();
  };

  const toggleCalendar = () => {
    setIsCalendarOpen((prev) => !prev);
  };

  const handleDateChange = (date: Date | null) => {
    setBirthDate(date);
    setIsCalendarOpen(false);
  };

  const handleSave = () => {
    setIsSubmitted(true);

    const nameErr = validateName(name);
    const cityErr = validateCity(city);
    const phoneErr = validatePhone(phone);

    setNameError(nameErr);
    setCityError(cityErr);
    setPhoneError(phoneErr);

    if (nameErr || cityErr || phoneErr || avatarError) return;

    setFullProfile({
      name,
      city,
      phone,
      gender,
      birthDate,
      avatarFile,
    });

    navigate('/profile');
  };

  return (
    <div className="w-full min-h-screen bg-background">
      <div className="hidden lg:flex w-full min-h-screen">
        <div className="w-2/5 h-full flex flex-col items-center p-6 xl:p-8 bg-gradient-to-b from-[#FCF8F5] to-[#E0EFBD]/30">
          <div className="max-w-md mx-auto w-full">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 mb-6 text-[#2B865A] hover:text-[#24704A] transition-colors group text-sm"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              <ArrowLeft
                className="transform group-hover:-translate-x-1 transition-transform"
                width={16}
                height={16}
              />
              Назад в профиль
            </button>

            <div className="mb-10">
              <h1
                className="text-2xl font-bold leading-tight mb-4"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                  lineHeight: '1.2',
                }}
              >
                Персональные данные
              </h1>

              <p
                className="text-sm text-[#4D7059] leading-relaxed mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  lineHeight: '1.3',
                }}
              >
                Обновите свои персональные данные для персонализированного
                обслуживания и получения индивидуальных рекомендаций.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-md bg-[#2B865A]/10 flex items-center justify-center">
                    <User className="text-[#2B865A]" width={16} height={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#222021] text-sm">Имя и фото</h3>
                    <p className="text-xs text-[#4D7059]">
                      Помогает в общении с поддержкой
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-md bg-[#2B865A]/10 flex items-center justify-center">
                    <Phone className="text-[#2B865A]" width={16} height={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-[#222021] text-sm">
                      Контактные данные
                    </h3>
                    <p className="text-xs text-[#4D7059]">
                      Для уведомлений о заказах
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
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
                  className="text-sm font-bold text-[#2B865A]"
                  style={{ fontFamily: 'Manrope, sans-serif' }}
                >
                  Qure
                </h2>
                <p className="text-xs text-[#4D7059]">Health Assistant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-3/5 h-full flex items-center justify-center p-6 xl:p-8">
          <div className="w-full max-w-2xl mx-auto">
            <div className="w-full rounded-xl bg-white/90 backdrop-blur-sm shadow-lg border border-white/20 p-6 xl:p-8">
              <h2
                className="text-xl font-bold mb-6"
                style={{
                  fontFamily: 'Manrope, sans-serif',
                  color: '#222021',
                }}
              >
                Обновить данные
              </h2>

              <div className="space-y-6">
                <div>
                  <label
                    className="block text-base font-semibold mb-3"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Фото профиля
                  </label>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2B865A] to-[#E0EFBD] p-1">
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                          {avatarPreview ? (
                            <img
                              src={avatarPreview}
                              alt="Аватар"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-16 h-16 rounded-full bg-[#2B865A]/10 flex items-center justify-center">
                              <User
                                className="text-[#2B865A]"
                                width={32}
                                height={32}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={handleAvatarButtonClick}
                        className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition-transform"
                      >
                        <Camera
                          className="text-[#2B865A]"
                          width={14}
                          height={14}
                        />
                      </button>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p
                        className="text-xs text-[#4D7059] mb-3"
                        style={{ fontFamily: 'Manrope, sans-serif' }}
                      >
                        Загрузите изображение в формате PNG или JPEG, размером
                        не более 5MB
                      </p>

                      {isSubmitted && avatarError && (
                        <p
                          className="text-xs text-[#FE5F55] mb-2"
                          style={{ fontFamily: 'Manrope, sans-serif' }}
                        >
                          {avatarError}
                        </p>
                      )}

                      <button
                        onClick={handleAvatarButtonClick}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border-2 border-[#2B865A] text-[#2B865A] font-semibold hover:bg-[#2B865A] hover:text-white transition-all duration-300 text-xs"
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                        }}
                      >
                        <Download width={14} height={14} />
                        Загрузить фото
                      </button>

                      <input
                        id="avatar-input"
                        type="file"
                        accept="image/png,image/jpeg,image/jpg"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className="block text-base font-semibold mb-2"
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      color: '#222021',
                    }}
                  >
                    Имя
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Введите ваше имя"
                    className={`w-full rounded-lg border-2 px-3 py-2.5 text-sm transition-all duration-300 ${
                      isSubmitted && nameError
                        ? 'border-[#FE5F55] bg-[#FFF0F0] text-[#FE5F55]'
                        : 'border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white text-[#222021]'
                    }`}
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      height: '44px',
                    }}
                  />
                  {isSubmitted && nameError && (
                    <p
                      className="mt-1.5 text-xs text-[#FE5F55]"
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
                    Город
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    placeholder="г. Алматы"
                    className={`w-full rounded-lg border-2 px-3 py-2.5 text-sm transition-all duration-300 ${
                      isSubmitted && cityError
                        ? 'border-[#FE5F55] bg-[#FFF0F0] text-[#FE5F55]'
                        : 'border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white text-[#222021]'
                    }`}
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      height: '44px',
                    }}
                  />
                  {isSubmitted && cityError && (
                    <p
                      className="mt-1.5 text-xs text-[#FE5F55]"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {cityError}
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
                    Телефон
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder="+7 (999) 123-45-67"
                    className={`w-full rounded-lg border-2 px-3 py-2.5 text-sm transition-all duration-300 ${
                      isSubmitted && phoneError
                        ? 'border-[#FE5F55] bg-[#FFF0F0] text-[#FE5F55]'
                        : 'border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] focus:border-[#2B865A] focus:bg-white text-[#222021]'
                    }`}
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      height: '44px',
                    }}
                  />
                  {isSubmitted && phoneError && (
                    <p
                      className="mt-1.5 text-xs text-[#FE5F55]"
                      style={{ fontFamily: 'Manrope, sans-serif' }}
                    >
                      {phoneError}
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
                    Пол
                  </label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all duration-300 ${
                        gender === 'male'
                          ? 'border-[#2B865A] bg-[#2B865A]/5 text-[#2B865A]'
                          : 'border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] text-[#635436]'
                      }`}
                    >
                      <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 500,
                          fontSize: '13px',
                        }}
                      >
                        Мужчина
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border-2 transition-all duration-300 ${
                        gender === 'female'
                          ? 'border-[#2B865A] bg-[#2B865A]/5 text-[#2B865A]'
                          : 'border-[#F0F0F0] bg-white/50 hover:border-[#2B865A] text-[#635436]'
                      }`}
                    >
                      <span
                        style={{
                          fontFamily: 'Manrope, sans-serif',
                          fontWeight: 500,
                          fontSize: '13px',
                        }}
                      >
                        Женщина
                      </span>
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
                    Дата рождения
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
                      className="w-full rounded-lg border-2 border-[#F0F0F0] bg-white/50 px-3 py-2.5 text-sm hover:border-[#2B865A] focus:border-[#2B865A] cursor-pointer"
                      style={{
                        fontFamily: 'Manrope, sans-serif',
                        height: '44px',
                        color: birthDate ? '#222021' : '#989C99',
                      }}
                    />
                    <button
                      type="button"
                      onClick={toggleCalendar}
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-[#635436] hover:text-[#2B865A] transition-colors"
                    >
                      <Calendar width={16} height={16} />
                    </button>
                  </div>

                  {isCalendarOpen && (
                    <div className="mt-3 bg-white rounded-lg shadow-md p-3">
                      <DatePicker
                        selected={birthDate}
                        onChange={handleDateChange}
                        locale="ru"
                        dateFormat="d MMMM yyyy"
                        inline
                        className="custom-datepicker"
                      />
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSave}
                  className={`w-full rounded-lg px-3 py-2.5 text-sm font-bold transition-all duration-300 mt-6 ${
                    isSubmitted && (nameError || cityError || phoneError)
                      ? 'bg-[#F8F8F8] text-[#D1D3D2] cursor-not-allowed'
                      : 'bg-[#2B865A] text-white shadow hover:shadow-md hover:scale-[1.01] hover:bg-[#24704A] active:scale-[0.99]'
                  }`}
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    height: '44px',
                  }}
                >
                  Сохранить изменения
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden flex min-h-[82vh] w-full items-center justify-center bg-background">
        <div className="w-full h-full overflow-y-auto pb-20">
          <div className="flex h-[52px] items-center px-3 pt-6 bg-white border-b border-[#F8F8F8]">
            <button onClick={() => navigate('/profile')} aria-label="Назад">
              <ArrowLeft width={18} height={18} style={{ color: '#635436' }} />
            </button>
            <div
              className="ml-3 font-bold"
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '14px',
                color: '#635436',
              }}
            >
              Персональные данные
            </div>
          </div>

          <div className="p-4 space-y-4 pt-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-16 h-16 rounded-full bg-[#E7F0EA] flex items-center justify-center overflow-hidden">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Аватар"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#D0E0D5]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 600,
                    fontSize: '13px',
                    color: '#222021',
                    marginBottom: '3px',
                  }}
                >
                  Фото профиля
                </p>
                <p
                  className="text-xs"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    color: '#635436',
                    marginBottom: '6px',
                  }}
                >
                  Загрузите изображение в формате png или jpeg
                </p>
                {isSubmitted && avatarError && (
                  <p
                    style={{
                      fontFamily: 'Manrope, sans-serif',
                      fontSize: '11px',
                      color: '#FE5F55',
                      marginBottom: '6px',
                    }}
                  >
                    {avatarError}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleAvatarButtonClick}
                  className="rounded-[80px] border border-[#D0E0D5] px-2.5 py-1 flex items-center gap-1.5 text-xs"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                    fontWeight: 500,
                    color: '#222021',
                  }}
                >
                  <Download width={12} height={12} />
                  Загрузить фото
                </button>
                <input
                  id="avatar-input"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            <div>
              <label
                className="block mb-1.5 text-sm font-semibold"
                style={{ color: '#222021', fontFamily: 'Manrope, sans-serif' }}
              >
                Имя
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Введите ваше имя"
                className={`w-full rounded-[10px] px-3 py-2.5 text-sm outline-none ${
                  isSubmitted && nameError
                    ? 'border border-[#FE5F55] bg-[#FFF0F0]'
                    : 'border border-[#F8F8F8] bg-white'
                }`}
                style={{
                  height: '42px',
                  fontFamily: 'Manrope, sans-serif',
                }}
              />
              {isSubmitted && nameError && (
                <p
                  className="mt-1 text-xs"
                  style={{ fontFamily: 'Manrope, sans-serif', color: '#FE5F55' }}
                >
                  {nameError}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-1.5 text-sm font-semibold"
                style={{ color: '#222021', fontFamily: 'Manrope, sans-serif' }}
              >
                Город
              </label>
              <input
                type="text"
                value={city}
                onChange={handleCityChange}
                placeholder="г. Алматы"
                className={`w-full rounded-[10px] px-3 py-2.5 text-sm outline-none ${
                  isSubmitted && cityError
                    ? 'border border-[#FE5F55] bg-[#FFF0F0]'
                    : 'border border-[#F8F8F8] bg-white'
                }`}
                style={{
                  height: '42px',
                  fontFamily: 'Manrope, sans-serif',
                }}
              />
              {isSubmitted && cityError && (
                <p
                  className="mt-1 text-xs"
                  style={{ fontFamily: 'Manrope, sans-serif', color: '#FE5F55' }}
                >
                  {cityError}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-1.5 text-sm font-semibold"
                style={{ color: '#222021', fontFamily: 'Manrope, sans-serif' }}
              >
                Телефон
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+7 (999) 123-45-67"
                className={`w-full rounded-[10px] px-3 py-2.5 text-sm outline-none ${
                  isSubmitted && phoneError
                    ? 'border border-[#FE5F55] bg-[#FFF0F0]'
                    : 'border border-[#F8F8F8] bg-white'
                }`}
                style={{
                  height: '42px',
                  fontFamily: 'Manrope, sans-serif',
                }}
              />
              {isSubmitted && phoneError && (
                <p
                  className="mt-1 text-xs"
                  style={{ fontFamily: 'Manrope, sans-serif', color: '#FE5F55' }}
                >
                  {phoneError}
                </p>
              )}
            </div>

            <div>
              <label
                className="block mb-1.5 text-sm font-semibold"
                style={{ color: '#222021', fontFamily: 'Manrope, sans-serif' }}
              >
                Пол
              </label>
              <div className="flex rounded-[10px] overflow-hidden border border-[#F8F8F8]">
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className="flex-1 py-2.5 text-center"
                  style={{
                    background: gender === 'male' ? '#FFFFFF' : '#F4EDE6',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: gender === 'male' ? '#222021' : '#635436',
                  }}
                >
                  Мужчина
                </button>
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className="flex-1 py-2.5 text-center"
                  style={{
                    background: gender === 'female' ? '#FFFFFF' : '#F4EDE6',
                    fontFamily: 'Manrope, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: gender === 'female' ? '#222021' : '#635436',
                  }}
                >
                  Женщина
                </button>
              </div>
            </div>

            <div>
              <label
                className="block mb-1.5 text-sm font-semibold"
                style={{ color: '#222021', fontFamily: 'Manrope, sans-serif' }}
              >
                Дата рождения
              </label>
              <div className="flex items-center rounded-[10px] border border-[#F8F8F8]">
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
                      : 'ДД ММММ ГГГГ'
                  }
                  placeholder="ДД ММММ ГГГГ"
                  className="flex-1 px-3 py-2.5 bg-transparent outline-none text-sm"
                  style={{
                    fontFamily: 'Manrope, sans-serif',
                  }}
                  onClick={toggleCalendar}
                />
                <button
                  type="button"
                  onClick={toggleCalendar}
                  className="flex h-[42px] w-[42px] items-center justify-center"
                  style={{ color: '#635436' }}
                >
                  <Calendar width={16} height={16} />
                </button>
              </div>

              {isCalendarOpen && (
                <div className="mt-3">
                  <DatePicker
                    selected={birthDate}
                    onChange={handleDateChange}
                    locale="ru"
                    dateFormat="d MMMM yyyy"
                    calendarClassName="apple-calendar"
                    inline
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleSave}
              className="w-full mt-8 rounded-[80px] bg-[#2B865A] py-2.5 font-bold text-sm"
              style={{
                height: '40px',
                fontFamily: 'Manrope, sans-serif',
                color: '#FFFFFF',
                boxShadow: '0px -1px 12px 0px #14652F33',
              }}
            >
              Сохранить изменения
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
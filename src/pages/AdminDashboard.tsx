import { useAuth } from '../context/useAuth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#e7edf3] flex">
      {/* ЛЕВАЯ ПАНЕЛЬ */}
      <aside className="w-20 bg-[#1f3b4d] flex flex-col items-center py-6 space-y-6 text-white">
        <div className="w-12 h-12 rounded-full bg-[#26b48a] flex items-center justify-center text-2xl font-semibold shadow-lg">
          A
        </div>

        <nav className="flex flex-col items-center space-y-4 mt-6 text-xl">
          <button className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
            📊
          </button>
          <Link
            to="/admin/products"
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition"
            title="Товары"
          >
            📦
          </Link>
          <Link
            to="/admin/orders"
            className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/10 transition"
            title="Заказы"
          >
            📋
          </Link>
        </nav>

        <div className="mt-auto flex flex-col items-center space-y-4 text-[10px] font-medium tracking-wide">
          <span className="uppercase text-white/60">Export</span>
          <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md text-[#1f3b4d]">
            PDF
          </button>
          <button className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-md text-[#1f3b4d]">
            📄
          </button>

          <span className="uppercase text-white/60 mt-4">Social</span>
          <button className="w-10 h-10 rounded-xl bg-[#0a66c2] flex items-center justify-center text-xl shadow-md">
            in
          </button>
        </div>
      </aside>

      {/* ОСНОВНАЯ ОБЛАСТЬ */}
      <main className="flex-1 px-10 py-8">
        {/* ХЕДЕР */}
        <header className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#1f2733]">
              Панель администратора
            </h1>
            <p className="mt-1 text-sm text-[#6b7b8b]">
              Добро пожаловать,{' '}
              <span className="font-semibold">{user?.name}</span>!
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md text-xs text-[#5b6775]">
              <span className="text-lg">📅</span>
              <span>01 января 2022 — 30 декабря 2022</span>
            </div>

            <div className="flex bg-[#e3e8ee] rounded-full p-1 text-xs font-medium">
              <button className="px-4 py-1 rounded-full bg-white shadow-sm text-[#1f3b4d]">
                Продажи
              </button>
              <button className="px-4 py-1 rounded-full text-[#6b7b8b]">
                Прибыль
              </button>
              <button className="px-4 py-1 rounded-full text-[#6b7b8b]">
                Заказы
              </button>
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 rounded-full bg-[#ff5b5b] text-white text-sm shadow-md hover:bg-[#e34747] transition"
            >
              Выйти
            </button>
          </div>
        </header>

        {/* ВЕРХНИЕ ВИДЖЕТЫ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'ПРОДАЖИ', value: '733.2K ₽', delta: '20.4% vs PY' },
            { label: 'ПРИБЫЛЬ', value: '93.4K ₽', delta: '14.2% vs PY' },
            { label: 'ЗАКАЗЫ', value: '1 687', delta: '28.4% vs PY' },
            { label: 'ПОКУПАТЕЛИ', value: '693', delta: '8.6% vs PY' },
          ].map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-2xl px-5 py-4 shadow-[0_18px_45px_rgba(16,24,40,0.08)]"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] tracking-[0.12em] text-[#8a96a6]">
                  {card.label}
                </span>
                <span className="text-[10px] text-[#21a56b]">
                  ▲ {card.delta}
                </span>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-semibold text-[#1f2733]">
                  {card.value}
                </span>
                <div className="w-20 h-8 bg-gradient-to-r from-[#d6f5ea] to-[#f3f7fb] rounded-full" />
              </div>
            </div>
          ))}
        </section>

        {/* БЛОКИ С ССЫЛКАМИ НА ТВОИ СТРАНИЦЫ */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/products"
            className="bg-white rounded-2xl p-6 shadow-[0_18px_45px_rgba(16,24,40,0.08)] hover:shadow-[0_22px_55px_rgba(16,24,40,0.12)] transition-shadow border border-[#E3F4EC]"
          >
            <div className="w-12 h-12 bg-[#E6FFF3] rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-[#0B1B33] mb-1">
              Управление товарами
            </h3>
            <p className="text-[#7C8796] text-sm">
              Добавление, редактирование и удаление товаров
            </p>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-white rounded-2xl p-6 shadow-[0_18px_45px_rgba(16,24,40,0.08)] hover:shadow-[0_22px_55px_rgba(16,24,40,0.12)] transition-shadow border border-[#E3F4EC]"
          >
            <div className="w-12 h-12 bg-[#E6FFF3] rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📋</span>
            </div>
            <h3 className="text-xl font-semibold text-[#0B1B33] mb-1">
              Заказы
            </h3>
            <p className="text-[#7C8796] text-sm">
              Просмотр и управление всеми заказами
            </p>
          </Link>

          <div className="bg-white rounded-2xl p-6 shadow-[0_18px_45px_rgba(16,24,40,0.08)] border border-[#E3F4EC]">
            <div className="w-12 h-12 bg-[#E6FFF3] rounded-xl flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-xl font-semibold text-[#0B1B33] mb-1">
              Статистика
            </h3>
            <p className="text-[#7C8796] text-sm">
              Аналитика продаж и активность пользователей
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
      

  
          <div className="bg-white rounded-2xl p-5 shadow-[0_18px_45px_rgba(16,24,40,0.08)]">
            <h3 className="text-sm font-semibold text-[#1f2733] mb-4">
              Быстрые действия
            </h3>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/admin/products/new"
                className="px-4 py-2 bg-[#2F9E66] text-white rounded-xl shadow-md hover:bg-[#278757] transition-colors text-sm"
              >
                + Добавить товар
              </Link>
              <Link
                to="/main-page"
                className="px-4 py-2 border border-[#2F9E66] text-[#2F9E66] rounded-xl hover:bg-[#E6FFF3] transition-colors text-sm"
              >
                Перейти в магазин
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

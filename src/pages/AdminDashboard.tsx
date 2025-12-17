import { useAuth } from '../context/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Package, 
  NavArrowLeft, 
  Plus, 
  Download,
  Page 
} from 'iconoir-react';
import { useState } from 'react';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [exportLoading, setExportLoading] = useState({ pdf: false, excel: false });

  const navItems = [
    { path: '/admin', label: 'Главная', icon: Home, active: location.pathname === '/admin' },
    { path: '/admin/products', label: 'Товары', icon: Package, active: location.pathname.includes('/admin/products') },
    { path: '/admin/orders', label: 'Заказы', icon: '📋', active: location.pathname.includes('/admin/orders') },
  ];

  const handleExportPDF = async () => {
    try {
      setExportLoading(prev => ({ ...prev, pdf: true }));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const reportData = {
        title: `Отчет администратора ${new Date().toLocaleDateString('ru-RU')}`,
        user: user?.name || user?.email,
        stats: [
          { label: 'ПРОДАЖИ', value: '733.2K ₽', delta: '20.4%' },
          { label: 'ПРИБЫЛЬ', value: '93.4K ₽', delta: '14.2%' },
          { label: 'ЗАКАЗЫ', value: '1 687', delta: '28.4%' },
          { label: 'ПОКУПАТЕЛИ', value: '693', delta: '8.6%' },
        ],
        generatedAt: new Date().toISOString()
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admin-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('PDF отчет успешно сгенерирован и скачан!');
    } catch (error) {
      console.error('Ошибка экспорта PDF:', error);
      alert('Ошибка при генерации PDF отчета');
    } finally {
      setExportLoading(prev => ({ ...prev, pdf: false }));
    }
  };

  const handleExportExcel = async () => {
    try {
      setExportLoading(prev => ({ ...prev, excel: true }));
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const csvContent = `Отчет администратора,${new Date().toLocaleDateString('ru-RU')}
Пользователь,${user?.name || user?.email}
Дата генерации,${new Date().toLocaleString('ru-RU')}

Категория,Значение,Рост
ПРОДАЖИ,733.2K ₽,20.4%
ПРИБЫЛЬ,93.4K ₽,14.2%
ЗАКАЗЫ,1 687,28.4%
ПОКУПАТЕЛИ,693,8.6%`;
      
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `admin-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert('Excel отчет успешно сгенерирован и скачан!');
    } catch (error) {
      console.error('Ошибка экспорта Excel:', error);
      alert('Ошибка при генерации Excel отчета');
    } finally {
      setExportLoading(prev => ({ ...prev, excel: false }));
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa]">
      <header className="sticky top-0 z-10 bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          >
            <NavArrowLeft width={20} height={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#26b48a] flex items-center justify-center text-white text-sm font-semibold">
              A
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Админ</p>
              <p className="text-sm font-semibold text-gray-800">{user?.name || user?.email}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <h1 className="text-xl font-bold text-gray-900">Панель администратора</h1>
          <p className="text-xs text-gray-500 mt-1">Добро пожаловать!</p>
        </div>
      </header>

      <main className="px-4 py-5">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Быстрые действия</h2>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span>📅</span>
              <span>2024</span>
            </div>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2">
            <button
              onClick={logout}
              className="flex-shrink-0 px-4 py-3 bg-[#ff5b5b] text-white rounded-xl text-sm font-medium shadow-sm hover:bg-[#e34747] transition"
            >
              Выйти
            </button>
            
            <Link
              to="/admin/products/new"
              className="flex-shrink-0 px-4 py-3 bg-[#2F9E66] text-white rounded-xl text-sm font-medium shadow-sm hover:bg-[#278757] transition flex items-center gap-2"
            >
              <Plus width={16} height={16} />
              Товар
            </Link>
            
            <Link
              to="/main-page"
              className="flex-shrink-0 px-4 py-3 border border-[#2F9E66] text-[#2F9E66] rounded-xl text-sm font-medium hover:bg-[#E6FFF3] transition flex items-center gap-2"
            >
              <span>🛒</span>
              Магазин
            </Link>
          </div>
        </div>

               <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Управление</h2>
          
          <div className="space-y-3">
            <Link
              to="/admin/products"
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow transition-shadow"
            >
              <div className="w-12 h-12 bg-[#E6FFF3] rounded-lg flex items-center justify-center">
                <Package width={24} height={24} className="text-[#2F9E66]" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Товары</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Добавление и редактирование
                </p>
              </div>
              <div className="text-gray-400">→</div>
            </Link>

            <Link
              to="/admin/orders"
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow transition-shadow"
            >
              <div className="w-12 h-12 bg-[#E6FFF3] rounded-lg flex items-center justify-center">
                <span className="text-2xl">📋</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">Заказы</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Просмотр и управление
                </p>
              </div>
              <div className="text-gray-400">→</div>
            </Link>
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Экспорт</h2>
          
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleExportPDF}
              disabled={exportLoading.pdf}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exportLoading.pdf ? (
                <div className="w-5 h-5 border-2 border-[#2F9E66] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Page width={20} height={20} className="text-[#2F9E66]" />
                  <span>PDF</span>
                  <Download width={16} height={16} className="text-gray-400" />
                </>
              )}
            </button>
            
            <button
              onClick={handleExportExcel}
              disabled={exportLoading.excel}
              className="flex-1 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exportLoading.excel ? (
                <div className="w-5 h-5 border-2 border-[#2F9E66] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Excel</span>
                  <Download width={16} height={16} className="text-gray-400" />
                </>
              )}
            </button>
          </div>

          <div className="bg-white rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Соцсети</h3>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#0a66c2] rounded-xl flex items-center justify-center text-white text-xl shadow hover:bg-[#0959a4] transition"
              >
                in
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#1DA1F2] rounded-xl flex items-center justify-center text-white text-xl shadow hover:bg-[#0d8bda] transition"
              >
                𝕏
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-[#4267B2] rounded-xl flex items-center justify-center text-white text-xl shadow hover:bg-[#365899] transition"
              >
                f
              </a>
            </div>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 px-2 py-1 ${
                item.active ? 'text-[#2F9E66]' : 'text-gray-500'
              }`}
            >
              {typeof item.icon === 'string' ? (
                <span className="text-xl">{item.icon}</span>
              ) : (
                <item.icon width={20} height={20} />
              )}
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default AdminDashboard;
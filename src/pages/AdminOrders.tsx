// AdminOrders.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Order {
  id: number;
  customer: string;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  date: string;
  items: number;
}

const mockOrders: Order[] = [
  { id: 1001, customer: 'Иван Иванов', total: 5400, status: 'completed', date: '2024-12-10', items: 3 },
  { id: 1002, customer: 'Мария Петрова', total: 3200, status: 'processing', date: '2024-12-11', items: 2 },
  { id: 1003, customer: 'Алексей Смирнов', total: 1200, status: 'pending', date: '2024-12-11', items: 1 },
  { id: 1004, customer: 'Елена Козлова', total: 6800, status: 'completed', date: '2024-12-09', items: 4 },
  { id: 1005, customer: 'Дмитрий Новиков', total: 2500, status: 'cancelled', date: '2024-12-08', items: 2 },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const getStatusBadge = (status: Order['status']) => {
    const config = {
      pending: { color: 'bg-yellow-50 text-yellow-700', text: 'Ожидает' },
      processing: { color: 'bg-blue-50 text-blue-700', text: 'В обработке' },
      completed: { color: 'bg-emerald-50 text-emerald-700', text: 'Завершен' },
      cancelled: { color: 'bg-red-50 text-red-700', text: 'Отменен' },
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${config[status].color}`}>
        {config[status].text}
      </span>
    );
  };

  const updateStatus = (orderId: number, newStatus: Order['status']) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter);

  return (
    <div className="min-h-screen bg-[#e7edf3] px-10 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Хедер */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#1f2733]">
              Управление заказами
            </h1>
            <p className="mt-1 text-sm text-[#6b7b8b]">
              Всего заказов: <span className="font-semibold">{orders.length}</span>
            </p>
          </div>
          <Link
            to="/admin"
            className="px-4 py-2 rounded-full border border-[#21a56b] text-[#21a56b] text-sm bg-white hover:bg-[#e6fff3] transition-colors shadow-sm"
          >
            ← Назад в панель
          </Link>
        </header>

        {/* Фильтры + краткая статистика */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-[0_18px_45px_rgba(16,24,40,0.08)] flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'Все' },
              { id: 'pending', label: 'Ожидают' },
              { id: 'processing', label: 'В обработке' },
              { id: 'completed', label: 'Завершены' },
            ].map(btn => (
              <button
                key={btn.id}
                onClick={() => setStatusFilter(btn.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${
                  statusFilter === btn.id
                    ? 'bg-[#21a56b] text-white shadow-sm'
                    : 'bg-[#edf2f7] text-[#1f2733] hover:bg-[#e1e7f0]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* 3 маленьких KPI */}
          <div className="bg-white rounded-2xl p-4 shadow-[0_18px_45px_rgba(16,24,40,0.08)]">
            <p className="text-xs text-[#8a96a6] mb-1">Завершены</p>
            <p className="text-2xl font-semibold text-emerald-600">
              {orders.filter(o => o.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-[0_18px_45px_rgba(16,24,40,0.08)]">
            <p className="text-xs text-[#8a96a6] mb-1">Общая сумма</p>
            <p className="text-2xl font-semibold text-[#1f2733]">
              {orders.reduce((s, o) => s + o.total, 0).toLocaleString()} ₸
            </p>
          </div>
        </section>

        {/* Таблица */}
        <section className="bg-white rounded-2xl shadow-[0_18px_45px_rgba(16,24,40,0.08)] p-6 mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#f3f6fa] text-[#6b7b8b]">
                <tr>
                  <th className="p-3 text-left font-semibold">Номер</th>
                  <th className="p-3 text-left font-semibold">Клиент</th>
                  <th className="p-3 text-left font-semibold">Дата</th>
                  <th className="p-3 text-left font-semibold">Товаров</th>
                  <th className="p-3 text-left font-semibold">Сумма</th>
                  <th className="p-3 text-left font-semibold">Статус</th>
                  <th className="p-3 text-left font-semibold">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr
                    key={order.id}
                    className="border-b border-[#edf2f7] hover:bg-[#f7fafc] transition-colors"
                  >
                    <td className="p-3 font-medium text-[#1f2733]">
                      #{order.id}
                    </td>
                    <td className="p-3 text-[#1f2733]">{order.customer}</td>
                    <td className="p-3 text-[#6b7b8b]">{order.date}</td>
                    <td className="p-3 text-[#6b7b8b]">{order.items}</td>
                    <td className="p-3 font-semibold text-[#1f2733]">
                      {order.total.toLocaleString()} ₸
                    </td>
                    <td className="p-3">{getStatusBadge(order.status)}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-2">
                        <button className="px-3 py-1 rounded-full bg-[#e3e8ee] text-xs text-[#1f2733] hover:bg-[#d7dee9]">
                          Подробнее
                        </button>
                        {order.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(order.id, 'processing')}
                              className="px-3 py-1 rounded-full bg-blue-500 text-xs text-white hover:bg-blue-600"
                            >
                              Принять
                            </button>
                            <button
                              onClick={() => updateStatus(order.id, 'cancelled')}
                              className="px-3 py-1 rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                            >
                              Отклонить
                            </button>
                          </>
                        )}
                        {order.status === 'processing' && (
                          <button
                            onClick={() => updateStatus(order.id, 'completed')}
                            className="px-3 py-1 rounded-full bg-emerald-500 text-xs text-white hover:bg-emerald-600"
                          >
                            Завершить
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-[#8a96a6] text-sm">
              Заказы не найдены для выбранного фильтра.
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminOrders;

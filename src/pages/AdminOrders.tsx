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
      pending: { color: 'bg-yellow-50 text-yellow-700 border border-yellow-200', text: 'Ожидает' },
      processing: { color: 'bg-blue-50 text-blue-700 border border-blue-200', text: 'В обработке' },
      completed: { color: 'bg-emerald-50 text-emerald-700 border border-emerald-200', text: 'Завершен' },
      cancelled: { color: 'bg-red-50 text-red-700 border border-red-200', text: 'Отменен' },
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config[status].color}`}>
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
    <div className="min-h-screen bg-[#f5f7fa] p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-semibold text-[#1f2733]">
              Управление заказами
            </h1>
            <p className="mt-1 text-xs text-[#6b7b8b]">
              Всего заказов: <span className="font-semibold">{orders.length}</span>
            </p>
          </div>
          <Link
            to="/admin"
            className="px-3 py-1.5 rounded-full border border-[#21a56b] text-[#21a56b] text-xs bg-white hover:bg-[#e6fff3] transition-colors shadow-sm"
          >
            ← Панель
          </Link>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {[
            { id: 'all', label: 'Все' },
            { id: 'pending', label: 'Ожидают' },
            { id: 'processing', label: 'В обработке' },
            { id: 'completed', label: 'Завершены' },
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setStatusFilter(btn.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                statusFilter === btn.id
                  ? 'bg-[#21a56b] text-white shadow-sm'
                  : 'bg-white text-[#1f2733] hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <p className="text-xs text-[#8a96a6] mb-1">Завершены</p>
            <p className="text-lg font-semibold text-emerald-600">
              {orders.filter(o => o.status === 'completed').length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-sm">
            <p className="text-xs text-[#8a96a6] mb-1">Общая сумма</p>
            <p className="text-lg font-semibold text-[#1f2733]">
              {orders.reduce((s, o) => s + o.total, 0).toLocaleString()} ₸
            </p>
          </div>
        </div>
      </header>

      <section className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm">
            <p className="text-sm text-[#8a96a6]">Заказы не найдены</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-[#1f2733] text-sm">#{order.id}</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <p className="text-sm text-[#1f2733]">{order.customer}</p>
                </div>
                <p className="text-sm font-semibold text-[#1f2733]">
                  {order.total.toLocaleString()} ₸
                </p>
              </div>

              <div className="flex justify-between text-xs text-[#6b7b8b] mb-4">
                <span>Дата: {order.date}</span>
                <span>Товаров: {order.items}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 rounded-full bg-[#edf2f7] text-xs text-[#1f2733] hover:bg-[#e1e7f0] transition-colors">
                  Подробнее
                </button>

                {order.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(order.id, 'processing')}
                      className="px-3 py-1.5 rounded-full bg-blue-500 text-xs text-white hover:bg-blue-600 transition-colors"
                    >
                      Принять
                    </button>
                    <button
                      onClick={() => updateStatus(order.id, 'cancelled')}
                      className="px-3 py-1.5 rounded-full bg-red-500 text-xs text-white hover:bg-red-600 transition-colors"
                    >
                      Отклонить
                    </button>
                  </>
                )}

                {order.status === 'processing' && (
                  <button
                    onClick={() => updateStatus(order.id, 'completed')}
                    className="px-3 py-1.5 rounded-full bg-emerald-500 text-xs text-white hover:bg-emerald-600 transition-colors"
                  >
                    Завершить
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default AdminOrders;
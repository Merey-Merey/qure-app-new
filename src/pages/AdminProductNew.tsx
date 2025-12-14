// /src/pages/AdminProductNew.tsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URLS } from '../services/api';

interface NewProductForm {
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description: string;
}

const AdminProductNew = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState<NewProductForm>({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    image: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || form.price <= 0) {
      alert('Заполните название и цену товара');
      return;
    }

    try {
      setLoading(true);
      const dataToSend = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };

      const res = await fetch(API_URLS.products, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      if (!res.ok) throw new Error('Ошибка создания товара');

      alert('Товар успешно создан');
      navigate('/admin/products');
    } catch (err) {
      console.error(err);
      alert('Не удалось создать товар');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#e7edf3] px-10 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Хедер */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#1f2733]">
              Новый товар
            </h1>
            <p className="mt-1 text-sm text-[#6b7b8b]">
              Заполните форму, чтобы добавить товар в каталог
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/admin/products"
              className="px-4 py-2 rounded-full border border-[#21a56b] text-[#21a56b] text-sm bg-white hover:bg-[#e6fff3] transition-colors shadow-sm"
            >
              ← Назад к товарам
            </Link>
            <Link
              to="/admin"
              className="px-4 py-2 rounded-full border border-[#cbd5e0] text-[#4a5568] text-sm bg-white hover:bg-[#f7fafc] transition-colors shadow-sm"
            >
              Панель администратора
            </Link>
          </div>
        </header>

        {/* Карточка формы */}
        <div className="bg-white rounded-2xl shadow-[0_18px_45px_rgba(16,24,40,0.08)] p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                Название товара *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                placeholder="Введите название товара"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                  Цена (₸) *
                </label>
                <input
                  type="number"
                  name="price"
                  min={0}
                  value={form.price}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                  Количество на складе
                </label>
                <input
                  type="number"
                  name="stock"
                  min={0}
                  value={form.stock}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                Категория
              </label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                placeholder="Например: Витамины"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                Ссылка на изображение
              </label>
              <input
                type="text"
                name="image"
                value={form.image}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                placeholder="https://example.com/image.jpg"
              />
              {form.image && (
                <div className="mt-3">
                  <p className="text-[11px] text-[#8a96a6] mb-1">Предпросмотр:</p>
                  <img
                    src={form.image}
                    alt="Предпросмотр"
                    className="w-20 h-20 rounded-xl object-cover border border-[#e1e7f0]"
                    onError={e => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                    }}
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                Описание товара
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                placeholder="Краткое описание товара"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#edf2f7]">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 rounded-full border border-[#cbd5e0] text-[#4a5568] text-sm bg-white hover:bg-[#f7fafc] transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading || !form.name || form.price <= 0}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  loading || !form.name || form.price <= 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#21a56b] text-white hover:bg-[#1b8a59]'
                }`}
              >
                {loading ? 'Сохранение...' : 'Создать товар'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProductNew;

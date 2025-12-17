import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_URLS } from '../services/api';
import { ArrowLeft, Save } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f5f7fa] p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-[#1f2733]">
              Новый товар
            </h1>
            <p className="mt-1 text-xs text-[#6b7b8b]">
              Заполните форму для добавления
            </p>
          </div>

          <Link
            to="/admin/products"
            className="p-2 rounded-full bg-white border border-[#21a56b] hover:bg-[#e6fff3] transition-colors shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#21a56b]" />
          </Link>
        </div>
      </header>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
              Название товара *
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
              placeholder="Название товара"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
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
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
                placeholder="0"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                Количество
              </label>
              <input
                type="number"
                name="stock"
                min={0}
                value={form.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
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
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
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
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
              placeholder="https://example.com/image.jpg"
            />
            {form.image && (
              <div className="mt-2 flex items-center gap-2">
                <span className="text-[10px] text-[#8a96a6]">Предпросмотр:</span>
                <img
                  src={form.image}
                  alt="Предпросмотр"
                  className="w-10 h-10 rounded object-cover border border-gray-300"
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
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
              placeholder="Краткое описание"
            />
          </div>

          <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-sm text-[#4a5568] bg-white hover:bg-gray-50 transition-colors"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading || !form.name || form.price <= 0}
              className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1 ${
                loading || !form.name || form.price <= 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#21a56b] text-white hover:bg-[#1b8a59]'
              }`}
            >
              {loading ? (
                'Сохранение...'
              ) : (
                <>
                  <Save className="w-3 h-3" />
                  Создать
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h3 className="text-xs font-medium text-blue-800 mb-1">Подсказки:</h3>
        <ul className="text-[10px] text-blue-700 space-y-0.5">
          <li>• Поля с * обязательны для заполнения</li>
          <li>• Цена должна быть больше 0</li>
          <li>• Для изображения используйте прямые ссылки</li>
          <li>• Категория поможет организовать товары</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminProductNew;
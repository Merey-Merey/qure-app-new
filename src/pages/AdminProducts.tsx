// AdminProducts.tsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URLS } from '../services/api';


interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image: string;
  description?: string;
  categoryId?: string;
}

interface Category {
  id: string;
  name: string;
}

const AdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    price: 0,
    category: '',
    stock: 0,
    image: '',
    description: '',
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URLS.products);
      if (!response.ok) throw new Error('Ошибка загрузки товаров');
      const data = await response.json();

      const normalizedData = data.map((product: any) => ({
        id: product.id || '',
        name: product.name || product.title || product.productName || product.product || 'Без названия',
        price: Number(product.price) || Number(product.cost) || 0,
        category: product.category || product.categoryName || product.type || 'Без категории',
        stock: Number(product.stock) || Number(product.quantity) || Number(product.amount) || 0,
        image: product.image || product.imageUrl || product.photo || product.img || 'https://via.placeholder.com/80',
        description: product.description || product.desc || product.info || '',
      }));

      setProducts(normalizedData);
    } catch (e) {
      console.error(e);
      alert('Не удалось загрузить товары');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(API_URLS.categories);
      if (!response.ok) throw new Error('Ошибка загрузки категорий');
      const data = await response.json();

      const normalizedCategories = data.map((cat: any) => ({
        id: cat.id || '',
        name: cat.name || cat.title || cat.categoryName || 'Другое',
      }));
      setCategories(normalizedCategories);
    } catch (e) {
      console.error(e);
      setCategories([
        { id: '1', name: 'Витамины' },
        { id: '2', name: 'Минералы' },
        { id: '3', name: 'Добавки' },
        { id: '4', name: 'Травы' },
        { id: '5', name: 'Другое' },
      ]);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Удалить этот товар?')) return;
    try {
      const response = await fetch(`${API_URLS.products}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Ошибка удаления товара');
      setProducts(products.filter(p => p.id !== id));
      alert('Товар успешно удален');
    } catch (e) {
      console.error(e);
      alert('Не удалось удалить товар');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name || '',
      price: product.price || 0,
      category: product.category || (categories[0]?.name || ''),
      stock: product.stock || 0,
      image: product.image || '',
      description: product.description || '',
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    if (!editingProduct) return;
    try {
      const dataToSend = {
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      };
      const response = await fetch(`${API_URLS.products}/${editingProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) throw new Error('Ошибка обновления товара');

      setProducts(products.map(p =>
        p.id === editingProduct.id ? { ...p, ...dataToSend } : p
      ));

      setShowEditModal(false);
      setEditingProduct(null);
      alert('Товар успешно обновлен');
    } catch (e) {
      console.error(e);
      alert('Не удалось обновить товар');
    }
  };

  const handleCancelEdit = () => {
    setShowEditModal(false);
    setEditingProduct(null);
    setEditForm({
      name: '',
      price: 0,
      category: categories[0]?.name || '',
      stock: 0,
      image: '',
      description: '',
    });
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setEditForm({
      name: '',
      price: 0,
      category: categories[0]?.name || '',
      stock: 0,
      image: '',
      description: '',
    });
    setShowEditModal(true);
  };

  const handleSaveNew = async () => {
    try {
      const dataToSend = {
        ...editForm,
        price: Number(editForm.price),
        stock: Number(editForm.stock),
      };
      const response = await fetch(API_URLS.products, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });
      if (!response.ok) throw new Error('Ошибка создания товара');
      const newProduct = await response.json();

      setProducts([
        ...products,
        {
          ...dataToSend,
          id: newProduct.id || Date.now().toString(),
          image: dataToSend.image || 'https://via.placeholder.com/80',
        },
      ]);

      setShowEditModal(false);
      handleCancelEdit();
      alert('Товар успешно создан');
    } catch (e) {
      console.error(e);
      alert('Не удалось создать товар');
    }
  };

  const filteredProducts = products.filter(product => {
    const term = search.toLowerCase();
    return (
      (product.name || '').toLowerCase().includes(term) ||
      (product.category || '').toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#e7edf3] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#21a56b] mx-auto mb-4" />
          <p className="text-[#6b7b8b] text-sm">Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e7edf3] px-10 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Хедер */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-[#1f2733]">
              Управление товарами
            </h1>
            <p className="mt-1 text-sm text-[#6b7b8b]">
              Всего товаров: <span className="font-semibold">{products.length}</span>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchProducts}
              className="px-4 py-2 rounded-full border border-[#21a56b] text-[#21a56b] text-sm bg-white hover:bg-[#e6fff3] transition-colors shadow-sm"
            >
              Обновить
            </button>
            <Link
              to="/admin"
              className="px-4 py-2 rounded-full border border-[#21a56b] text-[#21a56b] text-sm bg-white hover:bg-[#e6fff3] transition-colors shadow-sm"
            >
              ← Назад в панель
            </Link>
          </div>
        </header>

        {/* Поиск + кнопка добавления */}
        <section className="bg-white rounded-2xl shadow-[0_18px_45px_rgba(16,24,40,0.08)] p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center mb-6">
            <div className="flex-1 w-full">
              <input
                type="text"
                placeholder="Поиск товаров по названию или категории..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
              />
            </div>
            <button
              onClick={handleAddNew}
              className="px-6 py-2 rounded-full bg-[#21a56b] text-white text-sm shadow-md hover:bg-[#1b8a59] transition-colors whitespace-nowrap"
            >
              + Добавить товар
            </button>
          </div>

          {/* Таблица */}
          {products.length === 0 ? (
            <div className="text-center py-10 text-[#8a96a6]">
              Товары не найдены
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#f3f6fa] text-[#6b7b8b]">
                  <tr>
                    <th className="p-3 text-left font-semibold">Товар</th>
                    <th className="p-3 text-left font-semibold">Категория</th>
                    <th className="p-3 text-left font-semibold">Цена</th>
                    <th className="p-3 text-left font-semibold">Остаток</th>
                    <th className="p-3 text-left font-semibold">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map(product => (
                    <tr
                      key={product.id}
                      className="border-b border-[#edf2f7] hover:bg-[#f7fafc] transition-colors"
                    >
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || 'https://via.placeholder.com/80'}
                            alt={product.name}
                            className="w-10 h-10 rounded-xl object-cover border border-[#e1e7f0]"
                            onError={e => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                            }}
                          />
                          <div>
                            <p className="font-semibold text-[#1f2733]">
                              {product.name || 'Без названия'}
                            </p>
                            {product.description && (
                              <p className="text-[11px] text-[#8a96a6] max-w-xs truncate">
                                {product.description}
                              </p>
                            )}
                            <p className="text-[11px] text-[#a0aec0]">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="inline-flex px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px]">
                          {product.category || 'Без категории'}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-[#1f2733]">
                        {product.price?.toLocaleString() || 0} ₸
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            (product.stock || 0) > 20
                              ? 'bg-emerald-50 text-emerald-700'
                              : (product.stock || 0) > 5
                              ? 'bg-yellow-50 text-yellow-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          {product.stock || 0} шт
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="px-3 py-1 rounded-full bg-[#e3e8ee] text-xs text-[#1f2733] hover:bg-[#d7dee9]"
                          >
                            Редактировать
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="px-3 py-1 rounded-full bg-red-500 text-xs text-white hover:bg-red-600"
                          >
                            Удалить
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredProducts.length === 0 && products.length > 0 && (
                <div className="text-center py-6 text-[#8a96a6] text-sm">
                  Товары не найдены. Измените поисковый запрос.
                </div>
              )}
            </div>
          )}
        </section>

        {/* Нижняя статистика */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-[0_18px_45px_rgba(16,24,40,0.08)]">
            <p className="text-xs text-[#8a96a6] mb-1">Всего товаров</p>
            <p className="text-2xl font-semibold text-[#1f2733]">{products.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-[0_18px_45px_rgba(16,24,40,0.08)]">
            <p className="text-xs text-[#8a96a6] mb-1">Низкий запас (&lt; 10)</p>
            <p className="text-2xl font-semibold text-red-500">
              {products.filter(p => (p.stock || 0) < 10).length}
            </p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-[0_18px_45px_rgba(16,24,40,0.08)]">
            <p className="text-xs text-[#8a96a6] mb-1">Общая стоимость</p>
            <p className="text-2xl font-semibold text-[#1f2733]">
              {products
                .reduce(
                  (sum, p) => sum + (p.price || 0) * (p.stock || 0),
                  0
                )
                .toLocaleString()}{' '}
              ₸
            </p>
          </div>
        </section>

        {/* Модалка */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold text-[#1f2733]">
                    {editingProduct ? 'Редактирование товара' : 'Добавление товара'}
                  </h2>
                  <button
                    onClick={handleCancelEdit}
                    className="text-[#8a96a6] hover:text-[#1f2733] text-xl"
                  >
                    х
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                      Название товара *
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={e => setEditForm({ ...editForm, name: e.target.value })}
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
                        value={editForm.price}
                        onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                        className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                        min={0}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                        Количество на складе *
                      </label>
                      <input
                        type="number"
                        value={editForm.stock}
                        onChange={e => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                        className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                        min={0}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                      Категория
                    </label>
                    <select
                      value={editForm.category}
                      onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                    >
                      <option value="">Выберите категорию</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                      Ссылка на изображение
                    </label>
                    <input
                      type="text"
                      value={editForm.image}
                      onChange={e => setEditForm({ ...editForm, image: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                      placeholder="https://example.com/image.jpg"
                    />
                    {editForm.image && (
                      <div className="mt-2">
                        <p className="text-[11px] text-[#8a96a6] mb-1">Предпросмотр:</p>
                        <img
                          src={editForm.image}
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
                      value={editForm.description}
                      onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-[#e1e7f0] text-sm focus:outline-none focus:border-[#21a56b]"
                      rows={3}
                      placeholder="Введите описание товара"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#edf2f7]">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 rounded-full border border-[#21a56b] text-[#21a56b] text-sm bg-white hover:bg-[#e6fff3] transition-colors"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={editingProduct ? handleSaveEdit : handleSaveNew}
                    disabled={!editForm.name || editForm.price <= 0}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      !editForm.name || editForm.price <= 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-[#21a56b] text-white hover:bg-[#1b8a59]'
                    }`}
                  >
                    {editingProduct ? 'Сохранить изменения' : 'Добавить товар'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_URLS } from '../services/api';
import { Search, Edit2, Trash2, Plus, RefreshCw, ArrowLeft } from 'lucide-react';

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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#21a56b] mx-auto mb-3" />
          <p className="text-[#6b7b8b] text-xs">Загрузка товаров...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] p-4">
      <header className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-[#1f2733]">
              Управление товарами
            </h1>
            <p className="mt-1 text-xs text-[#6b7b8b]">
              Всего товаров: <span className="font-semibold">{products.length}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={fetchProducts}
              className="p-2 rounded-full bg-white border border-[#e1e7f0] hover:bg-gray-50 transition-colors shadow-sm"
              title="Обновить"
            >
              <RefreshCw className="w-4 h-4 text-[#6b7b8b]" />
            </button>
            <Link
              to="/admin"
              className="p-2 rounded-full bg-white border border-[#21a56b] hover:bg-[#e6fff3] transition-colors shadow-sm"
              title="Назад"
            >
              <ArrowLeft className="w-4 h-4 text-[#21a56b]" />
            </Link>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#8a96a6]" />
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-gray-200 text-sm focus:outline-none focus:border-[#21a56b]"
          />
        </div>

        <button
          onClick={handleAddNew}
          className="w-full mb-4 px-4 py-3 rounded-xl bg-[#21a56b] text-white text-sm font-medium shadow-sm hover:bg-[#1b8a59] transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Добавить товар
        </button>
      </header>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs text-[#8a96a6] mb-1">Всего товаров</p>
          <p className="text-base font-semibold text-[#1f2733]">{products.length}</p>
        </div>
        <div className="bg-white rounded-xl p-3 shadow-sm">
          <p className="text-xs text-[#8a96a6] mb-1">Низкий запас</p>
          <p className="text-base font-semibold text-red-500">
            {products.filter(p => (p.stock || 0) < 10).length}
          </p>
        </div>
      </div>

      <section className="space-y-3">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-sm">
            <p className="text-sm text-[#8a96a6]">
              {products.length === 0 ? 'Товары не найдены' : 'По вашему запросу ничего не найдено'}
            </p>
          </div>
        ) : (
          filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
            >
              <div className="flex gap-3 mb-3">
                <img
                  src={product.image || 'https://via.placeholder.com/80'}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  onError={e => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/80';
                  }}
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-[#1f2733] mb-1 truncate">
                    {product.name || 'Без названия'}
                  </h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs">
                      {product.category || 'Без категории'}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      (product.stock || 0) > 20
                        ? 'bg-emerald-50 text-emerald-700'
                        : (product.stock || 0) > 5
                        ? 'bg-yellow-50 text-yellow-700'
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {product.stock || 0} шт
                    </span>
                  </div>
                  <p className="font-semibold text-[#1f2733] text-sm">
                    {product.price?.toLocaleString() || 0} ₸
                  </p>
                  {product.description && (
                    <p className="text-xs text-[#8a96a6] mt-1 line-clamp-1">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleEdit(product)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#edf2f7] text-xs text-[#1f2733] hover:bg-[#e1e7f0] transition-colors flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 px-3 py-2 rounded-lg bg-red-50 text-xs text-red-700 hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md mt-4 mb-4">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold text-[#1f2733]">
                  {editingProduct ? 'Редактирование товара' : 'Добавление товара'}
                </h2>
                <button
                  onClick={handleCancelEdit}
                  className="text-[#8a96a6] hover:text-[#1f2733]"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                    Название товара *
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
                    placeholder="Название товара"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                      Цена (₸) *
                    </label>
                    <input
                      type="number"
                      value={editForm.price}
                      onChange={e => setEditForm({ ...editForm, price: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
                      min={0}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#6b7b8b] mb-1">
                      Количество *
                    </label>
                    <input
                      type="number"
                      value={editForm.stock}
                      onChange={e => setEditForm({ ...editForm, stock: Number(e.target.value) })}
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
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
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
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
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
                    placeholder="https://example.com/image.jpg"
                  />
                  {editForm.image && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] text-[#8a96a6]">Предпросмотр:</span>
                      <img
                        src={editForm.image}
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
                    value={editForm.description}
                    onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#21a56b]"
                    rows={2}
                    placeholder="Описание товара"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 rounded-lg border border-[#21a56b] text-[#21a56b] text-xs bg-white hover:bg-[#e6fff3] transition-colors"
                >
                  Отмена
                </button>
                <button
                  onClick={editingProduct ? handleSaveEdit : handleSaveNew}
                  disabled={!editForm.name || editForm.price <= 0}
                  className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
                    !editForm.name || editForm.price <= 0
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#21a56b] text-white hover:bg-[#1b8a59]'
                  }`}
                >
                  {editingProduct ? 'Сохранить' : 'Добавить'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
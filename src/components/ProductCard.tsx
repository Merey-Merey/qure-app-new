import { useState } from 'react';
import { Heart } from 'iconoir-react';
import type { Product } from '../mocks/products';
import { useFavorites } from '../store/favorites';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [count, setCount] = useState(1);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const inWishlist = isFavorite(product.id);

  const toggleFavorite = (product: Product) => {
    if (inWishlist) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, count);
    navigate('/cart');
  };

  return (
    <div
      className="rounded-[12px] overflow-hidden border border-[#F8F8F8] shadow-sm"
      style={{ background: '#FFFFFF' }}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-[80%] translate-y-7 ml-5 object-cover"
        />

        {product.prescriptionRequired && (
          <span
            className="absolute top-2 left-16 px-2 py-1 rounded-[8px]"
            style={{
              backgroundColor: '#FFE0E0',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              color: '#FE5F55',
            }}
          >
            По рецепту
          </span>
        )}

        {product.discountPercent && (
          <span
            className="absolute top-2 right-0 px-2 py-1 rounded-[8px]"
            style={{
              backgroundColor: '#E7F0EA',
              fontFamily: 'Manrope, sans-serif',
              fontWeight: 500,
              fontSize: '12px',
              color: '#2B865A',
            }}
          >
            -{product.discountPercent}%
          </span>
        )}

        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-32 right-2 p-1 rounded-full bg-white/70"
          style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          <Heart
            width={16}
            height={16}
            style={{
              color: inWishlist ? '#FE5F55' : '#989C99',
            }}
          />
        </button>
      </div>

      <div className="p-3 mt-8">
        <p
          className="text-sm font-medium mb-1 "
          style={{ fontFamily: 'Manrope, sans-serif', color: '#222021', width: '170px' }}
        >
          {product.title}
        </p>
        <p
          className="text-xs text-[#635436] mb-1"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          {product.subtitle}
        </p>


        <div className="flex items-center justify-between mb-2">
          <span
            className="font-bold"
            style={{
              fontFamily: 'Manrope, sans-serif',
              fontSize: '16px',
              color: '#2B865A',
            }}
          >
            {product.price} ₸
          </span>
          {product.oldPrice && (
            <span
              className="text-xs line-through text-[#B4B7B5]"
              style={{ fontFamily: 'Manrope, sans-serif' }}
            >
              {product.oldPrice} ₸
            </span>
          )}
        </div>
       
        {product.inStock ? (
          <div className="flex items-center justify-between rounded-[100px] bg-[#F4EDE6] px-4 py-2">
            <button
              onClick={() => setCount(Math.max(1, count - 1))}
              className="text-[#222021]"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px' }}
            >
              -
            </button>
            <span
              style={{
                fontFamily: 'Manrope, sans-serif',
                fontSize: '14px',
                color: '#222021',
              }}
            >
              {count} шт
            </span>
            <button
              onClick={() => setCount(count + 1)}
              className="text-[#222021]"
              style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px' }}
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="w-full rounded-[100px] bg-[#F4EDE6] px-4 py-2 text-[#222021] font-medium"
            style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px' }}
            onClick={handleAddToCart}
          >
            В корзину
          </button>
        )}
        <button
          className="w-full mt-2 rounded-[100px] bg-[#2B865A] px-4 py-2 text-white font-medium"
          style={{ fontFamily: 'Manrope, sans-serif', fontSize: '14px' }}
          onClick={handleAddToCart}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}

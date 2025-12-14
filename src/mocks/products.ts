// src/mocks/products.ts
export type Product = {
  popularity: number;
  description: any;
  categorySlug: string | undefined;
  subSlug: string | undefined;
  id: string;
  title: string;
  subtitle: string;
  price: number;
  oldPrice?: number;
  image: string;
  inStock?: boolean;         
  prescriptionRequired: boolean;
  discountPercent?: number;
};

// export const popularProductsMock: Product[] = [
//   {
//     id: '1',
//     title: 'Гептрал таблетки покрытые кишечно-растворимой об.',
//     subtitle: '400 гр / 120 шт',
//     price: 1340,
//     image: '/assets/images/gentral.png',
//     prescriptionRequired: true,
//   },
//   {
//     id: '2',
//     title: 'Адеметионин Велфарм таблетки кишечно-растворимые покр...',
//     subtitle: '400 гр / 120 шт',
//     price: 1340,
//     oldPrice: 1640.76,
//     image: '/assets/images/ademetionin.png',
//     prescriptionRequired: false,
//     discountPercent: 32,
//   },
//   {
//     id: '3',
//     title: 'Лоратадин+Тева',
//     subtitle: '130 шт / упаковка',
//     price: 1340,
//     image: '/assets/images/loratadin.png',
//     inStock: true,
//     prescriptionRequired: false,
//   },
//   {
//     id: '4',
//     title: 'Гелабено капсулы',
//     subtitle: '30 шт',
//     price: 1340,
//     oldPrice: 1640.76,
//     image: '/assets/images/gelabene.png',
//     inStock: true,
//     prescriptionRequired: false,
//     discountPercent: 32,
//   },
//   {
//     id: '5',
//     title: 'Гептрал таблетки покрытые кишечно-растворимой об.',
//     subtitle: '400 гр / 120 шт',
//     price: 1340,
//     oldPrice: 1640.76,
//     image: '/assets/images/gentral.png',
//     inStock: true,
//     prescriptionRequired: true,
//   },
//   {
//     id: '6',
//     title: 'Адеметионин Велфарм таблетки кишечно-растворимые покр...',
//     subtitle: '400 гр / 120 шт',
//     price: 1340,
//     oldPrice: 1640.76,
//     image: '/assets/images/ademetionin.png',
//     inStock: true,
//     prescriptionRequired: false,
//     discountPercent: 32,
//   },
// ];
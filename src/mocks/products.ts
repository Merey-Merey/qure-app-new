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


// src/mocks/categories.ts
export type Category = {
  subcategories: any;
  id: number;
  slug: string;     
  title: string;
  image: string;
};

// export const popularCategoriesMock: Category[] = [
//   { id: 1, slug: 'otc',       title: 'Лекарства без рецепта',    image: '/assets/images/lekarstvoBezResept.png' },
//   { id: 2, slug: 'mom-baby',  title: 'Мама и ребёнок',          image: '/assets/images/mamaIrebenok.png' },
//   { id: 3, slug: 'rx',        title: 'Рецептурные лекарства',   image: '/assets/images/reseptturnyeLekartsvo.png' },
//   { id: 4, slug: 'vt',        title: 'Витамины и минералы',     image: '/assets/images/vit.png' },
//   { id: 5, slug: 'devices',   title: 'Медицинские изделия',     image: '/assets/images/medicinskieIzdelie.png' },
//   { id: 6, slug: 'hygiene',   title: 'Средства гигиены',        image: '/assets/images/sredstvoGigiena.png' },
//   { id: 7, slug: 'care-rehab',title: 'Уход и реабилитация',     image: '/assets/images/uhodIreabil.png' },
//   { id: 8, slug: 'promo',     title: 'Акции и подборки',        image: '/assets/images/akziIpodborki.png' },
// ];

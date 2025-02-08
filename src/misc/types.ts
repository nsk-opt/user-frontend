export interface Image {
  id: number;
  link: string;
}

export interface Category {
  id: number;
  name: string;
  image: Image;
}

export interface Cost {
  id: number;
  wholesalePrice: number;
  retailPrice: number;
}

export interface Product {
  id: number;
  name: string;
  cost: Cost;
  availability: number;
  images: Image[];
}

export const categories: Category[] = [
  {
    id: 1,
    name: "Электроника",
    image: {
      id: 1,
      link: "https://via.placeholder.com/150",
    },
  },
  {
    id: 2,
    name: "Одежда",
    image: {
      id: 2,
      link: "https://via.placeholder.com/150",
    },
  },
];

export const products: Product[] = [
  {
    id: 1,
    name: "Смартфон",
    cost: {
      id: 1,
      wholesalePrice: 25000,
      retailPrice: 30000,
    },
    availability: 10,
    images: [
      {
        id: 1,
        link: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 2,
    name: "Ноутбук",
    cost: {
      id: 2,
      wholesalePrice: 70000,
      retailPrice: 80000,
    },
    availability: 5,
    images: [
      {
        id: 2,
        link: "https://via.placeholder.com/150",
      },
    ],
  },
  {
    id: 3,
    name: "Футболка",
    cost: {
      id: 3,
      wholesalePrice: 1000,
      retailPrice: 1500,
    },
    availability: 20,
    images: [
      {
        id: 3,
        link: "https://via.placeholder.com/150",
      },
    ],
  },
];

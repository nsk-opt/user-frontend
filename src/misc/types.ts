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

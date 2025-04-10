export interface Card {
  id: number;
  name: string;
  imagesIds: number[];

  description ?: string;
  price ?: number;
  availability ?: number;
}

export interface CardAdmin {
  id: number;
  name: string;
  imagesIds: number[];

  description ?: string;
  wholesalePrice ?: number;
  retailPrice ?: number;
  availability ?: number;
}
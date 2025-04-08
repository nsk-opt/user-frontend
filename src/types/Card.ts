export interface Card {
  id: number;
  name: string;
  imagesIds: number[];

  description ?: string;
  price ?: number[];
  availability ?: number;
}
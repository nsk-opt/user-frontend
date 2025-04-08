import { Card } from "../types/Card";

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = "https://azenizzka.ru:8443/api") {
    this.baseUrl = baseUrl;
  }

  async getCategories(): Promise<Card[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name),
        imagesIds:item.images.map((img: any) => Number(img))
      }));
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Could not load categories. Please try again later.');
    }
  }

  async getProducts(categoryId: number): Promise<Card[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories/${categoryId}/products`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name),
        imagesIds:item.images.map((img: any) => Number(img)),

        price: Number(item.price),
        availability: Number(item.availability),
        description: Number(item.description)
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Could not load products. Please try again later.');
    }
  }

  async getProduct(productId: number): Promise<Card> {
    try {
      const response = await fetch(`${this.baseUrl}/products/${productId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const item = await response.json();
      
      return {
        id: Number(item.id),
        name: String(item.name),
        imagesIds: item.images.map((img: any) => Number(img)),
        price: Number(item.price),
        availability: Number(item.availability),
        description: String(item.description || '')
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Could not load product. Please try again later.');
    }
  }

  getImageUrl(id: number): string {
    return `${this.baseUrl}/images/${id}`;
  }
}
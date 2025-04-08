import { Category, ImageData } from "../types/category";

export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = 'https://azenizzka.ru:8443/api') {
    this.baseUrl = baseUrl;
  }

  async getCategories(): Promise<Category[]> {
    const response = await fetch(`${this.baseUrl}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  }

  async getImageData(imageId: number): Promise<ImageData> {
    const response = await fetch(`${this.baseUrl}/images/${imageId}`);
    if (!response.ok) throw new Error('Failed to fetch image');
    
    const blob = await response.blob();
    return {
      id: imageId,
      url: URL.createObjectURL(blob)
    };
  }

}
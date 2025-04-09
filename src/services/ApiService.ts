import { Card } from "../types/Card";
import { FormData } from "../types/AuthFormData";
import "../utils/JwtUtils";
import { updateJwt } from "../utils/JwtUtils";

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
        imagesIds:item.imagesIds.map((img: any) => Number(img))
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
        imagesIds:item.imagesIds.map((img: any) => Number(img)),

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
        imagesIds: item.imagesIds.map((img: any) => Number(img)),
        price: Number(item.price),
        availability: Number(item.availability),
        description: String(item.description || '')
      };
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Could not load product. Please try again later.');
    }
  }

  async registerUser(data: FormData): Promise<boolean> {
    const response = await fetch(`${this.baseUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
  
  
    if (response.status === 201) {
      return true;
    }

    const responseData = await response.json();
    
    const errorMessage = responseData.error 
      || `Ошибка регистрации (код ${response.status})`;
      
    throw new Error(errorMessage);
  }

  async authUser(data: FormData) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (response.status !== 200) {
      throw new Error(responseData.error || 'Ошибка авторизации, проверьте корректность введенных данных');
    }

    const jwt = String(responseData.accessToken);
    updateJwt(jwt);
  }

  getImageUrl(id: number): string {
    return `${this.baseUrl}/images/${id}`;
  }
}
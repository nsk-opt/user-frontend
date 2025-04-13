import { Card, CardAdmin } from "../types/Card";
import { FormData } from "../types/AuthFormData";
import "../utils/JwtUtils";
import { getJwt, updateJwt } from "../utils/JwtUtils";

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

  async getCategoriesAdmin(): Promise<CardAdmin[]> {
    try {
      const response = await fetch(`${this.baseUrl}/categories`, {
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
        }
      });
      
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

  async getCategoryAdmin(id: number): Promise<CardAdmin> {
    try {
      const response = await fetch(`${this.baseUrl}/categories/${id}`, {
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return {
        id: Number(data.id),
        name: String(data.name),
        imagesIds: data.imagesIds.map((img: any) => Number(img))
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw new Error('Could not load categories. Please try again later.');
    }
  }

  async createImage(file: File): Promise<number> {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(`${this.baseUrl}/images`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getJwt()}`,
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return Number(data);
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Could not upload image. Please try again later.');
    }
  }

  async createCategory(name: string): Promise<number> {
    try {
        const response = await fetch(`${this.baseUrl}/categories`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getJwt()}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({"name" : name})
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return Number(data.id);
    } catch (error) {
        console.error('Error uploading image:', error);
        throw new Error('Could not upload image. Please try again later.');
    }
  }

  private async updateCategoryImage(categoryId: number, imagesIds: number[]): Promise<void> {
    const response = await fetch(`${this.baseUrl}/categories/${categoryId}/images`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${getJwt()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(imagesIds)
    });
  
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
  }


  async updateCategory(categoryId: number, name: string, imagesIds: number[]) {
    try {
      if (imagesIds[0] != -1)
        this.updateCategoryImage(categoryId, imagesIds);
      
      const response = await fetch(`${this.baseUrl}/categories/${categoryId}`, {
          method: 'PUT',
          headers: {
              'Authorization': `Bearer ${getJwt()}`,
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({"name": name})
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

    } catch (error) {
      console.error('Error updating category images:', error);
      throw new Error('Could not update category images. Please try again later.');
    }
  }

  async deleteCategory(categoryId: number) {
    try {
      const response = await fetch(`${this.baseUrl}/categories/${categoryId}`, {
          method: 'DELETE',
          headers: {
              'Authorization': `Bearer ${getJwt()}`,
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("delete category: " + categoryId);

    } catch (error) {
      console.error('Error delete category:', error);
      throw new Error('Could not delete category. Please try again later.');
    }
  }


  async getProductsAdmin(): Promise<CardAdmin[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products`, {
        headers: {
          'Authorization': `Bearer ${getJwt()}`,
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      return data.map((item: any) => ({
        id: Number(item.id),
        name: String(item.name),
        imagesIds: item.imagesIds.map((img: any) => Number(img)),
        wholesalePrice: Number(item.cost.wholesalePrice),
        retailPrice: Number(item.cost.retailPrice),
        availability: Number(item.availability),
        description: String(item.description || '')
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
    return id <= 0 ? "/favicon.ico" : `${this.baseUrl}/images/${id}`;
  }
}
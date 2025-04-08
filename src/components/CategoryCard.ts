import { ApiService } from "../services/apiService";
import { Category, ImageData } from "../types/category";

export class CategoryCard {
  private element: HTMLElement;
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
    this.element = document.createElement('div');
    this.element.className = 'category-card';
  }

  async render(category: Category): Promise<HTMLElement> {
    const mainImageId = category.images[0];
    const image = await this.api.getImageData(mainImageId);

    this.element.innerHTML = `
      <div class="category-image-container">
        ${image 
          ? `<img src="${image.url}" alt="${category.name}" class="category-image" loading="lazy">`
          : '<div class="category-image-placeholder"></div>'
        }
      </div>
      <h3 class="category-name">${category.name}</h3>
    `;
    
    return this.element;
  }
}
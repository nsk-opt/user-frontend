import { ApiService } from "../services/ApiService";
import "../../frontend/components/form.css"
import "../../frontend/styles/base.css"
import { CardAdmin } from "../types/Card";

export class AdminProcessor {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  private drawButton(title: string, handler: () => void): HTMLDivElement {
    const menuItem = document.createElement('div');
    menuItem.textContent = title;
    menuItem.className = "btn"
    
    menuItem.addEventListener('click', handler);
    
    return menuItem;
  }

  drawMenu(container: HTMLDivElement) {
    container.appendChild(this.drawButton("Товары", () => {
      window.location.pathname = "/admin/categories";
    }));

    container.appendChild(this.drawButton("Менеджеры", () => {

    }));

    container.appendChild(this.drawButton("Статистика", () => {

    }));
  }

  async drawCategoriesPage(container: HTMLDivElement) {
    try {
      document.body.innerHTML = ``;
      container.innerHTML = '';
      
      let categories = await this.api.getCategoriesAdmin();

      let createNewCategoryCard : CardAdmin = {
        id : -1,
        name : "Создать новую категорию",
        imagesIds: [-1]
      }

      categories.unshift(createNewCategoryCard);

      const cards = categories.map(item => {
        return this.renderCard(item);
      });

      cards.forEach(card => container.appendChild(card));
    } catch (error) {
      console.error('Error:', error);
      container.innerHTML = `
        <div class="error-message">
          Ошибка загрузки данных. Пожалуйста, попробуйте позже.
        </div>
      `;
    }
  }


  renderCard(item: CardAdmin): HTMLElement {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    var buttonTitle : string = "Настройки";
    var handler : () => void = () => {
      window.location.pathname = "/admin/categories/" + item.id;
    };

    const mainImageId = item.imagesIds[0];
    const imageUrl = this.api.getImageUrl(mainImageId);

    cardElement.innerHTML = `
      <div class="card-image-container">
        <img src="${imageUrl}" alt="${item.name}" class="card-image" loading="lazy"
              onerror="this.onerror=null;this.src='/assets/placeholder.webp';">
      </div>
      <h3 class="card-name">${item.name}</h3>
    `;
    
    let settingsButton = this.drawButton(buttonTitle, handler);

    cardElement.appendChild(settingsButton);
    
    return cardElement;
  }
}
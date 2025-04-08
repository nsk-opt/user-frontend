import { ApiService } from "../services/ApiService";
import { Card } from "../types/Card";

export class CardProcessor {
  private api: ApiService;

  constructor(api: ApiService) {
    this.api = api;
  }

  async drawCards(items: Card[], container: HTMLDivElement) {
    try {
      document.body.innerHTML = ``;
      container.innerHTML = '';
      
      const cardPromises = items.map(async item => {
        return this.renderCard(item);
      });

      const cards = await Promise.all(cardPromises);
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

  isProduct(card: Card) : boolean {
    return 'price' in card;
  }

  async renderCard(item: Card): Promise<HTMLElement> {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    const mainImageId = item.imagesIds[0];
    const imageUrl = this.api.getImageUrl(mainImageId);

    let redirectPath : string;
    
    if (this.isProduct(item)) {
      redirectPath = `/products/${item.id}`
    } else {
      redirectPath = `/categories/${item.id}`
    }

    cardElement.addEventListener('click', () => {
      window.location.href = redirectPath;
    })

    const priceHtml = 'price' in item 
      ? `<div class="card-price">${item.price} ₽</div>` 
      : '';

    const availabilityHtml = 'availability' in item
      ? `<div class="card-availability ${item.availability ? 'in-stock' : 'out-of-stock'}">
           ${item.availability ? 'В наличии' : 'Нет в наличии'}
         </div>`
      : '';

    cardElement.innerHTML = `
      <div class="card-image-container">
        <img src="${imageUrl}" alt="${item.name}" class="card-image" loading="lazy"
             onerror="this.onerror=null;this.src='/assets/placeholder.webp';">
      </div>
      <h3 class="card-name">${item.name}</h3>
      ${priceHtml}
      ${availabilityHtml}
    `;
    
    return cardElement;
  }
}
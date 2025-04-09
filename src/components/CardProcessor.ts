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

  async drawProduct(product: Card, container: HTMLDivElement) {
    try {
      document.body.innerHTML = ``;
      container.innerHTML = '';
      
      const productElement = await this.renderProductPage(product);
      container.appendChild(productElement);
    } catch (error) {
      console.error('Error:', error);
      container.innerHTML = `
        <div class="error-message">
          Ошибка загрузки данных. Пожалуйста, попробуйте позже.
        </div>
      `;
    }
  }

  private async renderProductPage(product: Card): Promise<HTMLElement> {
    const productContainer = document.createElement('div');
    productContainer.className = 'product-page';
  
    const imageUrls = product.imagesIds.map(id => this.api.getImageUrl(id));
    
    productContainer.innerHTML = `
      <div class="product-content">
        <div class="product-gallery">
          <div class="main-image-container">
            <img src="${imageUrls[0]}" alt="${product.name}" class="main-image" loading="lazy">
          </div>
          <div class="thumbnails">
            ${imageUrls.map((url, index) => `
              <img src="${url}" alt="${product.name} thumbnail ${index + 1}" 
                   class="thumbnail ${index === 0 ? 'active' : ''}"
                   data-index="${index}">
            `).join('')}
          </div>
        </div>
        <div class="product-info">
          <h1 class="product-title">${product.name}</h1>
          <div class="product-price">${product.price} ₽</div>
          <div class="product-meta">
            <div class="availability ${product.availability && product.availability > 0 ? 'in-stock' : 'out-of-stock'}">
              ${product.availability && product.availability > 0 ? 'В наличии · ' + product.availability + ' шт.' : 'Нет в наличии'}
            </div>
            <button class="order-button" ${!(product.availability && product.availability > 0) ? 'disabled' : ''}>
              Заказать
            </button>
          </div>
          <div class="product-description">
            <h3>Описание</h3>
            <p>${product.description || 'Описание не предоставлено'}</p>
          </div>
        </div>
      </div>
    `;
  
    this.setupImageGallery(productContainer, imageUrls);
    
    const orderButton = productContainer.querySelector('.order-button');
    if (orderButton) {
      orderButton.addEventListener('click', () => this.handleOrder(product));
    }
  
    return productContainer;
  }
  
  private setupImageGallery(container: HTMLElement, imageUrls: string[]) {
    const thumbnails = container.querySelectorAll('.thumbnail');
    const mainImage = container.querySelector('.main-image') as HTMLImageElement;
  
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbnails.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const indexStr = thumb.getAttribute('data-index');
        const index = indexStr ? parseInt(indexStr, 10) : 0;
        if (index >= 0 && index < imageUrls.length) {
          mainImage.src = imageUrls[index];
        }
      });
    });
  }
  
  private handleOrder(product: Card) {
    console.log(`Ordering product ${product.id}`);
    alert(`Че, ебу дал?! не готово еще! sudo docker compose down -v епта бля`);
  }

  isProduct(card: Card): boolean {
    return 'price' in card;
  }

  async renderCard(item: Card): Promise<HTMLElement> {
    const cardElement = document.createElement('div');
    cardElement.className = 'card';

    const mainImageId = item.imagesIds[0];
    const imageUrl = this.api.getImageUrl(mainImageId);

    let redirectPath: string;
    
    if (this.isProduct(item)) {
      redirectPath = `/products/${item.id}`;
    } else {
      redirectPath = `/categories/${item.id}`;
    }

    cardElement.addEventListener('click', () => {
      window.location.href = redirectPath;
    });

    const priceHtml = 'price' in item 
      ? `<div class="card-price">${item.price} ₽</div>` 
      : '';

    const availabilityHtml = 'availability' in item
      ? `<div class="card-availability in-stock">
          ${item.availability && item.availability > 0 ? 'Подробнее' : ''}
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
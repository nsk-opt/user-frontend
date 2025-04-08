import '../../frontend/styles/base.css';
import '../../frontend/components/card.css';

import { ApiService } from '../services/ApiService';
import { CardProcessor } from '../components/CardProcessor';

async function drawCategories() {
  const api = new ApiService();
  const container = document.createElement('div');
  container.className = 'cards-grid';

  try {
    const categories = await api.getCategories();
    const processor = new CardProcessor(api);
    await processor.drawCards(categories, container);
    document.body.appendChild(container);
  } catch (error) {
    container.innerHTML = `
      <div class="error-message">
        Не удалось загрузить категории. Пожалуйста, попробуйте позже.
      </div>
    `;
  }
}

async function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  drawCategories();  
}

document.addEventListener('DOMContentLoaded', initApp);

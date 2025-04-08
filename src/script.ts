// src/script.ts
import '../frontend/styles/base.css';
import { ApiService } from './services/apiService';
import { CategoryCard } from './components/CategoryCard';

async function initApp() {
  const api = new ApiService();
  const container = document.createElement('div');
  container.className = 'categories-grid';
  document.body.appendChild(container);

  try {
    container.innerHTML = '<div class="loading-spinner"></div>';

    const categories = await api.getCategories();
    
    const cardPromises = categories.map(async category => {
      const card = new CategoryCard(api);
      return card.render(category);
    });

    const cards = await Promise.all(cardPromises);
    container.innerHTML = '';
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

document.addEventListener('DOMContentLoaded', initApp);
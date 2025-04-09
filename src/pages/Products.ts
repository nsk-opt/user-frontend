import '../../frontend/styles/base.css';
import '../../frontend/components/card.css';
import '../../frontend/components/product.css';


import { CardProcessor } from '../components/CardProcessor';
import { ApiService } from '../services/ApiService';

async function drawProduct(productId: number) {
  const api = new ApiService();
  const container = document.createElement('div');
  container.className = 'product-container';

  try {
    const product = await api.getProduct(productId);
    const processor = new CardProcessor(api);
    await processor.drawProduct(product, container);
    document.body.appendChild(container);
  } catch (error) {
    container.innerHTML = `
      <div class="error-message">
        Не удалось загрузить товар. Пожалуйста, попробуйте позже.
      </div>
    `;
    document.body.appendChild(container);
  }
}

function isInteger(value: string): boolean {
  const num = Number(value);
  return Number.isInteger(num) && !isNaN(num);
}

async function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');

  const strId = pathParts[pathParts.length - 1];


  if (isInteger(strId) && strId !== "") {
    drawProduct(Number(strId));
  }
}

document.addEventListener('DOMContentLoaded', initApp);


document.addEventListener('DOMContentLoaded', initApp);
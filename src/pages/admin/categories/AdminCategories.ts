import '../../../../frontend/styles/base.css';
import '../../../../frontend/components/card.css';

import { ApiService } from '../../../services/ApiService';
import { AdminProcessor } from '../../../components/AdminProcessor';

async function drawCategories() {
  const api = new ApiService();
  const container = document.createElement('div');
  container.className = 'cards-grid';

  try {
    const processor = new AdminProcessor(api);
    await processor.drawCategoriesPage(container);
    document.body.appendChild(container);
  } catch (error) {
    container.innerHTML = `
      <div class="error-message">
        Не удалось загрузить категории. Пожалуйста, попробуйте позже.
      </div>
    `;
  }
}

function isInteger(value: string): boolean {
  const num = Number(value);
  return Number.isInteger(num) && !isNaN(num);
}

// async function drawProducts(categoryId: number) {
//   const api = new ApiService();
//   const container = document.createElement('div');
//   container.className = 'cards-grid';

//   try {
//     const products = await api.getProducts(categoryId);
//     const processor = new CardProcessor(api);
//     await processor.drawCards(products, container);
//     document.body.appendChild(container);
//   } catch (error) {
//     container.innerHTML = `
//       <div class="error-message">
//         Не удалось загрузить товары. Пожалуйста, попробуйте позже.
//       </div>
//     `;
//   }
// }

async function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');

  const strId = pathParts[pathParts.length - 1];

  console.log(pathParts);
  

  if (isInteger(strId) && strId !== "") {
    // drawProducts(Number(strId));
  } else {
    drawCategories();  
  }
}

document.addEventListener('DOMContentLoaded', initApp);

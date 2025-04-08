import '../../frontend/styles/base.css';
import '../../frontend/components/card.css';

import { CardProcessor } from '../components/CardProcessor';
import { ApiService } from '../services/ApiService';

let isRouted: boolean = false;

function isInteger(value: string): boolean {
  const num = Number(value);
  return Number.isInteger(num) && !isNaN(num);
}

async function drawProducts(categoryId: number) {
  const api = new ApiService();
  const container = document.createElement('div');
  container.className = 'cards-grid';

  try {
    const categories = await api.getProducts(categoryId);
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

function categoryController(pathParts : string[]) {
  const strId = pathParts[pathParts.length - 1];
  if (!isInteger(strId)) {
    setPath("categories"); 
    return;
  }

  const id = Number(strId);

  drawProducts(id);
}

function productsController(pathParts : string[]) {
  const strId = pathParts[pathParts.length - 1];
  if (!isInteger(strId)) {
    setPath("categories"); 
    return;
  }

  const id = Number(strId);

  drawProducts(id);
}

function setPath(path : string) {
  isRouted = true;
  window.location.pathname = path;
}

function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');

  console.log(currentPath.split('/'));

  if (pathParts[pathParts.length - 2] == "categories") {
    categoryController(pathParts);
  }  else if (pathParts[pathParts.length - 2] == "products") {
    productsController(pathParts);
  } else {
    setPath("/categories")
  }

  // if (isRouted) setPath("/categories")
}

document.addEventListener('DOMContentLoaded', initApp);
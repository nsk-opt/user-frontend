import '../../frontend/styles/base.css';
import '../../frontend/components/card.css';
import '../../frontend/components/product.css';


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
    const products = await api.getProducts(categoryId);
    const processor = new CardProcessor(api);
    await processor.drawCards(products, container);
    document.body.appendChild(container);
  } catch (error) {
    container.innerHTML = `
      <div class="error-message">
        Не удалось загрузить товары. Пожалуйста, попробуйте позже.
      </div>
    `;
  }
}

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

  drawProduct(id);
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
}

document.addEventListener('DOMContentLoaded', initApp);
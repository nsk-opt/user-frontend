import '../../../../frontend/styles/base.css';
import '../../../../frontend/components/card.css';

import { ApiService } from '../../../services/ApiService';
import { AdminProcessor } from '../../../components/AdminProcessor';
import { CardAdmin } from '../../../types/Card';
import { FormProcessor } from '../../../components/FormProcessor';

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

async function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  const api = new ApiService();
  const processor = new FormProcessor(api);
  const container = document.createElement('div');
  container.className = 'form-wrapper';


  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');

  const strId = pathParts[pathParts.length - 1];

  var category : CardAdmin;

  if (isInteger(strId) && strId !== "") {
    const id = Number(strId);
    if (id === -1) 
      category = {id: -1, name : "", imagesIds: []};
    else
      category = await api.getCategoryAdmin(id);

    document.body.innerHTML = ``;

    await processor.drawCategoryForm(container, category);
  } else {
    drawCategories();
  }

  document.body.appendChild(container);
}

document.addEventListener('DOMContentLoaded', initApp);

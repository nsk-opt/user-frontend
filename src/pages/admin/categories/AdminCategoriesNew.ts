import '../../../../frontend/styles/base.css';

import { FormProcessor } from '../../../components/FormProcessor'
import { ApiService } from '../../../services/ApiService';

async function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  const api = new ApiService();
  const container = document.createElement('div');
  container.className = 'form-wrapper';

  const processor = new FormProcessor(api);
  await processor.drawNewCategoryForm(container);

  document.body.innerHTML = ``;
  document.body.appendChild(container);
}

document.addEventListener('DOMContentLoaded', initApp);
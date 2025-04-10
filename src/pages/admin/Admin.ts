import { ApiService } from "../../services/ApiService";
import { AdminProcessor } from "../../components/AdminProcessor";

import '../../../frontend/components/card.css';
import '../../../frontend/styles/base.css';


async function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  const api = new ApiService();

  const wrapper = document.createElement('div');
  wrapper.className = "form-wrapper";

  const container = document.createElement('div');
  container.className = "form-container";

  const processor = new AdminProcessor(api);
  await processor.drawMenu(container);

  document.body.innerHTML = "";
  wrapper.appendChild(container);
  document.body.appendChild(wrapper);
}

document.addEventListener('DOMContentLoaded', initApp);
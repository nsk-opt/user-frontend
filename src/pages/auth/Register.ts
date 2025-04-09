import '../../../frontend/styles/base.css';

function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', initApp);
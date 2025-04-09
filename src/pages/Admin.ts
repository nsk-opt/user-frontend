function initApp() {
  document.body.innerHTML = `
    <div class="loader-container">
      <div class="loader"></div>
    </div>
  `;

  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');

  console.log(currentPath.split('/'));
}

document.addEventListener('DOMContentLoaded', initApp);
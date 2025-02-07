interface Category {
  name: string;
  image: {
    link: string;
  };
}

fetch('https://azenizzka.ru:8443/api/categories')
  .then((response: Response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((categories: Category[]) => {
    const container = document.getElementById('categoriesContainer');

    if (container) {
      categories.forEach((category: Category) => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.innerHTML = `
          <img src="${category.image.link}" 
               alt="${category.name}" 
               class="category-image">
          <div class="category-name">${category.name}</div>
        `;
        container.appendChild(card);
      });
    }
  })
  .catch((error: Error) => {
    console.error('Ошибка при загрузке категорий: ', error);
    const container = document.getElementById('categoriesContainer');
    if (container) {
      container.innerHTML = `<p>Не удалось загрузить категории. Ошибка: ${error.message}</p>`;
    }
  });
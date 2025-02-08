import { Category } from "./types";

export function createCategoryCard(category: Category): HTMLElement {
  const card: HTMLDivElement = document.createElement("div");

  card.className = "category-card";

  card.innerHTML = `
    <img src="${category.image.link}" 
         alt="${category.name}" 
         class="category-image">
    <div class="category-name">${category.name}</div>
  `;

  return card;
}

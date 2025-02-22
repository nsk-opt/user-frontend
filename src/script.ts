import "../frontend/styles.css"
import "../frontend/category.css"

import { Category } from "./misc/types";
import { handleError } from "./misc/errorHandler";
import { createCategoryCard } from "./misc/createCategoryCard";
import { fetchCategories } from "./fetches/categoryController";

const contentId = "content";
const content = document.getElementById(contentId) as HTMLElement;

function renderCategories(categories: Category[]): void {
  if (content == null) throw new Error("Error render categories.");

  categories.forEach((category: Category) => {
    const card: HTMLElement = createCategoryCard(category);
    card.addEventListener("click", () => renderProducts(category));
    content.appendChild(card);
  });
}

function renderProducts(category: Category): void {
  content.innerHTML = "selected: " + category.name;
}

async function main() {
  try {
    const categories: Category[] = await fetchCategories();
    renderCategories(categories);
  } catch (error) {
    handleError(error as Error, contentId);
  }
}

main();

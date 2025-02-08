import { Category } from "./misc/types.js";
import { handleError } from "./misc/errorHandler.js";
import { createCategoryCard } from "./misc/createCategoryCard.js";
import { fetchCategories } from "./fetches/categoryController.js";

function renderCategories(categories: Category[], containerId: string): void {
  const container = document.getElementById(containerId);

  if (container == null) throw new Error("Error render categories.");

  categories.forEach((category: Category) => {
    const card: HTMLElement = createCategoryCard(category);
    container.appendChild(card);
  });
}

async function main() {
  const containerId = "categoriesContainer";

  try {
    const categories: Category[] = await fetchCategories();
    renderCategories(categories, containerId);
  } catch (error) {
    handleError(error as Error, containerId);
  }
}

main();

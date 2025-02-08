import { Category } from "../misc/types";

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch("https://azenizzka.ru:8443/api/categories");
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
}

export async function createCategory(category: Category): Promise<Category> {
  console.log("create category");

  const { id, ...categoryWithoutId } = category;

  const response = await fetch("https://azenizzka.ru:8443/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(categoryWithoutId),
  });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
}

export async function updateCategory(category: Category): Promise<Category> {
  console.log("update category");

  const { id, ...categoryWithoutId } = category;

  const response = await fetch(
    "https://azenizzka.ru:8443/api/categories/" + category.id,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(categoryWithoutId),
    }
  );

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return response.json();
}

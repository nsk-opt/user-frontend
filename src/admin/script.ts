import {
  createCategory,
  fetchCategories,
  updateCategory,
} from "../fetches/categoryController.js";
import {
  createProduct,
  fetchProducts,
  updateProduct,
} from "../fetches/productController.js";
import { createCategoryCard } from "../misc/createCategoryCard.js";
import { createProductCard } from "../misc/createProductCard.js";
import { Category, Image, Product } from "../misc/types.js";

enum Type {
  CREATE,
  UPDATE,
}

const content = document.getElementById("content") as HTMLElement;

const viewCategoriesButton = document.getElementById(
  "viewCategories"
) as HTMLButtonElement;

const viewProductsButton = document.getElementById(
  "viewProducts"
) as HTMLButtonElement;

const addButton = document.getElementById("addButton") as HTMLButtonElement;

const addCategoryButton = document.getElementById(
  "addCategory"
) as HTMLButtonElement;

const addProductButton = document.getElementById(
  "addProduct"
) as HTMLButtonElement;

//

let type: Type;

async function renderCategories(): Promise<void> {
  const categories: Category[] = await fetchCategories();

  content.innerHTML = "";

  categories.forEach((category: Category) => {
    const card = createCategoryCard(category);
    card.addEventListener("click", () => renderCategoryForm(category));
    content.appendChild(card);
  });
}

async function renderProducts(): Promise<void> {
  const products: Product[] = await fetchProducts();

  content.innerHTML = "";

  products.forEach((product: Product) => {
    const card = createProductCard(product);
    card.addEventListener("click", () => renderProductForm(product));
    content.appendChild(card);
  });
}

//

function renderCategoryForm(category: Category): void {
  content.innerHTML = `
    <div class="edit-form">
      <h2>Редактирование категории: ${category.name}</h2>
      <form id="categoryForm">
        <div class="form-group">
          <label for="name">Название:</label>
          <input type="text" id="name" value="${category.name}" required>
        </div>
        <div class="form-group">
          <label for="image">Ссылка на изображение:</label>
          <input type="text" id="image" value="${category.image.link}" required>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  `;

  const form = document.getElementById("categoryForm") as HTMLFormElement;
  form.addEventListener("submit", (e: Event) =>
    handleCategoryFormSubmit(e, category)
  );
}

function renderProductForm(product: Product): void {
  content.innerHTML = `
    <div class="edit-form">
      <h2>Редактирование продукта: ${product.name}</h2>
      <form id="productForm">
        <div class="form-group">
          <label for="name">Название:</label>
          <input type="text" id="name" value="${product.name}" required>
        </div>
        <div class="form-group">
          <label for="retailPrice">Розничная цена:</label>
          <input type="number" id="retailPrice" value="${
            product.cost.retailPrice
          }" required>
        </div>
        <div class="form-group">
          <label for="wholesalePrice">Оптовая цена:</label>
          <input type="number" id="wholesalePrice" value="${
            product.cost.wholesalePrice
          }" required>
        </div>
        <div class="form-group">
          <label for="availability">Наличие:</label>
          <input type="number" id="availability" value="${
            product.availability
          }" required>
        </div>
        <div class="form-group">
          <label for="images">Ссылки на изображения (через запятую):</label>
          <input type="text" id="images" value="${product.images
            .map((img: Image) => img.link)
            .join(", ")}" required>
        </div>
        <button type="submit">Сохранить</button>
      </form>
    </div>
  `;

  const form = document.getElementById("productForm") as HTMLFormElement;

  form.addEventListener("submit", (e: Event) =>
    handleProductFormSubmit(e, product)
  );
}

async function handleCategoryFormSubmit(
  e: Event,
  category: Category
): Promise<void> {
  e.preventDefault();

  category.name = (document.getElementById("name") as HTMLInputElement).value;

  category.image.link = (
    document.getElementById("image") as HTMLInputElement
  ).value;

  if (type == Type.CREATE) {
    await createCategory(category);
  } else {
    await updateCategory(category);
  }

  renderCategories();
}

async function handleProductFormSubmit(
  e: Event,
  product: Product
): Promise<void> {
  e.preventDefault();
  product.name = (document.getElementById("name") as HTMLInputElement).value;

  product.cost.retailPrice = parseFloat(
    (document.getElementById("retailPrice") as HTMLInputElement).value
  );

  product.cost.wholesalePrice = parseFloat(
    (document.getElementById("wholesalePrice") as HTMLInputElement).value
  );

  product.availability = parseFloat(
    (document.getElementById("availability") as HTMLInputElement).value
  );

  product.images = (document.getElementById("images") as HTMLInputElement).value
    .split(",")
    .map((link: string, index: number) => ({
      id: index + 1,
      link: link.trim(),
    }));

  if (type == Type.CREATE) {
    await createProduct(product);
  } else {
    await updateProduct(product);
  }

  renderProducts();
}

viewCategoriesButton.addEventListener("click", () => {
  type = Type.UPDATE;

  renderCategories();
});

viewProductsButton.addEventListener("click", () => {
  type = Type.UPDATE;

  renderProducts();
});

addButton.addEventListener("click", () => {
  addButton.parentElement?.classList.toggle("active");
});

addCategoryButton.addEventListener("click", () => {
  const category: Category = {
    id: 0,
    name: "",
    image: {
      id: 0,
      link: "",
    },
  };

  type = Type.CREATE;

  renderCategoryForm(category);
  addButton.parentElement?.classList.remove("active");
});

addProductButton.addEventListener("click", () => {
  const product: Product = {
    id: 0,
    name: "",
    cost: {
      id: 0,
      wholesalePrice: 0,
      retailPrice: 0,
    },
    availability: 0,
    images: [],
  };

  type = Type.CREATE;

  renderProductForm(product);
  addButton.parentElement?.classList.remove("active");
});

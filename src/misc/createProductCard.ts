import { Product } from "./types.js";

export function createProductCard(product: Product): HTMLElement {
  const card: HTMLDivElement = document.createElement("div");

  card.className = "product-card";

  card.innerHTML = `
    <img src="${product.images[0].link}" 
         alt="${product.name}" 
         class="product-image">
    <div class="product-name">${product.name}</div>
    <div class="product-cost">${product.cost.retailPrice}</div>
    `;

  return card;
}

import { storeProducts } from "./script.js";

export let productPrice = document.querySelectorAll(".product-price");

export const updateProductPrice = () => {
  for (let i = 0; i < productPrice.length; i++) {
    if (productPrice[i].innerText != storeProducts[i].cost) {
      productPrice[i].innerText = storeProducts[i].cost.toLocaleString();
    }
  }
};

export const getTax = (x, y) => {
  storeProducts[y].cost = Math.ceil(storeProducts[y].baseCost * Math.pow(1.15, storeProducts[y].own));
};

export const getQuantityPerSecond = () => {
  let sum = 0;

  for (let i = 0; i < storeProducts.length; i++) {
    sum += storeProducts[i].quantityPerSecond;
  }

  return sum;
};

export const produced = () => {
  let sum = 0;

  for (let i = 0; i < storeProducts.length; i++) {
    storeProducts[i].produced += storeProducts[i].quantityPerSecond;
  }

  return sum;
};

export const productTooltip = (productIndex) => {
  let span = document.querySelectorAll("#prolist")[productIndex];

  if (!enable.includes(productIndex)) {
    enable.push(productIndex);
    document.querySelectorAll(".upgrade > div")[productIndex].setAttribute("class", "tooltip-product");
    document.querySelectorAll("#prolist")[productIndex].style.display = "block";
  }

  (() => {
    span.querySelectorAll("li > span")[0].innerText = `each ${
      storeProducts[productIndex].name
    } produces ${storeProducts[productIndex].multiplier.toFixed(1)}`;
    span.querySelectorAll("li > span")[1].innerText = `${storeProducts[productIndex].own} ${
      storeProducts[productIndex].name
    } are producing ${storeProducts[productIndex].quantityPerSecond.toFixed(1)}`;
  })();
};
let enable = new Array();

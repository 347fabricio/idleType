import { storeProducts } from "./script.js";

export let productPrice = document.querySelectorAll(".product-price");

export const updateProductPrice = () => {
  for (let i = 0; i < productPrice.length; i++) {
    if (productPrice[i].innerText != storeProducts[i].cost) {
      productPrice[i].innerText = storeProducts[i].cost.toLocaleString("en-US", {
        notation: "compact",
        compactDisplay: "long",
      });
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

export const produced = (productIndex) => {
  for (let i = 0; i < storeProducts.length; i++) {
    storeProducts[i].produced += storeProducts[i].quantityPerSecond;
  }
};

let enable = new Array();
export const productTooltip = (productIndex) => {
  let span = document.querySelectorAll("#prolist")[productIndex];

  if (!enable.includes(productIndex)) {
    enable.push(productIndex);
    document.querySelectorAll(".upgrade > div")[productIndex].setAttribute("class", "tooltip-product");
    document.querySelectorAll("#prolist")[productIndex].style.display = "block";
  }

  span.querySelectorAll("li > span")[0].innerText = `each produces ${isInTheMillions(productIndex, "multiplier")}`;

  span.querySelectorAll("li > span")[1].innerText = `${storeProducts[productIndex].own} ${checkPlurality(
    productIndex
  )} producing ${isInTheMillions(productIndex, "qntPerSec")}`;

  if (!span.querySelectorAll("li > span")[2].classList.contains("active")) {
    span.querySelectorAll("li > span")[2].innerText = `0 keyboards so far`;
    span.querySelectorAll("li > span")[2].setAttribute("class", "active");

    setInterval(() => {
      span.querySelectorAll("li > span")[2].innerText = `${isInTheMillions(productIndex, "produced")} keyboards so far`;
    }, 1000);
  }
};

const checkPlurality = (productIndex) => {
  return storeProducts[productIndex].own != 1 ? "are" : "is";
};

const isInTheMillions = (productIndex, what) => {
  const produced = storeProducts[productIndex].produced;
  const qntPerSec = storeProducts[productIndex].quantityPerSecond;
  const multiplier = storeProducts[productIndex].multiplier;

  if (what == "produced") {
    return doIt(produced);
  } else if (what == "qntPerSec") {
    return doIt(qntPerSec);
  } else {
    return doIt(multiplier);
  }
};

export const doIt = (_) => {
  if (_ >= 1000000) {
    const formattedNumber = _.toLocaleString("en-US", {
      notation: "compact",
      compactDisplay: "long",
    });
    return formattedNumber;
  } else {
    return _.toLocaleString();
  }
};

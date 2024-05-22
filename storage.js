import { storeProducts, upgradesList, xxt } from "./script.js";

export const setLocalStorage = () => {
  localStorage.setItem("my", JSON.stringify([storeProducts, upgradesList]));
  console.log("hi");
};

export const getLocalStorage = () => {
  storeProducts = JSON.parse(localStorage.getItem("my"))[0];
  upgradesList = JSON.parse(localStorage.getItem("my"))[1];
  showKeyboards.innerText = doIt(keyboards);
  moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

  updateProductPrice();
  xxt();
  console.log("hi");
};

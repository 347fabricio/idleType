import { start, word, input } from "./wordsList.js";
import { updateProductPrice, getTax, getQuantityPerSecond, produced, productTooltip } from "./jacare.js";

export let storeProducts = [
  {
    name: "keyboard",
    quantity: 10,
    quantityPerSecond: 0,
    multiplier: 0.2,
    level: 0,
    cost: 15,
    baseCost: 15,
    own: 0,
    produced: 0,
  },
  {
    name: "assistant",
    quantityPerSecond: 0,
    multiplier: 1,
    level: 0,
    cost: 100,
    baseCost: 100,
    own: 0,
    produced: 0,
  },
];

start();
updateProductPrice();

const getUserInput = () => {
  answer = input.value.trim();

  if (answer == word.innerText) {
    start();
    keyboards += storeProducts[0].quantity;
    showKeyboards.innerText = keyboards.toLocaleString();
  } else if (answer.length > word.innerText.length) {
    start();
  }
};
let answer = "";
input.addEventListener("keyup", getUserInput);

// products =========================================================
let keyboardPerSecond = false;
let showMoneyPerSecond = false;
let kUp = false;

let moneyPerSecond = document.querySelector("#money-per-second span");
let showKeyboards = document.querySelector("#money-quantity");
let keyboards = 0;

function productClickerHandler() {
  let i = this.id;

  if (keyboards >= storeProducts[0].cost) {
    keyboards -= storeProducts[0].cost;
    showKeyboards.innerText = keyboards.toLocaleString();
    storeProducts[0].own += 1;
    storeProducts[0].level += 1;
    storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;

    moneyPerSecond.innerText = `money/second: ${getQuantityPerSecond().toFixed(1)}`;
    getTax(this, i);
    updateProductPrice();
    productTooltip(i);
    boost(this, i);

    if (!showMoneyPerSecond) {
      document.querySelector("#money-per-second").style.opacity = "1";
    }
    if (!keyboardPerSecond) {
      keyboardPerSecond = setInterval(() => {
        keyboards += getQuantityPerSecond();
        showKeyboards.innerText = keyboards.toLocaleString();
        produced();
      }, 1000);
    }
  } else {
    alert("You don't have keyboards enough.");
  }
}

document.querySelector(".product").addEventListener("click", productClickerHandler);

function productClickerHandler1() {
  let i = this.id;

  if (keyboards >= storeProducts[i].cost) {
    keyboards -= storeProducts[i].cost;
    showKeyboards.innerText = keyboards.toLocaleString();
    storeProducts[i].quantityPerSecond += storeProducts[i].multiplier;
    storeProducts[i].level += 1;
    storeProducts[i].own += 1;

    if (kUp) {
      kUp();
    }

    moneyPerSecond.innerText = `money/second: ${getQuantityPerSecond().toFixed(1)}`;
    getTax(this, i);
    updateProductPrice();
    productTooltip(i);
    boost(this, i);

    if (!showMoneyPerSecond) {
      document.querySelector("#money-per-second").style.opacity = "1";
    }

    if (!keyboardPerSecond) {
      keyboardPerSecond = setInterval(() => {
        keyboards += getQuantityPerSecond();
        showKeyboards.innerText = keyboards.toLocaleString();
        produced();
      }, 1000);
    }
  } else {
    alert("You don't have keyboards enough.");
  }
}

document.querySelectorAll(".product")[1].addEventListener("click", productClickerHandler1);

// upgrades ===========================================================

function boost(_, index) {
  let productIndex = +index;
  let productLevel = storeProducts[productIndex].level;
  let productName = storeProducts[productIndex].name;

  switch (productIndex) {
    case 0:
      switch (productLevel) {
        case 1:
          createUpgrade(productName, productIndex);
          createUpgrade(productName, productIndex);
          break;
        case 10:
          createUpgrade(productName, productIndex);
          break;
        case 25:
          createUpgrade(productName, productIndex);
          break;
        case 50:
          createUpgrade(productName, productIndex);
          break;
        case 100:
          createUpgrade(productName, productIndex);
          break;
      }
      break;
    case 1:
      switch (productLevel) {
        case 1:
          createUpgrade(productName, productIndex);
          break;
        case 5:
          createUpgrade(productName, productIndex);
          break;
        case 25:
          createUpgrade(productName, productIndex);
          break;
        case 50:
          createUpgrade(productName, productIndex);
          break;
        case 100:
          createUpgrade(productName, productIndex);
          break;
      }
  }
}

function createUpgrade(productName, productIndex) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  if (productName == "keyboard") {
    img.src = "assets/keyboard.png";
    div.id = acc[0].id;
    div.dataset.id = acc[0].dataid;
  } else if (productName == "assistant") {
    img.src = "assets/assistant.png";
    div.id = acc[1].id;
    div.dataset.id = acc[1].dataid;
  }

  span.classList.add("tooltip-upgrade");
  span.innerText = ``;
  div.appendChild(span);

  div.classList.add("boxUpgrade", productName);
  div.appendChild(img);
  document.querySelector(".upgrades").appendChild(div);

  switch (productName) {
    case "keyboard":
      switch (true) {
        case acc[0].id < 3:
          doubleXp(productName, productIndex, acc[0].id++, acc[0].dataid++);
          break;
        case acc[0].id == 3:
          nonCursor(productName, productIndex, acc[0].id++, acc[0].dataid++);
          break;
        case acc[0].id > 3:
          nonCursosMultiplier(productName, productIndex, acc[0].id++, acc[0].dataid++);
          break;
      }
      break;

    case "assistant":
      doubleXp(productName, productIndex, acc[1].id++, acc[1].dataid++);
      break;
  }
}

let acc = [
  {
    id: 0,
    dataid: 0,
  },
  {
    id: 0,
    dataid: 16,
  },
];

let upgradesList = [
  {
    name: "keyboard",
    chorume: [2, 2, 2],
    currentMultiplier: 0.1,
    multiplier: [5, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    upgradeCost: [80, 400, 8000, 80000, 8000000, 800000000],
  },
  {
    name: "Assistant",
    chorume: [2, 2, 2, 2, 2],
    upgradeCost: [800, 4000, 40000, 4000000, 400000000],
  },
  {
    name: "",
    chorume: [],
    upgradeCost: [],
  },
  {
    name: "",
    chorume: [],
    upgradeCost: [],
  },
  {
    name: "",
    chorume: [],
    upgradeCost: [],
  },
  {
    name: "Writing",
    chorume: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    upgradeCost: [40000, 4000000, 400000000, 40000000000, 4000000000000],
  },
];

const priceTooltip = (_, productIndex, exclusiveIndex, dataid) => {
  document.querySelector(`[data-id="${+dataid}"] > .tooltip-upgrade`).innerText =
    upgradesList[productIndex].upgradeCost[exclusiveIndex];
};

const doubleXp = (_, productIndex, exclusiveIndex, dataid) => {
  priceTooltip(_, productIndex, exclusiveIndex, dataid);

  const foo = () => {
    if (keyboards >= upgradesList[productIndex].upgradeCost[exclusiveIndex]) {
      keyboards -= upgradesList[productIndex].upgradeCost[exclusiveIndex];
      upgradesList[productIndex].upgradeCost.splice(exclusiveIndex, 1, "");
      showKeyboards.innerText = keyboards.toLocaleString();
      storeProducts[productIndex].quantity *= upgradesList[productIndex].chorume[exclusiveIndex];
      storeProducts[productIndex].quantityPerSecond *= upgradesList[productIndex].chorume[exclusiveIndex];
      storeProducts[productIndex].multiplier *= upgradesList[productIndex].chorume[exclusiveIndex];
      upgradesList[productIndex].chorume.splice(exclusiveIndex, 1, "");
      moneyPerSecond.innerText = `money/second: ${getQuantityPerSecond().toFixed(1)}`;
      document.querySelector(`[data-id="${dataid}"]`).remove();

      productTooltip(productIndex);
    } else {
      alert("You don't have keyboards enough.");
    }
  };

  document.querySelector(`[data-id="${dataid}"]`).addEventListener("click", foo);
};

const nonCursor = (_, productIndex, exclusiveIndex, dataid) => {
  priceTooltip(_, productIndex, exclusiveIndex, dataid);

  const foo = () => {
    if (keyboards >= upgradesList[productIndex].upgradeCost[exclusiveIndex]) {
      keyboards -= upgradesList[productIndex].upgradeCost[exclusiveIndex];
      upgradesList[productIndex].upgradeCost.splice(exclusiveIndex, 1, "");
      showKeyboards.innerText = keyboards.toLocaleString();
      document.querySelector(`[data-id="${dataid}"]`).remove();

      enableK(productIndex);
      kUp();
    } else {
      alert("You don't have keyboards enough.");
    }
  };

  document.querySelector(`[data-id="${dataid}"]`).addEventListener("click", foo);
};

const enableK = (productIndex) => {
  kUp = () => {
    totalOwn = getTotalOwn() - previousOwn;

    storeProducts[0].multiplier += totalOwn * upgradesList[0].currentMultiplier;
    storeProducts[0].quantity += totalOwn * upgradesList[0].currentMultiplier;
    storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;
    moneyPerSecond.innerText = `money/second: ${getQuantityPerSecond().toFixed(1)}`;

    tempMultipler();
    previousOwn = getTotalOwn();
    productTooltip(productIndex);
  };
};
let totalOwn = 0;
let previousOwn = 0;
let tempMultiplier = 0;

const nonCursosMultiplier = (_, productIndex, exclusiveIndex, dataid) => {
  priceTooltip(_, productIndex, exclusiveIndex, dataid);

  const foo = () => {
    if (!document.querySelector(`[data-id="${3}"]`)) {
      if (keyboards >= upgradesList[productIndex].upgradeCost[exclusiveIndex]) {
        keyboards -= upgradesList[productIndex].upgradeCost[exclusiveIndex];
        upgradesList[productIndex].upgradeCost.splice(exclusiveIndex, 1, "");
        showKeyboards.innerText = keyboards.toLocaleString();

        upgradesList[0].currentMultiplier *= upgradesList[0].multiplier[0];
        upgradesList[0].multiplier = upgradesList[0].multiplier.slice(1);
        storeProducts[0].multiplier += getTotalOwn() * upgradesList[0].currentMultiplier;

        if (tempMultiplier) {
          storeProducts[0].multiplier -= tempMultiplier;
          tempMultipler = () => {
            tempMultiplier = "";
          };
        }

        kUp();

        storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;
        moneyPerSecond.innerText = `money/second: ${getQuantityPerSecond().toFixed(1)}`;

        document.querySelector(`[data-id="${dataid}"]`).remove();
      } else {
        alert("You don't have keyboards enough.");
      }
    } else {
      alert("You still can't do it");
    }
  };

  document.querySelector(`[data-id="${dataid}"]`).addEventListener("click", foo);
};

// ======================
const getTotalOwn = () => {
  return storeProducts.reduce((x, y, z) => (z > 0 ? x + y.own : 0), 0);
};

function tempMultipler() {
  tempMultiplier += totalOwn * upgradesList[0].currentMultiplier;
}

const isAutoOn = () => {
  start();
  keyboards += storeProducts[0].quantity * 0.2;
  showKeyboards.innerText = keyboards.toLocaleString();
};

function toggleAutoKeyboard() {
  active = !active;

  if (active && !isRunning) {
    isRunning = true;
    autoK();
    autoKeyboard.children[0].style.opacity = "1";
    autoKeyboard.classList.add("on");
    autoKeyboard.children[0].src = "assets/auto-keyboardOn.png";
  } else {
    isRunning = false;
    autoKeyboard.children[0].style.opacity = "";
    autoKeyboard.children[0].src = "assets/auto-keyboard.png";
    autoKeyboard.classList.remove("on");
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const typing = (i) => {
  return sleep(delay).then(() => (input.value += word.innerText[i]));
};

const autoK = async () => {
  while (isRunning) {
    for (let i = 0; i < word.innerText.length; i++) {
      if (isRunning) {
        await typing(i);
      } else {
        input.value = "";
      }
    }
    isAutoOn();
  }
};

let autoKeyboard = document.querySelector(".auto-keyboard");
let isRunning = false;
let active = false;
let delay = 10;

autoKeyboard.addEventListener("click", toggleAutoKeyboard);

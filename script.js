import { wordList } from "./wordsList.js";

let storeProducts = [
  {
    name: "keyboard",
    quantity: 10,
    quantityPerSecond: 0,
    multiplier: 0.2,
    level: 0,
    cost: 15,
    baseCost: 15,
    own: 0,
  },
  {
    name: "assistant",
    quantityPerSecond: 0,
    multiplier: 1,
    level: 0,
    cost: 100,
    baseCost: 100,
    own: 0,
  },
];
let tempArr = new Array();

let word = document.querySelector("#word-here");
let input = document.querySelector("#type-here");
let showKeyboards = document.querySelector("#money-quantity");
let moneyPerSecond = document.querySelector("#money-per-second span");
let price = document.querySelectorAll(".product-price");
let keyboards = 10000000000; // (&*¨#$%@#$%@%@#%¨#$¨&%$*$¨&
let answer = "";

// onload page ======================================================
function start() {
  input.value = "";
  word.innerHTML = wordList[Math.floor(Math.random() * wordList.length)];
}
start();

const check = () => {
  if (answer == word.innerText || input.value == word.innerText) {
    start();
    /*     autoK(); */
    keyboards += storeProducts[0].quantity;
    showKeyboards.innerText = keyboards.toFixed(1);
  } else if (answer.length > word.innerText.length) {
    start();
  }
};

// !!!!!!!
/* const autoK = () => {
  for (let i = 0; i < word.innerText.length; i++) {
    setTimeout(() => {
      input.value += word.innerText[i];
      check();
    }, i * 1000);
  }
};
autoK(); */

let enable = new Array();
function productTooltip(z, i) {
  let span = document.querySelectorAll("#prolist")[i];

  if (!enable.includes(i)) {
    enable.push(i);
    document.querySelectorAll(".upgrade > div")[i].setAttribute("class", "tooltip-product");
    document.querySelectorAll("#prolist")[i].style.display = "block";
  }

  (() => {
    span.querySelectorAll("li > span")[0].innerText = `each ${storeProducts[i].name} produces ${storeProducts[
      i
    ].multiplier.toFixed(1)}`;
    span.querySelectorAll("li > span")[1].innerText = `${storeProducts[i].own} ${
      storeProducts[i].name
    } are producing ${storeProducts[i].quantityPerSecond.toFixed(1)}`;
  })();
}

input.addEventListener("keyup", () => {
  answer = input.value.trim();

  check();
});

// fees etc =========================================================
const getTax = (x, y) => {
  storeProducts[y].cost = Math.ceil(storeProducts[y].baseCost * Math.pow(1.15, storeProducts[y].own));
};

const updatePrice = (x, y) => {
  for (let i = 0; i < price.length; i++) {
    if (price[i].innerText != storeProducts[i].cost) {
      price[i].innerText = storeProducts[i].cost;
    }
  }
};
updatePrice();

const getQuantity = () => {
  let sum = 0;

  for (let i = 0; i < storeProducts.length; i++) {
    sum += storeProducts[i].quantityPerSecond;
  }

  return sum;
};

// products =========================================================
let keyboardOn;
let showMoneyPerSecond;
let kUp;

// product 1
document.querySelector(".product").addEventListener("click", function () {
  let i = this.id;

  if (keyboards >= storeProducts[0].cost) {
    keyboards -= storeProducts[0].cost;
    showKeyboards.innerText = keyboards.toFixed(1);
    storeProducts[0].quantityPerSecond += storeProducts[0].multiplier;
    storeProducts[0].level += 1;
    storeProducts[0].own += 1;

    moneyPerSecond.innerText = `money/second: ${getQuantity().toFixed(1)}`;
    getTax(this, i);
    updatePrice();
    productTooltip(this, i);
    boost(this, i);

    if (!showMoneyPerSecond) {
      document.querySelector("#money-per-second").style.opacity = "1";
    }
    if (!keyboardOn) {
      keyboardOn = setInterval(() => {
        keyboards += getQuantity();
        showKeyboards.innerText = keyboards.toFixed(1);
      }, 1000);
    }
  } else {
    alert("You don't have keyboards enough.");
  }
});

// product 2+
document.querySelectorAll(".product")[1].addEventListener("click", function () {
  let i = this.id;

  if (keyboards >= storeProducts[i].cost) {
    keyboards -= storeProducts[i].cost;
    showKeyboards.innerText = keyboards.toFixed(1);
    storeProducts[i].quantityPerSecond += storeProducts[i].multiplier;
    storeProducts[i].level += 1;
    storeProducts[i].own += 1;
    tempArr.push(1);

    if (kUp) {
      kUp();
    }

    moneyPerSecond.innerText = `money/second: ${getQuantity().toFixed(1)}`;
    getTax(this, i);
    updatePrice();
    productTooltip(this, i);
    boost(this, i);

    if (!showMoneyPerSecond) {
      document.querySelector("#money-per-second").style.opacity = "1";
    }

    if (!keyboardOn) {
      keyboardOn = setInterval(() => {
        keyboards += getQuantity();
        showKeyboards.innerText = keyboards.toFixed(1);
      }, 1000);
    }
  } else {
    alert("You don't have keyboards enough.");
  }
});

// upgrad ===========================================================
let globalUpgrades = new Array();
let upgradesList = [
  {
    name: "keyboard",
    chorume: [2, 2, 2],
    currentMultiplier: 0.1,
    multiplier: [5, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    upgradeCost: [80, 400, 8000, 80000, 8000000, 800000000],
    upgradeIndex: new Array(),
    levels: [1, 10, 25, 50, 100],
  },
  {
    name: "Assistant",
    chorume: [2, 2, 2, 2, 2],
    upgradeCost: [800, 4000, 40000, 4000000, 400000000],
    upgradeIndex: new Array(),
    levels: [1, 5, 25, 50, 100],
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
function createUpgrade(y, b) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  if (y == "keyboard") {
    img.src = "assets/keyboard.png";
    div.id = acc[0].id;
    div.dataset.id = acc[0].dataid;
  } else if (y == "assistant") {
    img.src = "assets/assistant.png";
    div.id = acc[1].id;
    div.dataset.id = acc[1].dataid;
  }

  (function () {
    span.textContent = ``;
    span.classList.add("tooltip-upgrade");
    div.appendChild(span);
  })();

  (function () {
    div.classList.add("boxUpgrade", y);
    div.appendChild(img);
    upgradesList[b].upgradeIndex.push(div);
    document.querySelector(".upgrades").appendChild(div);
  })();

  if (y == "keyboard") {
    if (acc[0].id == 3) {
      nonCursor(y, b, acc[0].id++, acc[0].dataid++);
    } else if (acc[0].id > 3) {
      nonCursosMultiplier(y, b, acc[0].id++, acc[0].dataid++);
    } else {
      doubleXp(y, b, acc[0].id++, acc[0].dataid++);
    }
  } else if (y == "assistant") {
    doubleXp(y, b, acc[1].id++, acc[1].dataid++);
  }
}

function boost(a, b) {
  b = parseInt(b);
  let x = storeProducts[b].level;
  let y = storeProducts[b].name;

  switch (b) {
    case 0: // keyboards
      switch (x) {
        case 1:
          createUpgrade(y, b);
          createUpgrade(y, b);
          break;
        case 10:
          createUpgrade(y, b);
          break;
        case 25:
          createUpgrade(y, b);
          break;
        case 50:
          createUpgrade(y, b);
          break;
        case 100:
          createUpgrade(y, b);
          break;
      }
      break;
    case 1: // assistants
      switch (x) {
        case 1:
          createUpgrade(y, b);
          break;
        case 5:
          createUpgrade(y, b);
          break;
        case 25:
          createUpgrade(y, b);
          break;
        case 50:
          createUpgrade(y, b);
          break;
        case 100:
          createUpgrade(y, b);
          break;
      }
  }
}

const priceTooltip = (y, b) => {
  document.querySelectorAll(`.upgrades > .${y}`).forEach((x, z) => {
    document.querySelectorAll(`.${y} > .tooltip-upgrade`)[z].innerText = upgradesList[b].upgradeCost[z];
  });
};

const doubleXp = (y, b, z, w) => {
  priceTooltip(y, b);
  let i = z;
  let dataset = parseInt(w);

  const foo0 = () => {
    if (keyboards >= upgradesList[b].upgradeCost[i]) {
      keyboards -= upgradesList[b].upgradeCost[i];
      upgradesList[b].upgradeCost.splice(i, 1, "");
      showKeyboards.innerText = keyboards.toFixed(1);

      storeProducts[b].quantity *= upgradesList[b].chorume[i];
      storeProducts[b].multiplier *= upgradesList[b].chorume[i];
      storeProducts[b].quantityPerSecond *= upgradesList[b].chorume[i];
      upgradesList[b].chorume.splice(i, 1, "");
      moneyPerSecond.innerText = `money/second: ${getQuantity().toFixed(1)}`;
      document.querySelector(`[data-id="${dataset}"]`).remove();
      console.log(storeProducts[0].multiplier);
      console.log(storeProducts[0].quantityPerSecond.toFixed(1));
      console.log(storeProducts[0].quantity);
      productTooltip(y, b);
    } else {
      console.log(i);
      alert("You don't have keyboards enough.");
    }
  };

  (() => {
    document.querySelector(`[data-id="${dataset}"]`).addEventListener("click", () => {
      foo0();
    });
  })();
};

const nonCursor = (y, b, z, w) => {
  let i = z;
  let dataset = parseInt(w);

  priceTooltip(y, b);

  const foo = () => {
    if (keyboards >= upgradesList[b].upgradeCost[i]) {
      keyboards -= upgradesList[b].upgradeCost[i];
      upgradesList[b].upgradeCost.splice(i, 1, "");
      showKeyboards.innerText = keyboards.toFixed(1);
      document.querySelector(`[data-id="${dataset}"]`).remove();

      enableK(y, b);
      kUp();
    } else {
      alert("You don't have keyboards enough.");
    }
  };

  (() => {
    document.querySelector(`[data-id="${dataset}"]`).addEventListener("click", () => {
      foo();
    });
  })();
};

const enableK = (y, b) => {
  kUp = () => {
    let a = tempArr.reduce((x, y) => x + y, 0);
    tempArr = [];

    storeProducts[0].multiplier += a * upgradesList[0].currentMultiplier;
    storeProducts[0].quantityPerSecond += a * upgradesList[0].currentMultiplier;
    moneyPerSecond.innerText = `money/second: ${getQuantity().toFixed(1)}`;

    productTooltip(y, b);
  };
};

const nonCursosMultiplier = (y, b, z, w) => {
  let i = z;
  let dataset = parseInt(w);

  priceTooltip(y, b);

  const foo = () => {
    if (keyboards >= upgradesList[b].upgradeCost[i]) {
      if (!document.querySelector(`[data-id="${3}"]`)) {
        keyboards -= upgradesList[b].upgradeCost[i];
        upgradesList[b].upgradeCost.splice(i, 1, "");
        showKeyboards.innerText = keyboards.toFixed(1);

        upgradesList[0].currentMultiplier *= upgradesList[0].multiplier[0];

        console.log(upgradesList[0].currentMultiplier);
        storeProducts[0].multiplier *= upgradesList[0].currentMultiplier;
        storeProducts[0].quantityPerSecond *= upgradesList[0].currentMultiplier;

        upgradesList[0].multiplier = upgradesList[0].multiplier.slice(1);

        document.querySelector(`[data-id="${dataset}"]`).remove();
        console.log("by 5: ", upgradesList[0].multiplier);

        kUp();
        productTooltip(y, b);
      } else {
        alert("You still can't do it");
      }
    } else {
      alert("You don't have keyboards enough.");
    }
  };

  (() => {
    document.querySelector(`[data-id="${dataset}"]`).addEventListener("click", () => {
      foo();
    });
  })();
};

// !FIX ALL MULTIPLIERS
// !fix nonCursorMultiplier
// multiply it by 5 even multiply by 0.1

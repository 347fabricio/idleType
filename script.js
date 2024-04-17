import { wordList } from "./wordsList.js";

let storeProducts = [
  {
    name: "keyboard",
    quantity: 1000, // 3
    quantityPerSecond: 0,
    level: 0,
    cost: 15,
    baseCost: 15,
    own: 0, //======================================
  },
  {
    name: "assistant",
    quantityPerSecond: 0,
    level: 0,
    cost: 115,
    baseCost: 115,
    own: 0, //======================================
  },
];

let word = document.querySelector("#word-here");
let input = document.querySelector("#type-here");

// store =============================================================
let showKeyboards = document.querySelector("#money-quantity");
let moneyPerSecond = document.querySelector("#money-per-second span");

let price = document.querySelectorAll(".product-price");

let keyboards = 0;
let answer;
// ==============================================
function start() {
  input.value = "";
  word.innerHTML = wordList[Math.floor(Math.random() * wordList.length)];
}
start();

input.addEventListener("keyup", () => {
  answer = input.value.trim();

  if (answer == word.innerText) {
    start();
    keyboards += storeProducts[0].quantity;
    showKeyboards.innerText = keyboards.toFixed(1);
  } else if (answer.length > word.innerText.length) {
    start();
  }
});

// ==============================================
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

// ==============================================
let keyboardOn;
let showMoneyPerSecond;

document.querySelector(".product").addEventListener("click", function () {
  let i = this.id;
  if (keyboards >= storeProducts[0].cost) {
    keyboards -= storeProducts[0].cost;
    showKeyboards.innerText = keyboards.toFixed(1);
    storeProducts[0].quantityPerSecond += 0.1;
    storeProducts[0].level += 1;
    storeProducts[0].own += 1;

    moneyPerSecond.innerText = `money/second: ${getQuantity().toFixed(1)}`;
    getTax(this, i);
    updatePrice();
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

document.querySelectorAll(".product")[1].addEventListener("click", function () {
  let i = this.id;
  if (keyboards >= storeProducts[i].cost) {
    keyboards -= storeProducts[i].cost;
    showKeyboards.innerText = keyboards.toFixed(1);
    storeProducts[i].quantityPerSecond += 1;
    storeProducts[i].level += 1;
    storeProducts[i].own += 1;

    moneyPerSecond.innerText = `money/second: ${getQuantity().toFixed(1)}`;
    getTax(this, i);
    updatePrice();
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

// ==============================================
let upgradesList = [
  {
    name: "keyboard",
    upgradeCost: [80, 400, 8000, 80000],
    upgradeIndex: new Array(),
  },
  {
    name: "Assistant",
    upgradeCost: [8000, 4000, 40000, 4000000],
    upgradeIndex: new Array(),
  },
];

// x.addEventListener("click", function () {
//   if (keyboards >= upgradesList[0].cost[0]) {
//     keyboards -= upgradesList[0].cost[0];
//     storeProducts[0].quantity += 1;
//     upgradesList[0].upgradeIndex[0].style.display = "none";
//     showKeyboards.innerText = keyboards.toFixed(1);
//     console.log(upgradesList[0].cost);
//     upgradesList[0].cost = upgradesList[0].cost.slice(1);
//     console.log(upgradesList[0].cost);
//   } else {
//     console.log(y);
//     alert(`upgrade cost ${upgradesList[0].cost[0]} keyboards.`);
//   }
// });

let acc = 0;
const createUpgrade = (y, b) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  img.src = "assets/keyboard.png";
  div.id = acc++;
  div.classList.add("boxUpgrade", y);
  div.appendChild(img);
  div.title = "Custa x";
  upgradesList[b].upgradeIndex.push(div);
  document.querySelector(".upgrades").appendChild(div);
};

function boost(a, b) {
  b = parseInt(b);
  let x = storeProducts[b].level;
  let y = storeProducts[b].name;

  switch (b) {
    case 0:
      switch (x) {
        case 1:
          console.log(`${y} is level ${x}`);
          createUpgrade(y, b);
          createUpgrade(y, b);

          break;
      }
      break;
    case 1:
      switch (x) {
        case 1:
          console.log(`${y} is level ${x}`);
          createUpgrade(y, b);
          break;
      }
  }
  console.log(upgradesList[b].upgradeIndex);
}

// const buyUpgrade = (x, y) => {
//   if (keyboards >= upgradesList[0].cost[y]) {
//     keyboards -= upgradesList[0].cost[y];
//     storeProducts[0].quantity += 1;
//     upgradesList[0].upgradeIndex[y].style.display = "none";
//     showKeyboards.innerText = keyboards.toFixed(1);
//     console.log(`upgrade ${Number(y) + 1} has done!`, typeof y);
//   } else {
//     alert(`upgrade ${Number(y) + 1} cost ${upgradesList[0].cost[y]} keyboards.`);
//   }
// };
// window.buyUpgrade = buyUpgrade;

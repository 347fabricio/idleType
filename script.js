import { start, word, input } from "./wordsList.js";
import { updateProductPrice, getTax, getQuantityPerSecond, produced, productTooltip, doIt } from "./jacare.js";
import { options } from "./options.js";

options();

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
  {
    name: "coffeeMachines",
    quantity: 0,
    quantityPerSecond: 0,
    multiplier: 8,
    level: 0,
    cost: 1100,
    baseCost: 1100,
    own: 0,
    produced: 0,
  },
  {
    name: "ergonomicChairs",
    quantity: 0,
    quantityPerSecond: 0,
    multiplier: 47,
    level: 0,
    cost: 12000,
    baseCost: 12000,
    own: 0,
    produced: 0,
  },
  {
    name: "textEditor",
    quantity: 0,
    quantityPerSecond: 0,
    multiplier: 260,
    level: 0,
    cost: 130000,
    baseCost: 130000,
    own: 0,
    produced: 0,
  },
  {
    name: "speechToText",
    quantity: 0,
    quantityPerSecond: 0,
    multiplier: 1400,
    level: 0,
    cost: 1400000,
    baseCost: 1400000,
    own: 0,
    produced: 0,
  },
];

start();
updateProductPrice();
const message = document.querySelector(".keyboardEarned");

const goUp = (x) => {
  !x ? (x = storeProducts[0].quantity) : x;

  message.innerText = `+ ${doIt(x)}`;
  message.classList.add("show");
  message.style.animation = "none";
  void message.offsetWidth;
  message.style.animation = "moveUp 0.2s forwards";

  setTimeout(() => {
    message.classList.remove("show");
  }, 200);
};

let answer = "";

const getUserInput = () => {
  answer = input.value.trim();

  if (answer == word.innerText) {
    if (!isWritingChallengeActive) {
      generateRandomNumbers();
    }
    goUp();
    start();
    keyboards += storeProducts[0].quantity;
    showKeyboards.innerText = doIt(keyboards);
  } else if (answer.length > word.innerText.length) {
    start();
  }
};

input.addEventListener("keyup", getUserInput);

// products =========================================================
let keyboardPerSecond = false;
let showMoneyPerSecond = false;
let kUp = false;
let flag = false;

let moneyPerSecond = document.querySelector("#money-per-second span");
let showKeyboards = document.querySelector("#money-quantity");
export let keyboards = 10000000000;

document.querySelectorAll(".product").forEach((product, index) => {
  product.addEventListener("click", () =>
    index > 0 ? productClickerHandlerAll(index) : productClickerHandlerFirst(index)
  );
});

const xxt = () => {
  flag = true;
  showMoneyPerSecond = true;
  keyboardPerSecond = true;
  document.querySelector("#money-per-second").style.opacity = "1";
  setInterval(() => {
    keyboards += getQuantityPerSecond();
    showKeyboards.innerText = doIt(keyboards);
    produced();
  }, 1000);
};

const productClickerHandlerFirst = (index) => {
  if (keyboards >= storeProducts[0].cost) {
    keyboards -= storeProducts[0].cost;
    showKeyboards.innerText = doIt(keyboards);
    storeProducts[0].own += 1;
    storeProducts[0].level += 1;
    storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;

    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
    getTax(this, index);
    updateProductPrice();
    productTooltip(index);
    boost(this, index);

    console.log("first");
    if (!flag) {
      xxt();
    }
  } else {
    alert("You don't have keyboards enough.");
  }
};

const productClickerHandlerAll = (index) => {
  if (keyboards >= storeProducts[index].cost) {
    keyboards -= storeProducts[index].cost;
    showKeyboards.innerText = doIt(keyboards);
    storeProducts[index].quantityPerSecond += storeProducts[index].multiplier;
    storeProducts[index].level += 1;
    storeProducts[index].own += 1;

    if (kUp) {
      kUp();
    }

    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
    getTax(this, index);
    updateProductPrice();
    productTooltip(index);
    boost(this, index);

    console.log("all");
    if (!flag) {
      xxt();
    }
  } else {
    alert("You don't have keyboards enough.");
  }
};

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
      break;
    case 2:
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
      }
      break;
    case 3:
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
      }
      break;
    case 4:
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
      }
      break;
    case 5:
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
      }
      break;
  }
}

const createUpgrade = (productName, productIndex) => {
  const div = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  switch (productName) {
    case "keyboard":
      img.src = "assets/keyboard.png";
      div.id = acc[0].id;
      div.dataset.id = acc[0].dataid;
      break;
    case "assistant":
      img.src = "assets/assistant.png";
      div.id = acc[1].id;
      div.dataset.id = acc[1].dataid;
      break;
    case "coffeeMachines":
      img.src = "";
      div.id = acc[2].id;
      div.dataset.id = acc[2].dataid;
      break;
    case "ergonomicChairs":
      img.src = "";
      div.id = acc[3].id;
      div.dataset.id = acc[3].dataid;
      break;
    case "textEditor":
      img.src = "";
      div.id = acc[4].id;
      div.dataset.id = acc[4].dataid;
      break;
    case "speechToText":
      img.src = "";
      div.id = acc[5].id;
      div.dataset.id = acc[5].dataid;
      break;
  }

  span.classList.add("tooltip-upgrade");
  span.innerText = ``;
  div.appendChild(span);

  div.classList.add("boxUpgrade", productName);
  div.appendChild(img);
  document.querySelector(".upgrades").appendChild(div);

  checkAcc(productName, productIndex);
};

const checkAcc = (productName, productIndex) => {
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

    case "coffeeMachines":
      doubleXp(productName, productIndex, acc[2].id++, acc[2].dataid++);
      break;

    case "ergonomicChairs":
      doubleXp(productName, productIndex, acc[3].id++, acc[3].dataid++);
      break;

    case "textEditor":
      doubleXp(productName, productIndex, acc[4].id++, acc[4].dataid++);
      break;

    case "speechToText":
      console.log();
      doubleXp(productName, productIndex, acc[5].id++, acc[5].dataid++);
      break;
  }
};

let acc = [
  {
    id: 0,
    dataid: 0,
  },
  {
    id: 0,
    dataid: 16,
  },
  {
    id: 0,
    dataid: 22,
  },
  {
    id: 0,
    dataid: 28,
  },
  {
    id: 0,
    dataid: 34,
  },
  {
    id: 0,
    dataid: 40,
  },
];

let upgradesList = [
  {
    name: "keyboard",
    chorume: [2, 2, 2],
    currentMultiplier: 0.1,
    multiplier: [5, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    upgradeCost: [80, 400, 8000, 80000, 8000000, 800000000], // million
  },
  {
    name: "assistant",
    chorume: [2, 2, 2, 2, 2],
    upgradeCost: [800, 4000, 40000, 4000000, 400000000],
  },
  {
    name: "coffeeMachines",
    chorume: [2, 2, 2, 2],
    upgradeCost: [8800, 44000, 444000, 44000000],
  },
  {
    name: "ergonomicChairs",
    chorume: [2, 2, 2, 2],
    upgradeCost: [120000, 600000, 6000000, 600000000],
  },
  {
    name: "textEditor",
    chorume: [2, 2, 2],
    upgradeCost: [1040000, 5200000, 52000000],
  },
  {
    name: "speechToText",
    chorume: [2, 2, 2],
    upgradeCost: [11200000, 56000000, 560000000],
  },
  {
    name: "writing",
    chorume: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    upgradeCost: [40000, 4000000, 400000000, 40000000000, 4000000000000],
  },
];

const priceTooltip = (_, productIndex, exclusiveIndex, dataid) => {
  let upgradeCost = upgradesList[productIndex].upgradeCost[exclusiveIndex];
  document.querySelector(`[data-id="${+dataid}"] > .tooltip-upgrade`).innerText = doIt(upgradeCost);
};

const doubleXp = (_, productIndex, exclusiveIndex, dataid) => {
  priceTooltip(_, productIndex, exclusiveIndex, dataid);

  const foo = () => {
    if (keyboards >= upgradesList[productIndex].upgradeCost[exclusiveIndex]) {
      keyboards -= upgradesList[productIndex].upgradeCost[exclusiveIndex];
      showKeyboards.innerText = doIt(keyboards);
      storeProducts[productIndex].quantity *= upgradesList[productIndex].chorume[exclusiveIndex];
      storeProducts[productIndex].quantityPerSecond *= upgradesList[productIndex].chorume[exclusiveIndex];
      storeProducts[productIndex].multiplier *= upgradesList[productIndex].chorume[exclusiveIndex];
      upgradesList[productIndex].upgradeCost.splice(exclusiveIndex, 1, false);
      upgradesList[productIndex].chorume.splice(exclusiveIndex, 1, false);
      moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
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
      upgradesList[productIndex].upgradeCost.splice(exclusiveIndex, 1, false);
      showKeyboards.innerText = doIt(keyboards);
      document.querySelector(`[data-id="${dataid}"]`).remove();

      enableK();
      kUp();
    } else {
      alert("You don't have keyboards enough.");
    }
  };

  document.querySelector(`[data-id="${dataid}"]`).addEventListener("click", foo);
};

const enableK = () => {
  kUp = () => {
    totalOwn = getTotalOwn() - previousOwn;

    storeProducts[0].multiplier += totalOwn * upgradesList[0].currentMultiplier;
    storeProducts[0].quantity += totalOwn * upgradesList[0].currentMultiplier;
    storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;
    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

    tempMultipler();
    previousOwn = getTotalOwn();
  };
};
let totalOwn = 0;
let previousOwn = 0;
let tempMultiplier = 0;
let multIndex = 0;

const nonCursosMultiplier = (_, productIndex, exclusiveIndex, dataid) => {
  priceTooltip(_, productIndex, exclusiveIndex, dataid);

  const foo = () => {
    if (!document.querySelector(`[data-id="${3}"]`)) {
      if (keyboards >= upgradesList[0].upgradeCost[exclusiveIndex]) {
        keyboards -= upgradesList[0].upgradeCost[exclusiveIndex];
        upgradesList[0].upgradeCost.splice(exclusiveIndex, 1, false);
        showKeyboards.innerText = doIt(keyboards);

        upgradesList[0].currentMultiplier *= upgradesList[0].multiplier[multIndex];
        upgradesList[0].multiplier.splice(multIndex++, 1, false);
        storeProducts[0].multiplier += getTotalOwn() * upgradesList[0].currentMultiplier;

        if (tempMultiplier) {
          storeProducts[0].multiplier -= tempMultiplier;
          tempMultipler = () => {
            tempMultiplier = "";
          };
        }

        kUp();

        storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;
        moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

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

const getTotalOwn = () => {
  return storeProducts.reduce((x, y, z) => (z > 0 ? x + y.own : 0), 0);
};

function tempMultipler() {
  tempMultiplier += totalOwn * upgradesList[0].currentMultiplier;
}

// autokeyboard =============================================
const isAutoOn = () => {
  start();

  message.textContent = `+ ${storeProducts[0].quantity * 0.2}`;
  message.classList.add("show");
  message.style.animation = "none";
  void message.offsetWidth;
  message.style.animation = "moveUp 0.2s forwards";

  keyboards += storeProducts[0].quantity * 0.2;
  showKeyboards.innerText = doIt(keyboards);

  setTimeout(() => {
    message.classList.remove("show");
  }, 200);
};

let autoKeyboard = document.querySelector(".auto-keyboard");
let isRunning = false;
let active = false;
let delay = 10;

const debounce = (func, delay) => {
  let timeoutId;
  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(func, delay);
  };
};

const debouncedToggleAutoKeyboard = debounce(toggleAutoKeyboard, 100);

function toggleAutoKeyboard() {
  if (!active) {
    active = true;
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
    active = false;
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const typing = (i) => {
  return sleep(delay).then(() => (input.value += word.innerText[i]));
};

const autoK = async () => {
  jegue: while (isRunning) {
    for (let i = 0; i < word.innerText.length; i++) {
      if (isRunning) {
        await typing(i);
      } else {
        input.value = "";
        break jegue;
      }
    }
    isAutoOn();
  }
};

autoKeyboard.addEventListener("click", debouncedToggleAutoKeyboard);

// typing bonus events =============================================

let isWritingChallengeActive = false;
const writingChallenge = () => {
  isWritingChallengeActive = true;
  document.querySelector(".bonusTooltip").innerText = "2x typing";
  document.querySelector(".bonusTooltip").classList.add("show");

  setTimeout(() => {
    document.querySelector(".bonusTooltip").classList.remove("show");
  }, 3000);

  const duration = Math.floor(Math.random() * (15 - 5)) + 5;
  const progressBar = document.getElementById("progress");
  const step = (duration * 1000) / 100;
  let progress = 0;
  let temp = storeProducts[0].quantity;
  storeProducts[0].quantity *= 2;

  progressBar.style.visibility = "visible";

  (function updateProgressBar() {
    progress++;
    progressBar.style.width = progress + "%";

    if (progress < 100) {
      setTimeout(updateProgressBar, step);
    } else {
      storeProducts[0].quantity = temp;
      isWritingChallengeActive = false;

      setTimeout(() => {
        document.querySelector(".bonusTooltip").innerText = "";
        progressBar.style.visibility = "hidden";

        progress = 0;
      }, 500);
    }
  })();
};

const generateRandomNumbers = () => {
  const doubleTyping = Math.floor(Math.random() * 11);

  if (doubleTyping === 0) {
    writingChallenge();
  }
};

// localStorage =============================================

const setEvents = () => {
  const upgrades = document.querySelector(".upgrades").childNodes;
  findProduct();

  upgrades.forEach((x, y) => {
    let upgradeName = x.className.split(" ")[1];
    let upgradeIndex = x.id;
    let dataid = x.getAttribute("data-id");

    switch (upgradeName) {
      case "keyboard":
        switch (true) {
          case dataid < 3:
            doubleXP1(upgradeName, upgradeIndex, dataid);
            break;
          case dataid == 3:
            nonCursor1(upgradeName, upgradeIndex, dataid);
            break;
          case dataid > 3:
            nonCursosMultiplier1(upgradeName, upgradeIndex, dataid);
            break;
        }
        break;

      case "assistant":
        doubleXP1(upgradeName, upgradeIndex, dataid);
        break;

      case "coffeeMachines":
        doubleXP1(upgradeName, upgradeIndex, dataid);
        break;

      case "ergonomicChairs":
        doubleXP1(upgradeName, upgradeIndex, dataid);
        break;

      case "textEditor":
        doubleXP1(upgradeName, upgradeIndex, dataid);
        break;

      case "speechToText":
        doubleXP1(upgradeName, upgradeIndex, dataid);
        break;
    }
  });
};

const saveDataToLocalStorage = (data) => {
  localStorage.setItem("my", JSON.stringify(data));
};

const loadDataFromLocalStorage = () => {
  const data = JSON.parse(localStorage.getItem("my"));

  if (data) {
    console.log("load: ", data);
    storeProducts = data[0];
    upgradesList = data[1];
    keyboards = data[2];
    acc = data[3];
    document.querySelector(".upgrades").outerHTML = data[4];
    showKeyboards.innerText = doIt(keyboards);
    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
    updateProductPrice();
    xxt();

    setEvents(data[3]);
  }
};

setTimeout(loadDataFromLocalStorage(), 0);

let upgrades = document.querySelector(".upgrades");

document.querySelector(".saveBtn  button").addEventListener("click", () => {
  const notes = document.querySelector(".notes");

  notes.textContent = "Saved";
  notes.classList.add("saved");

  setTimeout(() => notes.classList.remove("saved"), 2000);
  saveDataToLocalStorage([storeProducts, upgradesList, keyboards, acc, upgrades.outerHTML]);
});

setInterval(() => {
  saveDataToLocalStorage([storeProducts, upgradesList, keyboards, acc, upgrades.outerHTML]);
}, 45000);

// localStorage upgrades handlers
function findProduct() {
  document.querySelectorAll(".product").forEach((_, index) => {
    productTooltip(index);
  });
}

function findUpgrade(name) {
  return upgradesList.findIndex((upgrade) => upgrade.name === name);
}

function doubleXP1(upgradeName, upgradeIndex, dataid) {
  const foo = () => {
    let y = findUpgrade(upgradeName);

    if (keyboards >= upgradesList[y].upgradeCost[upgradeIndex]) {
      keyboards -= upgradesList[y].upgradeCost[upgradeIndex];
      showKeyboards.innerText = doIt(keyboards);
      storeProducts[y].quantity *= upgradesList[y].chorume[upgradeIndex];
      storeProducts[y].quantityPerSecond *= upgradesList[y].chorume[upgradeIndex];
      storeProducts[y].multiplier *= upgradesList[y].chorume[upgradeIndex];
      upgradesList[y].upgradeCost.splice(upgradeIndex, 1, false);
      upgradesList[y].chorume.splice(upgradeIndex, 1, false);
      moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
      document.querySelector(`[data-id="${dataid}"]`).remove();

      productTooltip(y);
    } else {
      alert("You don't have keyboards enough.");
    }
  };

  document.querySelector(`[data-id="${dataid}"]`).addEventListener("click", () => foo());
}

function nonCursor1(upgradeName, upgradeIndex, dataid) {
  const foo = () => {
    let y = findUpgrade(upgradeName);

    if (keyboards >= upgradesList[0].upgradeCost[upgradeIndex]) {
      keyboards -= upgradesList[0].upgradeCost[upgradeIndex];
      upgradesList[0].upgradeCost.splice(upgradeIndex, 1, false);
      showKeyboards.innerText = doIt(keyboards);
      document.querySelector(`[data-id="${dataid}"]`).remove();

      enableK(y);
      kUp();
      productTooltip(y);
    } else {
      alert("You don't have keyboards enough.");
    }
  };

  document.querySelector(`[data-id="${dataid}"]`).addEventListener("click", () => foo());
}

function nonCursosMultiplier1(upgradeName, upgradeIndex, dataid) {
  const foo = () => {
    let y = findUpgrade(upgradeName);

    if (!document.querySelector(`[data-id="${3}"]`)) {
      if (keyboards >= upgradesList[0].upgradeCost[upgradeIndex]) {
        keyboards -= upgradesList[0].upgradeCost[upgradeIndex];
        upgradesList[0].upgradeCost.splice(upgradeIndex, 1, false);
        showKeyboards.innerText = doIt(keyboards);

        upgradesList[0].currentMultiplier *= upgradesList[0].multiplier[multIndex];
        upgradesList[0].multiplier.splice(multIndex++, 1, false);
        storeProducts[0].multiplier += getTotalOwn() * upgradesList[0].currentMultiplier;

        if (tempMultiplier) {
          storeProducts[0].multiplier -= tempMultiplier;
          tempMultipler = () => {
            tempMultiplier = "";
          };
        }

        kUp();
        productTooltip(y);

        storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;
        moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

        document.querySelector(`[data-id="${dataid}"]`).remove();
      } else {
        alert("You don't have keyboards enough.");
      }
    } else {
      alert("You still can't do it");
    }
  };

  document.querySelector(`[data-id="${dataid}"]`).addEventListener("click", foo);
}

import { task, words, input, setWord } from "./wordsList.js";
import { getTax, getQuantityPerSecond, produced, productTooltip, doIt } from "./jacare.js";
import { options, exit, prompt } from "./options.js";
import { showColorPicker } from "./darkLightTheme.js";

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
    ownBuffer: 0,
    produced: 0,
  },
  {
    name: "coffeeMachines",
    quantityPerSecond: 0,
    multiplier: 8,
    level: 0,
    cost: 1100,
    baseCost: 1100,
    own: 0,
    ownBuffer: 0,
    produced: 0,
  },
  {
    name: "ergonomicChairs",
    quantityPerSecond: 0,
    multiplier: 47,
    level: 0,
    cost: 12000,
    baseCost: 12000,
    own: 0,
    ownBuffer: 0,
    produced: 0,
  },
  {
    name: "textEditor",
    quantityPerSecond: 0,
    multiplier: 260,
    level: 0,
    cost: 130000,
    baseCost: 130000,
    own: 0,
    ownBuffer: 0,
    produced: 0,
  },
  {
    name: "speechToText",
    quantityPerSecond: 0,
    multiplier: 1400,
    level: 0,
    cost: 1400000,
    baseCost: 1400000,
    own: 0,
    ownBuffer: 0,
    produced: 0,
  },
];

let upgradesList = [
  {
    name: "keyboard",
    chorume: [2, 2, 2],
    currentMultiplier: 0.1,
    multiplier: [1, 5, 10, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    upgradeCost: [80, 400, 8000, 80000, 8000000, 800000000],
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

let acc = [
  {
    dataid: [0, 0],
  },
  {
    dataid: [0, 16],
  },
  {
    dataid: [0, 22],
  },
  {
    dataid: [0, 28],
  },
  {
    dataid: [0, 34],
  },
  {
    dataid: [0, 40],
  },
];

// ================ START ================
setWord();
getScreenSize();

// ================ KEYBOARDS EARNED BY TYPING ================
const message = document.querySelector(".keyboardEarned");

const showEarnings = (x) => {
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

// ================ USER TYPING ================
// const debounce = (func, delay) => {
//   let timeoutId;
//   return () => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(func, delay);
//   };
// };
// const debouncedToggleAutoKeyboard = debounce(toggleAutoKeyboard, 100);

export let answer = "";
let taskID = 0;
let isWriting = false;
let writingTimeout;
let writingTime;
let seconds = 0;
let rightAnswers = 0;
let wordsPerSecond = 0;

function typingTimeoutHandler() {
  clearTimeout(writingTimeout);
  writingTimeout = setTimeout(() => {
    isWriting = false;
    writingTimeHandler();
  }, 2000);

  if (!writingTime) {
    isWriting = true;
    writingTime = setInterval(() => {
      seconds++;
    }, 1000);
  }
}
const getUserInput = () => {
  typingTimeoutHandler();
  answer = input.value.trim();
  if (taskID <= 2 && !isRunning) {
    shit();
  }
};

function shit() {
  if (answer == task[taskID]) {
    if (!isWritingChallengeActive) {
      generateRandomNumbers();
    }
    rightAnswers++;
    handleCorrectAnswer();
  } else if (answer.length > task[taskID].length) {
    clearInputField();
  }
}

function handleCorrectAnswer() {
  growFortune();
  clearInputField();
  dimCurrentWord();
  showEarnings();
  incrementTaskID();
  checkForWordReset();
}

function growFortune() {
  keyboards += storeProducts[0].quantity;
  showKeyboards.innerText = doIt(keyboards);
}

function incrementTaskID() {
  taskID++;
}

function clearInputField() {
  input.value = "";
}

function dimCurrentWord() {
  words[taskID].style.opacity = "0.2";
}

function checkForWordReset() {
  if (taskID == 3) {
    wordsPerSecondHandler();
    setWord();
    taskID = 0;
  }
}

// ================ WRITING MULTIPLIER BONUS ================
function writingTimeHandler() {
  clearInterval(writingTime);
  writingTime = false;
  writingBonus();
  wordsPerSecond = 0;
}

function writingBonus() {
  const calc = Math.round(wordsPerSecond * storeProducts[0].quantity);
  keyboards += calc;
  showKeyboards.innerText = doIt(keyboards);
  if (calc) {
    showEarnings(calc);
  }
  removeWritingBonusSpan();
}

function removeWritingBonusSpan() {
  const span = document.querySelector(".writingBonus");
  if (span) {
    span.remove();
  }
}

function wordsPerSecondHandler() {
  wordsPerSecond += rightAnswers / seconds;
  seconds = 0;
  rightAnswers = 0;
  writingBonusSpan(`${storeProducts[0].quantity} * ${wordsPerSecond.toFixed(1)}`);
}

function writingBonusSpan(bonus) {
  const span = document.createElement("span");
  const inputSection = document.querySelector(".inputSection");
  span.classList.add("writingBonus");
  span.innerText = bonus;

  const oldSpan = document.querySelector(".writingBonus");
  if (!oldSpan) {
    inputSection.appendChild(span);
  } else {
    oldSpan.remove();
    inputSection.appendChild(span);
  }

  // setTimeout(() => span.remove(), 2000);
}

input.addEventListener("input", getUserInput);

// ================ PRODUCTS ================
let keyboardPerSecond = false;
let showMoneyPerSecond = false;
let addMultiplier = false;
let flag = false;

let moneyPerSecond = document.querySelector("#money-per-second span");
let showKeyboards = document.querySelector("#money-quantity");
let keyboards = 10000000000000;

document.querySelectorAll(".product").forEach((product, index) => {
  product.addEventListener("click", ({ target }) =>
    index > 0 ? productClickerHandlerAll(target) : productClickerHandlerFirst(target)
  );
});

const enableProduction = () => {
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

const products = [...document.querySelectorAll(".product")];
const productClickerHandlerFirst = (target) => {
  const productIndex = products.indexOf(target.closest(".product"));

  if (keyboards >= storeProducts[0].cost) {
    keyboards -= storeProducts[0].cost;
    showKeyboards.innerText = doIt(keyboards);
    storeProducts[0].own += 1;
    storeProducts[0].ownBuffer += 1;
    storeProducts[0].level += 1;
    storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;

    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
    getTax(productIndex);
    getScreenSize();
    productTooltip(productIndex);
    verifyToSetUpgrade(productIndex);

    if (!flag) {
      enableProduction();
    }
  } else {
    flashWarningProduct(productIndex);
  }
};

const productClickerHandlerAll = (target) => {
  const productIndex = products.indexOf(target.closest(".product"));

  if (keyboards >= storeProducts[productIndex].cost) {
    keyboards -= storeProducts[productIndex].cost;
    showKeyboards.innerText = doIt(keyboards);
    storeProducts[productIndex].quantityPerSecond += storeProducts[productIndex].multiplier;
    storeProducts[productIndex].level += 1;
    storeProducts[productIndex].own += 1;
    storeProducts[productIndex].ownBuffer += 1;

    if (addMultiplier) {
      addMultiplier();
    }

    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
    getTax(productIndex);
    getScreenSize();
    productTooltip(productIndex);
    verifyToSetUpgrade(productIndex);

    if (!flag) {
      enableProduction();
    }
  } else {
    flashWarningProduct(productIndex);
  }
};

function flashWarningProduct(index) {
  const target = document.querySelectorAll(".product-price")[index];
  let toggle = true;

  let blinkInterval = setInterval(() => {
    if (toggle) {
      target.style.color = "red";
      showKeyboards.style.color = "red";
      toggle = !toggle;
    } else {
      target.style.color = "var(--light-color)";
      showKeyboards.style.color = "var(--light-color)";
      toggle = !toggle;
    }
  }, 250);

  setTimeout(() => clearInterval(blinkInterval), 1000);
}

function flashWarningUpgrade(element) {
  let toggle = true;

  let blinkInterval = setInterval(() => {
    if (toggle) {
      element.style.border = "2px solid red";
      showKeyboards.style.color = "red";
      toggle = !toggle;
    } else {
      element.style.border = "1px solid var(--light-border-color)";
      showKeyboards.style.color = "var(--light-color)";
      toggle = !toggle;
    }
  }, 250);

  setTimeout(() => clearInterval(blinkInterval), 1000);
}

function EXCLUSIVE_flashWarning(element) {
  let toggle = true;

  let blinkInterval = setInterval(() => {
    if (toggle) {
      element.style.border = "2px solid red";
      toggle = !toggle;
    } else {
      element.style.border = "1px solid var(--light-border-color)";
      toggle = !toggle;
    }
  }, 250);

  setTimeout(() => clearInterval(blinkInterval), 1000);
}

// ================ VERIFYING AND SETTING UPGRADES ================

function verifyToSetUpgrade(productIndex) {
  let productLevel = storeProducts[productIndex].level;
  let productName = storeProducts[productIndex].name;

  switch (productIndex) {
    case 0:
      switch (productLevel) {
        case 1: // Keyboards
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
    case 1: // Assistants
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
    case 2: // Coffee Machines
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
    case 3: // Ergonomic Chairs
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
    case 4: // Text Editors
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
    case 5: // Speech to Text
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
  const tooltipDiv = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  switch (productName) {
    case "keyboard":
      div.dataset.id = `${acc[0].dataid[0]}, ${acc[0].dataid[1]}`;
      break;
    case "assistant":
      div.dataset.id = `${acc[1].dataid[0]}, ${acc[1].dataid[1]}`;
      break;
    case "coffeeMachines":
      div.dataset.id = `${acc[2].dataid[0]}, ${acc[2].dataid[1]}`;
      break;
    case "ergonomicChairs":
      div.dataset.id = `${acc[3].dataid[0]}, ${acc[3].dataid[1]}`;
      break;
    case "textEditor":
      div.dataset.id = `${acc[4].dataid[0]}, ${acc[4].dataid[1]}`;
      break;
    case "speechToText":
      div.dataset.id = `${acc[5].dataid[0]}, ${acc[5].dataid[1]}`;
      break;
  }

  tooltipDiv.classList.add("tooltip-upgrade");
  span.innerText = "";
  tooltipDiv.appendChild(span);
  div.appendChild(tooltipDiv);

  div.classList.add("boxUpgrade", productName);
  div.appendChild(img);
  document.querySelector(".upgrades").appendChild(div);

  checkAcc(productName, productIndex);
};

const checkAcc = (productName, productIndex) => {
  switch (productName) {
    case "keyboard":
      switch (true) {
        case acc[0].dataid[1] < 3:
          doubleXp(productIndex, acc[0].dataid[0]);
          incrementData_ID(productIndex);
          break;
        case acc[0].dataid[1] == 3:
          nonCursor(productIndex, acc[0].dataid[0]);
          incrementData_ID(productIndex);
          break;
        case acc[0].dataid[1] > 3:
          nonCursosMultiplier(productIndex, acc[0].dataid[0]);
          incrementData_ID(productIndex);
          break;
      }
      break;

    case "assistant":
      doubleXp(productIndex, acc[1].dataid[0]);
      incrementData_ID(productIndex);
      break;

    case "coffeeMachines":
      doubleXp(productIndex, acc[2].dataid[0]);
      incrementData_ID(productIndex);
      break;

    case "ergonomicChairs":
      doubleXp(productIndex, acc[3].dataid[0]);
      incrementData_ID(productIndex);
      break;

    case "textEditor":
      doubleXp(productIndex, acc[4].dataid[0]);
      incrementData_ID(productIndex);
      break;

    case "speechToText":
      doubleXp(productIndex, acc[5].dataid[0]);
      incrementData_ID(productIndex);
      break;
  }
};

function incrementData_ID(index) {
  acc[index].dataid[0]++;
  acc[index].dataid[1]++;
}

const priceTooltip = (productIndex, id, data_ID) => {
  let upgradeCost = upgradesList[productIndex].upgradeCost[id];
  document.querySelector(`[data-id="${data_ID}"] > .tooltip-upgrade > span`).innerText = doIt(upgradeCost);
};

const doubleXp = (productIndex, id) => {
  const data_ID = document.querySelector(`.upgrades`).lastChild.getAttribute("data-id");
  priceTooltip(productIndex, id, data_ID);

  const foo = () => {
    if (keyboards >= upgradesList[productIndex].upgradeCost[id]) {
      keyboards -= upgradesList[productIndex].upgradeCost[id];
      showKeyboards.innerText = doIt(keyboards);
      storeProducts[productIndex].quantity *= upgradesList[productIndex].chorume[id];
      storeProducts[productIndex].quantityPerSecond *= upgradesList[productIndex].chorume[id];
      storeProducts[productIndex].multiplier *= upgradesList[productIndex].chorume[id];
      upgradesList[productIndex].upgradeCost.splice(id, 1, false);
      upgradesList[productIndex].chorume.splice(id, 1, false);
      moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

      document.querySelector(`[data-id="${data_ID}"]`).remove();
      productTooltip(productIndex);
    } else {
      flashWarningUpgrade(`[data-id="${data_ID}"]`);
    }
  };

  document.querySelector(`[data-id="${data_ID}"]`).addEventListener("click", foo);
};

const nonCursor = (productIndex, id) => {
  const data_ID = document.querySelector(`.upgrades`).lastChild.getAttribute("data-id");
  priceTooltip(productIndex, id, data_ID);

  const foo = () => {
    if (keyboards >= upgradesList[productIndex].upgradeCost[id]) {
      keyboards -= upgradesList[productIndex].upgradeCost[id];
      upgradesList[productIndex].upgradeCost.splice(id, 1, false);
      upgradesList[0].multiplier.splice(multIndex++, 1, false);
      showKeyboards.innerText = doIt(keyboards);
      document.querySelector(`[data-id="${data_ID}"]`).remove();

      enableK(productIndex);
      addMultiplier();
    } else {
      flashWarningUpgrade(`[data-id="${data_ID}"]`);
    }
  };

  document.querySelector(`[data-id="${data_ID}"]`).addEventListener("click", foo);
};

const enableK = (productIndex) => {
  activateMultiplier(productIndex);
};

function activateMultiplier(productIndex) {
  addMultiplier = () => {
    totalOwn = getTotalOwn() - previousOwn;

    storeProducts[0].multiplier += totalOwn * upgradesList[0].currentMultiplier;
    storeProducts[0].quantity += totalOwn * upgradesList[0].currentMultiplier;
    storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;
    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

    tempMultipler();
    previousOwn = getTotalOwn();
    productTooltip(productIndex);
    zeroOwnBuffers();
  };
}

let totalOwn = 0;
let previousOwn = 0;
let tempMultiplier = 0;
let multIndex = 0;

const nonCursosMultiplier = (productIndex, id) => {
  const data_ID = document.querySelector(`.upgrades`).lastChild.getAttribute("data-id");
  priceTooltip(productIndex, id, data_ID);

  const foo = () => {
    if (!document.querySelector(`[data-id="3, 3"]`)) {
      if (keyboards >= upgradesList[0].upgradeCost[id]) {
        keyboards -= upgradesList[0].upgradeCost[id];
        upgradesList[0].upgradeCost.splice(id, 1, false);
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

        addMultiplier();

        storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;
        moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

        document.querySelector(`[data-id="${data_ID}"]`).remove();
      } else {
        flashWarningUpgrade(`[data-id="${data_ID}"]`);
      }
    } else {
      const target = document.querySelector(`[data-id="3, 3"]`);
      EXCLUSIVE_flashWarning(target);
    }
  };

  document.querySelector(`[data-id="${data_ID}"]`).addEventListener("click", foo);
};

const getTotalOwn = () => {
  return storeProducts.reduce((x, y, z) => (z > 0 ? x + y.own : 0), 0);
};

function tempMultipler() {
  tempMultiplier += upgradesList[0].currentMultiplier * totalOwn;
}

// ================ AUTOKEYBOARD ================
const showReducedEarnings = () => {
  message.innerText = `+ ${storeProducts[0].quantity * 0.1}`;
  message.classList.add("show");
  message.style.animation = "none";
  void message.offsetWidth;
  message.style.animation = "moveUp 0.2s forwards";

  keyboards += storeProducts[0].quantity * 0.1;
  showKeyboards.innerText = doIt(keyboards);

  setTimeout(() => {
    message.classList.remove("show");
  }, 300);
};

const isAutoOn = () => {
  answer = input.value.trim();
  if (answer == task[taskID]) {
    growFortune();
    clearInputField();
    dimCurrentWord();
    showEarnings();
    incrementTaskID();
    if (taskID == 3) {
      setWord();
      taskID = 0;
    }
  }
};

function isWritingChallengeOn() {
  if (isWritingChallengeActive) {
    storeProducts[0].quantity /= 2;
  }
}

let autoKeyboard = document.querySelector(".auto-keyboard > img");
let isRunning = false;
let active = false;
let delay = 100; // AUTOKEYBOARD DELAY

// debounce handles call stack
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
    autoKeyboard.style.opacity = "1";
    autoKeyboard.classList.add("on");
    autoKeyboard.src =
      "https://gist.githubusercontent.com/347fabricio/e534c79d2a515779b6c654176d9d061e/raw/8c34362e16135b68a1f4bf4ed9fb76e059baaf0b/autoKeyboardOff.svg";
  } else {
    isRunning = false;
    autoKeyboard.style.opacity = "";
    autoKeyboard.src =
      "https://gist.githubusercontent.com/347fabricio/15ac2927effbde6e263c68b5857c1027/raw/f6fabc50bde42eaa0a667370672a8d89cad319b0/autoKeyboard.svg";
    autoKeyboard.classList.remove("on");
    active = false;
  }
}

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const typing = async (task, j) => {
  return await sleep(delay).then(() => (input.value += task[j]));
};

const autoK = async () => {
  isWritingChallengeOn();
  jegue: while (isRunning) {
    for (let i = 0; i < words.length; i++) {
      for (let j = 0; j < task[taskID].length; j++) {
        if (isRunning) {
          await typing(task[taskID], j);
        } else {
          input.value = "";
          setWord();
          taskID = 0;
          break jegue;
        }
      }
      isAutoOn();
    }
  }
};
autoKeyboard.addEventListener("click", debouncedToggleAutoKeyboard);

// ================ TYPING BONUS ================

let isWritingChallengeActive = false;
const writingChallenge = () => {
  isWritingChallengeActive = true;
  document.querySelector(".bonusTooltip").classList.add("show");
  document.querySelector(".bonusTooltip").innerText = "2x typing";

  setTimeout(() => {
    document.querySelector(".bonusTooltip").classList.remove("show");
  }, 3000);

  const duration = Math.floor(Math.random() * (15 - 5)) + 5;
  const progressBar = document.getElementById("progress-bar");
  const progress = document.getElementById("progress");
  const step = (duration * 1000) / 100;
  let count = 0;
  let temp = storeProducts[0].quantity;
  storeProducts[0].quantity *= 2;

  progressBar.style.visibility = "visible";

  (function updateProgressBar() {
    count++;
    progress.style.width = count + "%";

    if (count < 100) {
      setTimeout(updateProgressBar, step);
    } else {
      storeProducts[0].quantity = temp;
      isWritingChallengeActive = false;

      setTimeout(() => {
        document.querySelector(".bonusTooltip").innerText = "";
        progressBar.style.visibility = "hidden";

        count = 0;
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

// ================ LOCALSTORAGE ================

const rebuildUpgrades = () => {
  const upgrades = document.querySelector(".upgrades").childNodes;
  initProductTooltips();

  upgrades.forEach((x) => {
    let upgradeName = x.className.split(" ")[1];
    let dataid = x.getAttribute("data-id");
    switch (upgradeName) {
      case "keyboard":
        switch (true) {
          case dataid[0] < 3:
            doubleXP1(upgradeName, dataid[0]);
            break;
          case dataid[0] == 3:
            nonCursor1(upgradeName, dataid[0]);
            break;
          case dataid[0] > 3:
            nonCursosMultiplier1(upgradeName, dataid[0]);
            break;
        }
        break;

      case "assistant":
        doubleXP1(upgradeName, dataid[0]);
        break;

      case "coffeeMachines":
        doubleXP1(upgradeName, dataid[0]);
        break;

      case "ergonomicChairs":
        doubleXP1(upgradeName, dataid[0]);
        break;

      case "textEditor":
        doubleXP1(upgradeName, dataid[0]);
        break;

      case "speechToText":
        doubleXP1(upgradeName, dataid[0]);
        break;
    }
  });
};

const setData = (x) => {
  x.forEach((variable, index) => {
    switch (index) {
      case 0:
        storeProducts = variable;
        break;
      case 1:
        upgradesList = variable;
        break;
      case 2:
        acc = variable;
        break;
      case 3:
        document.querySelector(".upgrades").outerHTML = variable;
        break;
      case 4:
        keyboards = variable;
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
    setData(data);
    showKeyboards.innerText = doIt(keyboards);
    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
    getScreenSize();
    enableProduction();
    rebuildUpgrades();
    isAddMultiplierActivate();
  }
};

function isAddMultiplierActivate() {
  if (upgradesList[0].multiplier[0] == false) {
    applyMultiplier();
  }
}

function applyMultiplier() {
  addMultiplier = () => {
    totalOwnBuffer = getOwnBuffer();

    storeProducts[0].multiplier += upgradesList[0].currentMultiplier * totalOwnBuffer;
    storeProducts[0].quantity += upgradesList[0].currentMultiplier * totalOwnBuffer;
    storeProducts[0].quantityPerSecond = storeProducts[0].ownBuffer * storeProducts[0].multiplier;
    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

    tempBufferMultipler();
    productTooltip(0);
  };
}

let totalOwnBuffer = 0;
let tempBufferMultiplier = 0;
function getOwnBuffer() {
  let buffer = storeProducts.reduce((x, y, z) => (z > 0 ? x + y.ownBuffer : 0), 0);
  zeroOwnBuffers();
  return buffer;
}

function zeroOwnBuffers() {
  storeProducts.map((x, y) => {
    if (y > 0) {
      x.ownBuffer = 0;
    }
  });
}

function tempBufferMultipler() {
  tempBufferMultiplier += upgradesList[0].currentMultiplier * totalOwn;
}

window.onload = loadDataFromLocalStorage();

let upgrades = document.querySelector(".upgrades");

setInterval(() => {
  saveDataToLocalStorage([storeProducts, upgradesList, acc, upgrades.outerHTML, keyboards]);
}, 45000);

// ================ LOCALSTORAGE UPGRADES HANDLERS ================
function initProductTooltips() {
  document.querySelectorAll(".product").forEach((_, index) => {
    productTooltip(index);
  });
}

function findUpgrade(name) {
  return upgradesList.findIndex((upgrade) => upgrade.name === name);
}

function doubleXP1(upgradeName, id) {
  const data_ID = document.querySelectorAll(`.upgrades > .${upgradeName}`)[id].getAttribute("data-id");

  const foo = () => {
    const idx = findUpgrade(upgradeName);

    if (keyboards >= upgradesList[idx].upgradeCost[id]) {
      keyboards -= upgradesList[idx].upgradeCost[id];
      showKeyboards.innerText = doIt(keyboards);
      storeProducts[idx].quantity *= upgradesList[idx].chorume[id];
      storeProducts[idx].quantityPerSecond *= upgradesList[idx].chorume[id];
      storeProducts[idx].multiplier *= upgradesList[idx].chorume[id];
      upgradesList[idx].upgradeCost.splice(id, 1, false);
      upgradesList[idx].chorume.splice(id, 1, false);
      moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
      document.querySelector(`[data-id="${data_ID}"]`).remove();

      productTooltip(idx);
    } else {
      const target = document.querySelector(`[data-id="${data_ID}"]`);
      flashWarningUpgrade(target);
    }
  };

  document.querySelector(`[data-id="${data_ID}"]`).addEventListener("click", foo);
}

function nonCursor1(upgradeName, id) {
  const data_ID = document.querySelectorAll(`.upgrades > .${upgradeName}`)[id].getAttribute("data-id");

  const foo = () => {
    const idx = findUpgrade(upgradeName);

    if (keyboards >= upgradesList[0].upgradeCost[id]) {
      keyboards -= upgradesList[0].upgradeCost[id];
      upgradesList[0].upgradeCost.splice(id, 1, false);
      showKeyboards.innerText = doIt(keyboards);
      document.querySelector(`[data-id="${data_ID}"]`).remove();

      enableK(idx);
      addMultiplier();
    } else {
      flashWarningUpgrade(`[data-id="${data_ID}"]`);
    }
  };

  document.querySelector(`[data-id="${data_ID}"]`).addEventListener("click", foo);
}

function nonCursosMultiplier1(upgradeName, id) {
  const data_ID = document.querySelectorAll(`.upgrades > .${upgradeName}`)[id].getAttribute("data-id");

  const foo = () => {
    if (!document.querySelector(`[data-id="3, 3"]`)) {
      if (keyboards >= upgradesList[0].upgradeCost[id]) {
        keyboards -= upgradesList[0].upgradeCost[id];
        upgradesList[0].upgradeCost.splice(id, 1, false);
        showKeyboards.innerText = doIt(keyboards);

        upgradesList[0].currentMultiplier *= upgradesList[0].multiplier[multIndex];
        upgradesList[0].multiplier.splice(multIndex++, 1, false);
        storeProducts[0].multiplier += getTotalOwn() * upgradesList[0].currentMultiplier;

        if (tempBufferMultipler()) {
          storeProducts[0].multiplier -= tempBufferMultiplier;
          tempMultipler = () => {
            tempBufferMultiplier = "";
          };
        }

        addMultiplier();

        storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;
        moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;

        document.querySelector(`[data-id="${data_ID}"]`).remove();
      } else {
        flashWarningUpgrade(`[data-id="${data_ID}"]`);
      }
    } else {
      const target = document.querySelector(`[data-id="3, 3"]`);
      EXCLUSIVE_flashWarning(target);
    }
  };

  document.querySelector(`[data-id="${data_ID}"]`).addEventListener("click", foo);
}

// ================ notes ================
export const createNote = (message) => {
  const notes = document.querySelector(".notes");
  notes.textContent = message;
  notes.classList.add("saved");

  setTimeout(() => {
    notes.classList.remove("saved");
    notes.innerText = "";
  }, 2000);
};

// ================ SAVE WINDOW ================

options();
document.querySelector("#exit").addEventListener("click", exit);

document.querySelectorAll("#fodase").forEach((button, index) => {
  button.addEventListener("click", () => {
    if (index == 0) {
      createNote("Saved");
      saveDataToLocalStorage([storeProducts, upgradesList, acc, upgrades.outerHTML, keyboards]);
    } else {
      saveDataToLocalStorage([storeProducts, upgradesList, acc, upgrades.outerHTML, keyboards]);
      prompt(index);
    }
  });
});

// ================ CHECK SCREEN SIZE ================
let windows = document.querySelectorAll(".window");
let titleBars = document.querySelectorAll(".title-bar");
let isDown = false;
let offset = { x: 0, y: 0 };
let activeWindow = null;

titleBars.forEach((titleBar, index) => {
  titleBar.addEventListener("mousedown", (e) => {
    isDown = true;
    activeWindow = windows[index];
    offset.x = activeWindow.offsetLeft - e.clientX;
    offset.y = activeWindow.offsetTop - e.clientY;
  });

  titleBar.addEventListener("mouseup", () => {
    isDown = false;
    activeWindow = null;
  });
});

document.addEventListener("mousemove", (event) => {
  event.preventDefault();
  if (isDown && activeWindow) {
    let mousePosition = {
      x: event.clientX,
      y: event.clientY,
    };
    activeWindow.style.left = mousePosition.x + offset.x + "px";
    activeWindow.style.top = mousePosition.y + offset.y + "px";
  }
});

function getScreenSize() {
  let screen = document.body.clientWidth;
  let productPrice = document.querySelectorAll(".product-price");

  if (screen <= 760) {
    for (let i = 0; i < productPrice.length; i++) {
      if (productPrice[i].innerText != storeProducts[i].cost) {
        productPrice[i].innerText = storeProducts[i].cost.toLocaleString("en-US", {
          notation: "compact",
          compactDisplay: "short",
        });
      }
    }
  } else {
    for (let i = 0; i < productPrice.length; i++) {
      if (productPrice[i].innerText != storeProducts[i].cost) {
        productPrice[i].innerText = storeProducts[i].cost.toLocaleString("en-US", {
          notation: "compact",
          compactDisplay: "long",
        });
      }
    }
  }
}

const debouncedScreenSize = debounce(getScreenSize, 1000);

window.addEventListener("resize", debouncedScreenSize);

// ================ CHANGE ELEMENT COLORS ================
showColorPicker();

import { task, words, input, setWord } from "./wordsList.js";
import { getTax, getQuantityPerSecond, produced, productTooltip, doIt } from "./jacare.js";
import { options, exit, prompt } from "./options.js";
import { showColorPicker } from "./colorPicker.js";

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
  console.log("----------------------------");
}

function writingBonus() {
  const calc = Math.round(storeProducts[0].quantity * wordsPerSecond);
  console.log(storeProducts[0].quantity, wordsPerSecond);
  // growFortune(calc);
  keyboards += calc;
  showKeyboards.innerText = doIt(keyboards);
  showEarnings(calc);
  console.log("bonus", calc);
  writingBonusSpan(calc);
}

function wordsPerSecondHandler() {
  console.log(`right answers: ${rightAnswers} -- seconds: ${seconds} = ${rightAnswers / seconds}`);
  wordsPerSecond += rightAnswers / seconds;
  seconds = 0;
  rightAnswers = 0;
  console.log("wordsPerSecond", wordsPerSecond.toFixed(2));
}

function writingBonusSpan(bonus) {
  const span = document.createElement("span");
  const inputSection = document.querySelector(".inputSection");
  span.classList.add("writingBonus");
  span.innerText = bonus;

  inputSection.appendChild(span);

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
let keyboards = 0;

document.querySelectorAll(".product").forEach((product, index) => {
  product.addEventListener("click", () =>
    index > 0 ? productClickerHandlerAll(index) : productClickerHandlerFirst(index)
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

const productClickerHandlerFirst = (index) => {
  if (keyboards >= storeProducts[0].cost) {
    keyboards -= storeProducts[0].cost;
    showKeyboards.innerText = doIt(keyboards);
    storeProducts[0].own += 1;
    storeProducts[0].ownBuffer += 1;
    storeProducts[0].level += 1;
    storeProducts[0].quantityPerSecond = storeProducts[0].multiplier * storeProducts[0].own;

    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
    getTax(this, index);
    getScreenSize();
    productTooltip(index);
    verifyToSetUpgrade(this, index);

    if (!flag) {
      enableProduction();
    }
  } else {
    flashWarning(index);
  }
};

const productClickerHandlerAll = (index) => {
  if (keyboards >= storeProducts[index].cost) {
    keyboards -= storeProducts[index].cost;
    showKeyboards.innerText = doIt(keyboards);
    storeProducts[index].quantityPerSecond += storeProducts[index].multiplier;
    storeProducts[index].level += 1;
    storeProducts[index].own += 1;
    storeProducts[index].ownBuffer += 1;

    if (addMultiplier) {
      addMultiplier();
    }

    moneyPerSecond.innerText = `money/second: ${doIt(getQuantityPerSecond())}`;
    getTax(this, index);
    getScreenSize();
    productTooltip(index);
    verifyToSetUpgrade(this, index);

    if (!flag) {
      enableProduction();
    }
  } else {
    flashWarning(index);
  }
};

function flashWarning(index) {
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

// ================ VERIFYING AND SETTING UPGRADES ================

function verifyToSetUpgrade(_, index) {
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
  const tooltipDiv = document.createElement("div");
  const img = document.createElement("img");
  const span = document.createElement("span");

  switch (productName) {
    case "keyboard":
      div.id = acc[0].id;
      div.dataset.id = acc[0].dataid;
      break;
    case "assistant":
      div.id = acc[1].id;
      div.dataset.id = acc[1].dataid;
      break;
    case "coffeeMachines":
      div.id = acc[2].id;
      div.dataset.id = acc[2].dataid;
      break;
    case "ergonomicChairs":
      div.id = acc[3].id;
      div.dataset.id = acc[3].dataid;
      break;
    case "textEditor":
      div.id = acc[4].id;
      div.dataset.id = acc[4].dataid;
      break;
    case "speechToText":
      div.id = acc[5].id;
      div.dataset.id = acc[5].dataid;
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

const priceTooltip = (_, productIndex, exclusiveIndex, dataid) => {
  let upgradeCost = upgradesList[productIndex].upgradeCost[exclusiveIndex];
  document.querySelector(`[data-id="${+dataid}"] > .tooltip-upgrade > span`).innerText = doIt(upgradeCost);
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
      upgradesList[0].multiplier.splice(multIndex++, 1, false);
      showKeyboards.innerText = doIt(keyboards);
      document.querySelector(`[data-id="${dataid}"]`).remove();

      console.log(storeProducts[0]);
      enableK(productIndex);
      addMultiplier();
    } else {
      alert("You don't have keyboards enough.");
    }
  };

  document.querySelector(`[data-id="${dataid}"]`).addEventListener("click", foo);
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
    console.log(storeProducts[0]);
  };
}

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

        addMultiplier();

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
    koko();
  }
}

function koko() {
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
      addMultiplier();
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

        if (tempBufferMultipler()) {
          storeProducts[0].multiplier -= tempBufferMultiplier;
          tempMultipler = () => {
            tempBufferMultiplier = "";
          };
        }

        addMultiplier();
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

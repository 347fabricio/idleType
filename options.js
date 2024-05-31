let mainToggle = true;

const showHideMain = () => {
  const optionsElement = document.querySelector("#options");
  const bgOpacity = document.querySelector("main");

  optionsElement.style.visibility = mainToggle ? "visible" : "hidden";
  bgOpacity.style.filter = mainToggle ? "blur(3px)" : "";
  // bgOpacity.style.opacity = mainToggle ? "0.6" : "";

  mainToggle = !mainToggle;
};

export const options = () =>
  document.querySelector(".save").addEventListener("click", () => {
    showHideMain();
  });

export function exit() {
  showHideMain();
  return false;
}

let optionsToggle = true;

const showHideOptions = () => {
  const optionsElement = document.querySelector("#options");

  optionsElement.style.filter = optionsToggle ? "blur(2px)" : "";
  // optionsElement.style.opacity = optionsToggle ? "0.8" : "";

  optionsToggle = !optionsToggle;
};

export const prompt = () => {
  showHideOptions();

  const div = document.createElement("div");
  const promptBtnDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  const textArea = document.createElement("textarea");
  const button = document.createElement("button");
  const exitBtn = document.createElement("button");

  h3.innerText = "EXPORT SAVE";
  button.innerText = "Done";
  exitBtn.innerText = "Exit";

  promptBtnDiv.appendChild(button);
  promptBtnDiv.appendChild(exitBtn);
  textArea.classList.add("promptTextArea");
  button.classList.add("doneBtn");
  exitBtn.classList.add("exitBtn");
  promptBtnDiv.classList.add("promptBtnDiv");

  div.appendChild(h3);
  div.appendChild(textArea);
  div.append(promptBtnDiv);

  div.classList.add("prompt");
  div.id = "prompt";
  document.querySelector("body").append(div);

  exitBtn.addEventListener("click", exitButton);
  document.querySelector(".promptTextArea").innerText = objJsonB64;
};

const exitButton = () => {
  console.log("closing imports/exports");
  document.querySelector("#prompt").remove();

  showHideOptions();
};

const importSave = () => {};

let save = JSON.parse(localStorage.getItem("my")) || 0;

const setBool = () => {
  for (let i = 0; i < save[1].length; i++) {
    const upgrade = save[1][i];
    const keys = Object.keys(upgrade); // keys (variables) of the objects
    const values = Object.values(upgrade); // values of the variables

    keys.forEach((_, index) => {
      if (Array.isArray(values[index])) {
        values[index].forEach((item, i) => {
          values[index][i] = item === false ? 0 : 1;
        });
      } else if (_ == "name") {
        save[1][i].name = i;
      }
    });
  }
};

for (let i = 0; i < save.length; i++) {
  if (i == 1) {
    setBool();
  }
}

function jsonToBase64(object) {
  const json = JSON.stringify(object);
  return btoa(json);
}

let objJsonB64 = jsonToBase64(save);

// console.log(objJsonB64);

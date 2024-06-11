let mainToggle = true;

const showHideMain = () => {
  const optionsElement = document.querySelector("#options");
  const bgOpacity = document.querySelector(".windows");

  optionsElement.style.visibility = mainToggle ? "visible" : "hidden";
  bgOpacity.style.opacity = mainToggle ? "0.8" : "";

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

export const prompt = (index) => {
  const div = document.createElement("div");
  const promptBtnDiv = document.createElement("div");
  const h3 = document.createElement("h3");
  const textArea = document.createElement("textarea");
  const doBtn = document.createElement("button");
  const exitBtn = document.createElement("button");

  exitBtn.innerText = "Exit";

  promptBtnDiv.appendChild(doBtn);
  promptBtnDiv.appendChild(exitBtn);
  textArea.classList.add("promptTextArea");
  doBtn.classList.add("doBtn");
  exitBtn.classList.add("exitBtn");
  promptBtnDiv.classList.add("promptBtnDiv");

  div.appendChild(h3);
  div.appendChild(textArea);
  div.append(promptBtnDiv);

  div.classList.add("prompt");
  div.id = "prompt";
  document.querySelector("body").append(div);

  exitBtn.addEventListener("click", exitButton);

  switch (index) {
    case 1:
      getSave();
      exportSave();
      copyButton();
      break;
    case 2:
      importSave();
      break;
    case 3:
      h3.innerText = "SAVE TO FILE";
      console.log(index);
      break;
    case 4:
      h3.innerText = "IMPORT FROM FILE";
      console.log(index);
      break;
  }
};

// exp / imp -----------------------------------------------
const copyButton = () => {
  let copyBtn = document.querySelector(".promptTextArea");
  navigator.clipboard.writeText(copyBtn.value);
};

const exitButton = () => {
  document.querySelector("#prompt").remove();
};

const exportSave = () => {
  document.querySelector(".doBtn").innerText = "Copy";
  document.querySelector(".prompt > h3").innerText = "EXPORT SAVE";
  document.querySelector(".promptTextArea").innerText = jsonToBase64(save);
};

const importSave = () => {
  document.querySelector(".doBtn").innerText = "Done";
  document.querySelector(".prompt > h3").innerText = "IMPORT SAVE";
  document.querySelector(".doBtn").addEventListener("click", () => {
    const b64 = document.querySelector(".promptTextArea").value;

    try {
      const b64Decoded = JSON.parse(atob(b64));
      localStorage.setItem("my", JSON.stringify(b64Decoded));
      location.reload();
    } catch {
      document.querySelector(".promptTextArea").innerText = "Error: close and open";
    }
  });
};

// -------------------------------------

let save = JSON.parse(localStorage.getItem("my")) || 0;

const getSave = () => {
  save = JSON.parse(localStorage.getItem("my"));
  return jsonToBase64(save);
};

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

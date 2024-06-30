const colorPicker = document.querySelector(".colorPicker");
const sunMoonImg = document.querySelector(".colorPicker > img");
const tipsImg = document.querySelector(".tips > img");
const body = document.querySelector("body");

export const showColorPicker = () => {
  colorPicker.addEventListener("click", () => {
    body.classList.toggle("dark-theme");
    if (body.classList.contains("dark-theme")) {
      sunMoonImg.src = "./temp/dark-theme.svg";
      tipsImg.src = "./temp/tips-dark.svg";
    } else {
      sunMoonImg.src = "./temp/light-theme.svg";
      tipsImg.src = "./temp/tips-light.svg";
    }
  });
};

// const body = document.querySelector("body");

// function createColorPicker() {
//   showHideMain();
//   const div = document.createElement("div");
//   const h3 = document.createElement("h3");
//   const input = document.createElement("input");
//   const colorPickerBtn = document.createElement("div");
//   const doneBtn = document.createElement("button");

//   doneBtn.innerText = "Done";
//   input.type = "color";
//   input.value = "#ffffff";
//   h3.innerText = "PICK A COLOR";

//   doneBtn.classList.add("doneBtn");
//   div.classList.add("colorPickerWindow");
//   colorPickerBtn.classList.add("colorPickerBtn");
//   colorPickerBtn.appendChild(doneBtn);
//   div.appendChild(h3);
//   div.appendChild(input);
//   div.appendChild(colorPickerBtn);
//   document.querySelector("body").append(div);

//   input.addEventListener("change", setColor);
//   doneBtn.addEventListener("click", doneButton);
// }

// let mainToggle = true;
// export const showHideMain = () => {
//   const bgOpacity = document.querySelector(".windows");
//   bgOpacity.style.opacity = mainToggle ? "0.9" : "";
//   mainToggle = !mainToggle;
// };

// const doneButton = () => {
//   document.querySelector(".colorPickerWindow").remove();
//   showHideMain();
// };

// const setColor = () => {
//   console.log("chang");
//   const color = document.querySelector(".colorPickerWindow > input");
//   body.style.background = color.value;
// };

//title-bar
//color: #e8e6e3
//background: linear-gradient(to right, rgb(130, 130, 130), rgb(130, 130, 130, 0)); LIGHT
//background:linear-gradient(to right, rgb(95, 102, 106), rgba(95, 102, 106, 0)) DARK

//color: #e8e6e3
//bg-color: #3d4245
//border-color: #7c7366
//box-shadow: #080808 -1px -1px inset, #181a1b 1px 1px inset, #60686c -2px -2px inset, #2a2e2f 2px 2px inset;

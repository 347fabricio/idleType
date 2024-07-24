const darkLightTheme = document.querySelector(".darkLight");
const sunMoonImg = document.querySelector(".darkLight > img");
const tipsImg = document.querySelector(".tips > img");
const body = document.querySelector("body");

export const showColorPicker = () => {
  darkLightTheme.addEventListener("click", () => {
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

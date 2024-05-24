let toggle = true;

export const options = () =>
  document.querySelector(".save").addEventListener("click", () => {
    const optionsElement = document.querySelector("#options");
    const bgOpacity = document.querySelector("main");

    optionsElement.style.visibility = toggle ? "visible" : "hidden";
    bgOpacity.style.opacity = toggle ? "0.4" : "1";

    toggle = !toggle;
  });

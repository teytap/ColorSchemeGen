const colorForm = document.getElementById("color-form");
const colorInput = document.getElementById("color-input");
const modeInput = document.getElementById("mode-input");
const getColorsBtn = document.getElementById("get-colors-btn");
const colorsContainer = document.getElementById("colors-container");

let mode = modeInput.value;
let seedColor = colorInput.value.substring(1);

document.addEventListener("click", function (e) {
  if (e.target.dataset.color) {
    copyColor(e.target.dataset.color);
  }
});

colorInput.addEventListener("change", (e) => {
  seedColor = e.target.value.substring(1);
});
modeInput.addEventListener("change", (e) => {
  mode = e.target.value;
});

colorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  render();
});

function render() {
  let colorsHtml = "";
  fetch(`https://www.thecolorapi.com/scheme?hex=${seedColor}&mode=${mode}`)
    .then((response) => response.json())
    .then((data) => {
      const colors = data.colors;

      let hexColor = "";
      colors.map((color) => {
        hexColor = color.hex.value;

        colorsHtml += `<div><div class="color-block" style="background:${hexColor}"
         data-color="${hexColor}" >${hexColor}</div>
         <p class="color-hex name" style="color:${color.name.closest_named_hex}">${color.name.value}</p>
         </div>`;
      });
      colorsContainer.innerHTML = colorsHtml;
      document.querySelector("h1").style.color = hexColor;
    });
}

function copyColor(color) {
  navigator.clipboard.writeText(color);
  document.getElementById(
    "message"
  ).textContent = `Copied to clipboard color ${color}`;
  setTimeout(function () {
    document.getElementById("message").textContent = "";
  }, 3000);
}

render();

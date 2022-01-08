const SIZE = 800;
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = canvas.height = SIZE * devicePixelRatio;
ctx.scale(devicePixelRatio,devicePixelRatio)
ctx.translate(SIZE / 2, SIZE / 2);

const form = document.querySelector("form");
const tableInput = document.querySelector("input#table");
const modInput = document.querySelector("input#mod");
const tableIncInput = document.querySelector("input#table-inc");
const modIncInput = document.querySelector("input#mod-inc");
const intervalInput = document.querySelector("input#interval");
const submitButton = document.querySelector("input[type=\"submit\"]");
let intervalId = null;

function drawTable (n, mod) {
  ctx.beginPath();
  ctx.arc(0, 0, SIZE / 2, 0, 2*Math.PI);
  for (let i=0; i<mod; i++) {
    const res = i*n;
    ctx.moveTo(Math.cos(i * 2 * Math.PI / mod)*SIZE/2, Math.sin(i * 2 * Math.PI / mod)*SIZE/2)
    ctx.lineTo(Math.cos(res * 2 * Math.PI / mod)*SIZE/2, Math.sin(res * 2 * Math.PI / mod)*SIZE/2);
  }
  ctx.closePath();
}

function redraw (table, mod) {
  ctx.clearRect(-SIZE/2, -SIZE/2, SIZE, SIZE);
  drawTable(table, mod);
  ctx.stroke();
}

redraw(+tableInput.value, +modInput.value);

form.onchange = e => redraw(+tableInput.value, +modInput.value);
form.onreset = e => redraw(+tableInput.value, +modInput.value);

form.onsubmit = e => {
  e.preventDefault();
}

submitButton.onclick = () => {
  if (intervalId == null) {
    submitButton.value = "Stop"
    let table = +tableInput.value;
    let mod = +modInput.value;
    const tableInc = +tableIncInput.value;
    const modInc = +modIncInput.value;
    for (const element of form.elements) {
      if (element.type == "submit" || element.type == "fieldset") continue;
      element.disabled = true;
    }
    form.classList.add("disabled");
    intervalId = window.setInterval(() => {
      redraw(table += tableInc, mod += modInc);
      tableInput.value = table;
      modInput.value = mod;
    }, +intervalInput.value)
  } else {
    submitButton.value = "Lancer l'animation";
    for (const element of form.elements) {
      element.disabled = false;
    }
    form.classList.remove("disabled");
    window.clearInterval(intervalId);
    intervalId = null;
  }
}

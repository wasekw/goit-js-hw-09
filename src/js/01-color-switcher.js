function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const DELAY = 1000;
let intervalId = null;
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

refs.stopBtn.setAttribute("disabled", "disabled");
refs.startBtn.addEventListener('click', bodyChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

function bodyChangeColor() {
  // console.log("Есть клик!")
  intervalId = setInterval(()=> {
   refs.body.style.backgroundColor = getRandomHexColor();
   refs.startBtn.setAttribute("disabled", "disabled");
   refs.stopBtn.removeAttribute("disabled");
  }, DELAY)
};

function stopChangeColor() {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute("disabled");
  refs.stopBtn.setAttribute("disabled", "disabled");
}




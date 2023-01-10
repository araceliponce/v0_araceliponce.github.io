const body = document.querySelector('html');
const toggle = document.getElementById('toggle');

const allSvgs = document.querySelectorAll('main svg');

document.addEventListener('DOMContentLoaded', () => {

  console.log('dom loaded');
  allSvgs.forEach(svg => {

    let text = svg.querySelector('title').textContent;

    svg.insertAdjacentHTML('afterend', `<small>${text}</small>`)
  })
})




/* toggle.addEventListener("click", () => {
  const bodyCheck = body.classList.contains('dark');
  if (bodyCheck) {
    body.className = ''
  } else {
    body.className = "dark"
  }
}) */



let hasUsedDarkMode = localStorage.getItem("hasUsedDarkMode");
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)'); //>true 

if (hasUsedDarkMode == null && prefersDarkMode) {
  addDarkMode();
}
if (hasUsedDarkMode == "true") {
  addDarkMode();
}

toggle.addEventListener("click", () => {
  hasUsedDarkMode = localStorage.getItem("hasUsedDarkMode");
  if (hasUsedDarkMode == "true") {
    removeDarkMode();
  } else {
    addDarkMode();
  }
});

function addDarkMode() {
  hasUsedDarkMode = localStorage.setItem("hasUsedDarkMode", "true");
  body.classList.add("dark");

  toggle.dataset.state = 'dark'
}

function removeDarkMode() {
  hasUsedDarkMode = localStorage.setItem("hasUsedDarkMode", "false");
  body.classList.remove("dark");

  toggle.dataset.state = 'light'
}

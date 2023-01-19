const page = document.documentElement;
const toggle = document.getElementById('toggle');
const mainSvgs = document.querySelectorAll('.tools svg');

const { matches: motionOK } = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
)

/* code from https://web.dev/building-split-text-animations/ 
found after seeing this https://codepen.io/alvarotrigo/pen/bGrXmwM  */
const byLetter = text =>
  [...text].map(span)

const byWord = text =>
  text.split(' ').map(span)

const span = (text, index) => {
  const node = document.createElement('span')

  node.textContent = text
  node.style.setProperty('--i', index) //the property i is equal to index, is not a string '--i:x'
  node.className = '--i:', index
  node.setAttribute('aria-hidden', true); //a11y https://css-irl.info/how-to-accessibly-split-text/

  return node
}

if (motionOK) {
  // document split manipulations
  console.log('motion is ok')

  const splitTargets = document.querySelectorAll('[split-by]');
  splitTargets.forEach(node => {
    const type = node.getAttribute('split-by')
    let nodes = null

    if (type === 'letter') {
      nodes = byLetter(node.innerText)
    }
    else if (type === 'word') {
      nodes = byWord(node.innerText)
    }

    if (nodes) {
      node.firstChild.replaceWith(...nodes)
    }
  })
}









document.addEventListener('DOMContentLoaded', () => {

  console.log('dom loaded');

  //agregamos spans de texto a los svgs, y clases tambien
  mainSvgs.forEach(svg => {

    let text = svg.querySelector('title').textContent;

    svg.insertAdjacentHTML('afterend', `<small>${text}</small>`)
    svg.classList.add(text.toLowerCase());
  })
})






toggle.addEventListener("click", () => {
  console.log('click')
  if (page.dataset.dark == 'true') {
    page.dataset.dark = 'false'
  } else {
    page.dataset.dark = 'true'
  }

  hasUsedDarkMode = localStorage.setItem("hasUsedDarkMode", page.dataset.dark);
});

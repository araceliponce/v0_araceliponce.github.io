var isMobile = navigator.userAgent &&
  navigator.userAgent.toLowerCase().indexOf('mobile') >= 0;
var isSmall = window.innerWidth < 1000;
const page = document.documentElement;
const mainSvgs = document.querySelectorAll('.tools svg');


//toggles
const themeToggle = document.getElementById('themeToggle');

const animationToggle = document.getElementById("animationToggle");

// const directionToggle = document.getElementById("directionToggle");
const hero = document.querySelector('.hero');
const marquees = document.querySelectorAll(".marquee");
const wrapper = document.querySelector(".wrapper");

/* const { matches: motionOK } = window.matchMedia(
  '(prefers-reduced-motion: no-preference)'
) */


/* This is to test if the person can use javascript, if not, the buttons will stay hidden */
const allHiddenBtns = document.querySelectorAll('button[hidden]');
// console.log(allHiddenBtns);
allHiddenBtns.forEach(btn => {
  btn.removeAttribute('hidden');
})


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

var isOkWithMotion = window.matchMedia('(prefers-reduced-motion: no-preference)')['matches'];

var hasBeenOkWithMotion = localStorage.getItem('hasBeenOkWithMotion');

if (hasBeenOkWithMotion) {
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



// Adds small text after every svg (text is from the svg from <title>)
// text have classes too: .wordstogether

document.addEventListener('DOMContentLoaded', () => {

  // console.log('starting to add texts to svgs');

  mainSvgs.forEach(svg => {
    let text = svg.querySelector('title').textContent;
    // console.log(text)

    svg.insertAdjacentHTML('afterend', `<small>${text}</small>`)
    svg.classList.add(text.replace(' ', '').toLowerCase());
  })
})





//TOGGLES ...10


themeToggle.addEventListener("click", () => {
  console.log('changed themes :D');

  if (page.dataset.dark == 'true') {
    page.dataset.dark = 'false';
  } else {
    page.dataset.dark = 'true';
  }
  //set the local storage item to the same value of data-dark of html/body
  hasUsedDarkMode = localStorage.setItem("hasUsedDarkMode", page.dataset.dark);

});


/* To toggle vertical/horizontal .hero*/



/* directionToggle.addEventListener("click", () => {
  hero.classList.toggle('flex-row');
  directionToggle.classList.toggle("toggle--vertical");
  wrapper.classList.toggle("wrapper--vertical");
  [...marquees].forEach((marquee) =>
    marquee.classList.toggle("marquee--vertical")
  );
}); */




animationToggle.addEventListener('click', () => {

  document.documentElement.dataset.motion === 'true' ? pauseAnimations() : playAnimations();

  console.log(localStorage.getItem('hasBeenOkWithMotion'))
  console.log(document.documentElement.dataset);

});


function playAnimations() {
  // animationToggle.innerText = 'animations on'
  animationToggle.setAttribute('aria-checked', 'true')

  localStorage.setItem("hasBeenOkWithMotion", 'true');
  document.documentElement.dataset.motion = 'true';
}

function pauseAnimations() {
  // animationToggle.innerText = 'animations off'
  animationToggle.setAttribute('aria-checked', 'false')
  // document.body.style.setProperty('--playState', 'paused');
  /* document.body.style.setProperty('--cursorHPosition', '50%')
  document.body.style.setProperty('--cursorVPosition', '50%') */

  localStorage.setItem("hasBeenOkWithMotion", 'false');
  document.documentElement.dataset.motion = 'false';
}




/* To change center of radial gradient on mousemove if motion is ok. it works but not*/

/* document.documentElement.addEventListener('mousemove', (e) => {

  if (document.documentElement.dataset.motion == 'true') {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    mouseXpercentage = Math.round(e.pageX / windowWidth * 100);
    mouseYpercentage = Math.round(e.pageY / windowHeight * 100);

    document.body.style.setProperty('--cursorHPosition', mouseXpercentage + '%')
    document.body.style.setProperty('--cursorVPosition', mouseYpercentage + '%')

  }
  else {
    return
  }
});

 */


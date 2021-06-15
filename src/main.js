'use strict';
const body = document.querySelector('body');
let timer = 0;
window.addEventListener('scroll', () => handleScroll(), true);

function handleScroll() {
    if (body.classList.contains("on-scrollbar") === false) {
        clearTimeout(timer);
        body.classList.add("on-scrollbar");
    }
    else if (body.classList.contains("on-scrollbar") === true) {
        clearTimeout(timer);
        timer = setTimeout(()=>body.classList.remove('on-scrollbar'),1800);
    }
}






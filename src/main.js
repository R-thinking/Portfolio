'use strict';
// Global
const body = document.querySelector('body');
let timer = 0;

// Main
{
    displayNavbar();
    window.addEventListener('scroll', () => handleScroll(), true);
}

// Function Declaration

// Scroll Handling
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

// Make navbar transparent when it is on the top.
//(display background color only when user scrolls more than nav height)
function displayNavbar() {
    const navbar = document.querySelector('#navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;
    
    document.addEventListener('scroll',onscroll,{passive:true});
    function onscroll() {
            const clientHeight = window.scrollY;
            if(clientHeight>navbarHeight){
                navbar.classList.add('navbar--display');
            }
            else{
                navbar.classList.remove('navbar--display');
            }
    }
}





'use strict';
// Global
const body = document.querySelector('body');
let timer = 0;

// Main
{
    window.addEventListener('scroll', () => handleScroll(), true);
    scrollToSection();
    handleBtn();
    displayNavbar();
    fadeOutHome();
    homeLink();
    filterProjects();
    toggleNavbarMenu();

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
        timer = setTimeout(()=>{
            body.classList.remove('on-scrollbar')
        },1800);
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
            const clientWidth = document.body.clientWidth;
            
            if(clientWidth<= 768){
                return;
            }

            if(clientHeight>navbarHeight){
                navbar.classList.add('navbar--display');
            }
            else{
                navbar.classList.remove('navbar--display');
            }
    }
}

// Scroll to target sections when tapping on the navbar menu.
function scrollToSection() {
    // Local Variables
    const navbarBtn = document.querySelector('.navbar__menu');
    const contactBtn = document.querySelector('.home__contact');

    // Eventlisteners
    navbarBtn.addEventListener('click',e =>onclick(e)); 
    contactBtn.addEventListener('click',e =>onclick(e));

    // Local functions.
    // scrolling onclick function.
    function onclick(event){
        const dataset =event.target.dataset;
        const link = dataset.link;
        // const winY = window.pageYOffset;
        if(link==null){
            return;
        }
        else {
            const scrollTo = document.querySelector(link);
            const scrollIntoViewOptions = {
                behavior: "smooth"
                ,block: "start"
                ,inline: "start"
            }
            // const target = document.querySelector(link);
            // const targetTop =target.getBoundingClientRect().top;
            // window.scrollTo(0, winY + targetTop);
            scrollTo.scrollIntoView(scrollIntoViewOptions);
        }
    }
}

// Make contents in home container fade out according to scrolling.
function fadeOutHome(){
    const home = document.querySelector('.home__container');
    const homeHeight = home.getBoundingClientRect().height;
    document.addEventListener('scroll',()=> {
        const scrY = window.scrollY;
        home.style.opacity = 1 - scrY/homeHeight;
    });
}

// Make a button to make a move to home.
function homeLink() {
    const homeLink = document.querySelector('.home__link');
    const navbar = document.querySelector('#navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;
    const home = document.querySelector('#home');
    const scrollIntoViewOptions = {
        behavior: "smooth"
        ,block: "start"
        ,inline: "start"
    }

    // Display home link button.
    document.addEventListener('scroll',() =>{
        if(window.scrollY>navbarHeight){
            if(!(homeLink.classList.contains('active'))){
                homeLink.classList.add('active');
            }
        }
        else {
            if((homeLink.classList.contains('active'))){
                homeLink.classList.remove('active');
            }
        }
    });

    // Scroll to home when button is clicked.
    homeLink.addEventListener('click',() => {
        home.scrollIntoView(scrollIntoViewOptions);
    });
}

function filterProjects() {
    const categoryBtn = document.querySelector('.work__categories');
    const container = document.querySelector('.work__projects');
    const projects = document.querySelectorAll('.project');
    
    categoryBtn.addEventListener('click',(event) =>{
        const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
        if(filter==null){
            return 0;
        }
        else {
            container.classList.add('fadeOut');
            setTimeout(() =>{
                projects.forEach((project) => {
                    if(filter==="all" || filter === project.dataset.type){
                        project.classList.add('invisible');
                        setTimeout(() => {
                            project.classList.remove('invisible');
                        },20);
                    }
                    else {
                        project.classList.add('invisible');
                    }
                });
                container.classList.remove('fadeOut');
            }, 450);
        }
    });
}

function handleBtn(){
    // Local variables
    const navbarMenu =document.querySelector('.navbar__menu');
    const category = document.querySelector('.work__categories');

    // Listener
    navbarMenu.addEventListener('click',e => onclick1(e));
    category.addEventListener('click',e => onclick2(e));
    
    // Local functions

    // onclick function when clicking on navbar menu.
    function onclick1(event) {
        const selected = document.querySelector('.navbar__menu__item.active');
        const clientWidth = document.body.clientWidth;
        const screenFence = document.querySelector('.screen__fence');

        if(event.target.className != 'navbar__menu__item'){
            return;
        }
        event.target.classList.add('active');

        if(selected === null){return;}
        selected.classList.remove('active'); 

        if(clientWidth>768){return;}
        navbarMenu.classList.remove('display');
        screenFence.classList.remove('display');
    }

    // onclick function when clicking on work category button.
    function onclick2(event) {
        const selected = document.querySelector('.category__btn.active');
        const active = 
        event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
        
        if(active.className != 'category__btn'){
            return;
        }
        active.classList.add('active');

        if(selected ===null){return;}
        selected.classList.remove('active');
    }
}


function toggleNavbarMenu() {
    const toggleBtn = document.querySelector('.navbar__toggleBtn');
    const navMenu = document.querySelector('.navbar__menu');
    const screenFence = document.querySelector('.screen__fence');

    toggleBtn.addEventListener('click',ontoggle);

    function ontoggle(){
        navMenu.classList.toggle('display');
        
        if(!(navMenu.classList.contains('display'))){
            screenFence.classList.remove('display');
        }
        else {
            screenFence.classList.add('display');
        }
        return;
    }
}
/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.querySelector('#nav_menu');
const navToggle = document.querySelector('#nav_toggle'); 
const navClose = document.querySelector('#nav_close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle){
  navToggle.addEventListener('click', () => {
    navMenu.classList.add('show-menu');
  });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose){
  navClose.addEventListener('click', () => {
    navMenu.classList.remove('show-menu');
  });
}


/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav_link')

function linkAction(){
    const navMenu = document.getElementById('nav_menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContect = document.querySelectorAll('.skills_content');
const skillsTitle = document.querySelectorAll('.skills_header');

function toggleSkills(){
  const item = this.parentNode.className;
  const close = 'skills_content skills-close';
  console.log(item);
  skillsContect.forEach((x,i) => skillsContect[i].className = close);
  if (item === close) {
    this.parentNode.className = 'skills_content skills-open' 
  }
}
skillsTitle.forEach(el=>  el.addEventListener('click', toggleSkills))
/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll('[data-target]');
const tabContents = document.querySelectorAll('[data-content]');
tabs.forEach( tab => tab.addEventListener('click', () => {
  const target = document.querySelector(tab.dataset.target)
  console.log(target);
  tabContents.forEach(tabContent => tabContent.classList.remove('qualification_active'))
  target.classList.add('qualification_active')
  tabs.forEach(tab=> tab.classList.remove('qualification_active'))
  tab.classList.add('qualification_active')
}))

/*==================== SERVICES MODAL ====================*/


/*==================== PORTFOLIO SWIPER  ====================*/
const swiper = new Swiper(".portfolio_container", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  
});
/*==================== TESTIMONIAL ====================*/
const swiperTestimonial = new Swiper(".testimonial_container", {
  // cssMode: true,
  loop: true,
  grabCursor: true,
  spaceBetween: 48,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  // breakpoints: {
  //   568: {
  //     slidesPerView: 2,
  //   },
  // }
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')
function scrollActive(){
  const scrollY = window.pageYOffset
  sections.forEach(current =>{
      const sectionHeight = current.offsetHeight
      const sectionTop = current.offsetTop - 50;
      const sectionId = current.getAttribute('id')
      const doc = document.querySelector('.nav_menu a[href*=' + sectionId + ']')
      if (doc){
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
          doc.classList.add('active-link')
        }else{
          doc.classList.remove('active-link')
        }
      }
  })
}
window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
  const nav = document.getElementById('header')
  // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
  if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/ 
function scrollUp(){
  const scrollUp = document.getElementById('scroll-up');
  // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
  if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme_btn')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
});

// let isFormInputsValid = false;

// function validateEmail(email) {
//   var pattern = new RegExp('^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$');
//   return pattern.test(email);
// }

// document.querySelector('.contact_form').addEventListener('input', ({ target }) => {
//   if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
//     const inputs = Array.from(document.querySelectorAll('.contact_input'));
//     if (inputs.every( input => !!input.value.length)){
//       if ((inputs[1].id === 'email' && validateEmail(inputs[1].value))){
//         isFormInputsValid = true;
//         recaptchaBtn.disabled = false;
//         recaptchaBtn.classList.remove('disabled');
//       } else {
//         isFormInputsValid = false
//         recaptchaBtn.disabled = true;
//         recaptchaBtn.classList.add('disabled');
//       }
//     }
//   }
// });

// handle submit and recaptcha requests

// const recaptchaBtn = document.querySelector('.g-recaptcha');

// recaptchaBtn.addEventListener('click', e => {
//   grecaptcha.ready(() =>{
//     grecaptcha.execute('6Ldcr2kmAAAAAFHGwOZPWQywIihzSEuDIwEyg7NF', {action: 'submit'}).then((token) => {
//         console.log({token});
//         let xhr = new XMLHttpRequest();
//         xhr.open('POST', `/send-message`);
//         xhr.send({ token, });
//     });
//   });
// });
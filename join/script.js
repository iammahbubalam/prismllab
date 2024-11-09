const mobileToggle = document.querySelector('.mobile-toggle');
const sideNav = document.querySelector('.side-nav');

let isNavOpen = false;

mobileToggle.addEventListener('click', () => {
  isNavOpen = !isNavOpen;
  sideNav.classList.toggle('show', isNavOpen);
});
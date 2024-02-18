function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

let isOpen = true; // initialize isOpen to true outside the function

function toggleMenu() {
  const menu = document.getElementsByClassName('bar')[0];

  isOpen = !isOpen; // toggle the value of isOpen using the not operator

  // set the display property based on the value of isOpen
  menu.style.display = isOpen ? 'block' : 'none';
}

function delayedAppear() {
  const elements = document.querySelectorAll('.delayed-appear');
  elements.forEach((el) => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        setTimeout(() => {
          el.classList.add('show');
        }, 250);
      } else {
        el.classList.remove('show');
      }
    });
  });
}
delayedAppear();

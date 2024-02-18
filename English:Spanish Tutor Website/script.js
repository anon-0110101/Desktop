function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function toggleMenu() {
  const isOpen = true
  const menu = document.getElementsByClassName('bar')[0]

  console.log(menu.style)
  if (isOpen) {
    menu.style.display = 'none'
    isOpen = false
  } else {
    menu.style.display = 'block'
  
  }

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

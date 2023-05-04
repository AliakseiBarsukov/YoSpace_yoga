const menuBtn = document.querySelector('.menu');
const menuIconWrapper = document.querySelector('.menu-icon-wrapper');
const menuIcon = document.querySelector('.menu-icon');
const menu = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const navItem = document.querySelectorAll('.nav__item');

// scroll  

const scrollController = {
  scrollPosition: 0,
  disabledScroll() {
    scrollController.scrollPosition = window.scrollY
    document.body.style.cssText = `
    overflow: hidden;
    position: fixed;
    top: -${scrollController.scrollPosition}px;
    left: 0;
    height: 100vh;
    width: 100vw;
    padding: ${window.innerWidth - document.body.offsetWidth}px;
    `;
    document.documentElement.style.scrollBehavior = 'unset';
  },
  enabledScroll() {
    document.body.style.cssText = '';
    window.scroll({top: scrollController.scrollPosition});
    document.documentElement.style.scrollBehavior = '';
  },

}

// mobile menu

const menuOpen = () => {
  menuBtn.addEventListener('click', () => {
    menuIcon.classList.toggle('menu-icon-active');
    menu.classList.toggle('nav-open');
    overlay.classList.toggle('overlay-active');
    document.body.classList.toggle('nav-open');
  })
}

navItem.forEach((item) => {
  item.addEventListener('click', () => {
    menuIcon.classList.toggle('menu-icon-active');
    menu.classList.toggle('nav-open');
    overlay.classList.remove('overlay-active');
    document.body.classList.toggle('nav-open');
  })
})

const menuClose = () => {
  overlay.addEventListener('click', (event) => {
    const target = event.target;

    if (target === overlay || target === menuBtn) {
      menuIcon.classList.remove('menu-icon-active');
      menu.classList.remove('nav-open');
      overlay.classList.remove('overlay-active');
      scrollController.enabledScroll();
    }
  })
}

menuOpen();
menuClose();

// modal

const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
      ) {
      
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
        scrollController.enabledScroll();

      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal);
    scrollController.disabledScroll();
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.modal1',
  btnOpen: '.section__button1',
  btnClose: '.modal__close',
});

modalController({
  modal: '.modal2',
  btnOpen: '.section__button2',
  btnClose: '.modal__close'
});
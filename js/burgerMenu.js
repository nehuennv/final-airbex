const menuTrigger = document.querySelector('.hamburguer');


const menuContainer = document.getElementsByClassName('menuContainer')[0]

const onClickMenuTrigger = e => {

  e.preventDefault();

  if (e.currentTarget.classList.contains('active')) {
    e.currentTarget.classList.remove('active');
  } else {
    e.currentTarget.classList.add('active');
  }
}

// Init
const init = () => {
  menuTrigger.addEventListener('click', onClickMenuTrigger, false);
};

document.addEventListener('DOMContentLoaded', init);

menuTrigger.addEventListener("click", ()=> {
  menuContainer.classList.toggle('showMenu')


})

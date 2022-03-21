const closeLogin = document.getElementById('butCloseLog')
const openLogin = document.getElementsByClassName('buttonCreate')
const body = document.getElementsByTagName('body')[0]

const containerLogin= document.getElementsByClassName('loginContainer')[0]



for (const create of openLogin){
    create.addEventListener('click', () => {
        containerLogin.classList.add('loginShow')
        body.classList.add('noScroll')
    });
}

closeLogin?.addEventListener('click', () => {
    containerLogin.classList.remove('loginShow')
    body.classList.remove('noScroll')
});



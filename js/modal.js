const open = document.querySelectorAll('.openFavorites')
// const openMobile = document.querySelectorAll('.openFavorites')
const close = document.getElementById('closeModal')

let backgroundModal = document.querySelector('.backgroundReserveFinished')


const modalContainer = document.getElementsByClassName('modalContainer')[0]
const modal = document.getElementsByClassName('modal')

let favsMobile = document.querySelector(".favsMobile")
favsMobile.addEventListener("click", ()=>{
    menuTrigger.click()
})


for(const opener of open){
    opener.addEventListener('click', () => {
        let accessYESorNO = localStorage.getItem('accessYN')
        const body = document.getElementsByTagName('body')[0] 
        if(accessYESorNO == 'false'){
            Toastify({
                text: "You are not logged in.",
                className:"floatDuplicate",
                gravity: "bottom",
                position:"center",
                style: {
                    background: "#DF1878",
                    color: "#fff",
                    borderRadius:"10px",
                    boxShadow : "0px 0px 20px 0px #DF1878",
                    fontWeight: "500"
                }
        
            }).showToast(); }
            else{
                modalContainer.classList.toggle('show')
                backgroundModal.classList.toggle("showBackgroundReserveFinished")
                body.classList.toggle('noScroll')
    
              }
    });
    

    
}
close.addEventListener('click', () => {
    modalContainer.classList.remove('show')
    backgroundModal.classList.remove("showBackgroundReserveFinished")
    body.classList.remove('noScroll')

});





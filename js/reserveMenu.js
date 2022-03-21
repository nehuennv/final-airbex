let exitMyReserves = document.querySelector("#exitMyReserves")
let calendaryButton = document.querySelectorAll(".calendary")
let reservesContainer = document.querySelector(".myReserves")

let calendaryMobile = document.querySelector(".calendaryMobile")
calendaryMobile.addEventListener("click", ()=>{
    menuTrigger.click()
})

for(const openRes of calendaryButton){

    openRes.addEventListener("click", ()=>{
        let accessYESorNO = localStorage.getItem('accessYN')    
        if(accessYESorNO != 'false'){
            reservesContainer.classList.toggle("showReserveMenu")
            body.classList.toggle("noScroll")
        }else{
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
    
    })
}

exitMyReserves.addEventListener("click", ()=>{
    reservesContainer.classList.remove("showReserveMenu")
    body.classList.remove("noScroll")
})


const loginInHome = document.querySelector(".loginFlights")  
let accessYESorNO = localStorage.getItem('accessYN')

if(accessYESorNO != 'false'){
    const userLoged = document.querySelector('.userLoged')
    userLoged.classList.toggle('userUnlock')
}
if(accessYESorNO != 'false'){

    const userHover = document.querySelector(".hoverUser")
    const nameHover = document.querySelector("#nameUser")
    const userLoged = document.querySelector(".userLoged")  
    
    const userMobile = document.querySelector(".nameUserMobile")
    const buttonMobileName = document.querySelector(".buttonMobileName")  

    let nameUserLS = JSON.parse(localStorage.getItem('userLS')) || 'no existe'

    const openLogin = document.getElementsByClassName('buttonCreate')

    userLoged.classList.add('userUnlock')
    buttonMobileName.classList.add('showButtonMobile')


    nameHover.innerText = ` ${nameUserLS[0]?.name} `

    userMobile.innerText = ` ${nameUserLS[0]?.name} `
    userMobile.classList.add('showNameMobile')


    userLoged.addEventListener("mouseover", () => {
         userHover.classList.add('showHover')
 
    })
    userLoged.addEventListener("mouseout", () => {
         userHover.classList.remove('showHover')
 
    })
    }
    
    loginInHome.addEventListener("click", ()=>{
        
        Toastify({
            text: 'You must log in from the "Home" section',
            className:"floatDuplicate",
            gravity: "bottom",
            position:"center",
            style: {
                background: "#DF1878",
                color: "#fff",
                borderRadius:"10px",
                boxShadow : "0px 0px 20px 0px #DF1878",
                fontWeight: "500",
                zIndex: "999"
            }
    
          }).showToast(); 
    })
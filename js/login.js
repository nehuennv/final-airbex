
let userLocal = []


let regSubmit = document.getElementById('submitReg')

const userHover = document.querySelector(".hoverUser")
const nameHover = document.querySelector("#nameUser")
const userLoged = document.querySelector(".userLoged")  


const userMobile = document.querySelector(".nameUserMobile")
const buttonMobileName = document.querySelector(".buttonMobileName")  



let accessYESorNO = localStorage.getItem('accessYN')

if(accessYESorNO != 'false'){

    let nameUserLS = JSON.parse(localStorage.getItem('userLS')) || 'no existe'

    const openLogin = document.getElementsByClassName('buttonCreate')
    const userLoged = document.getElementsByClassName('userLoged')[0]
    const titleHero = document.getElementById('titleHero')
    const textHero = document.getElementById('textHero')
    

    for (const create of openLogin){

                create.classList.toggle('deleteButton')
    
        };

    userLoged.classList.toggle('userUnlock')

    buttonMobileName.classList.toggle('showButtonMobile')

    titleHero.innerText = heroTitle
    textHero.innerText = heroText 

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



//forms
let logInForm = document.getElementsByClassName('formLogIn')[0]
let registerForm = document.getElementsByClassName('formLogIn')[1]

//restart scroll
let signUpContainer = document.getElementById('signUp')


registerForm?.addEventListener('submit', validateForm);

class User{
    constructor(name, pass, email, phone) {
        this.name=name
        this.pass=pass
        this.email=email
        this.phone=phone
    }
}

   function validateForm (e){
    e.preventDefault();
       let regName = document.getElementById('regName').value;
       let regNumber = document.getElementById('regNumber').value;
       let regDate = document.getElementById('regDate').value;
       let regEmail = document.getElementById('regEmail').value;
       let regPass = document.getElementById('regPass').value;
       let regConfirmPass = document.getElementById('regConfirmPass').value;
       

        if (regPass != regConfirmPass ){
            Toastify({
                text: "Passwords do not match.",
                className:"floatDuplicate",
                gravity: "bottom",
                position:"center",
                style: {
                    background: "#DF1878",
                    color: "#fff",
                    borderRadius:"10px",
                    boxShadow : "0px 0px 20px 0px #DF1878",
                    fontWeight: "500",

                }
    
              }).showToast();   
    
        }else if(regPass.length < 8){
            Toastify({
                text: "The password must have more than 8 digits.",
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
    
              }).showToast();   
        }else{

            userLocal.push(new User(regName, regPass, regEmail, regNumber, regDate))

            localStorage.setItem('userLS', JSON.stringify(userLocal))
            
            Toastify({
                text: "Registered Successfully!",
                className:"floatDuplicate",
                gravity: "bottom",
                position:"center",
                style: {
                    background: "#fff",
                    color: "#3A4550",
                    borderRadius:"10px",
                    boxShadow : "0px 0px 20px 0px #fff",
                    fontWeight: "500"
                }
    
              }).showToast();  
            document.getElementById('regName').value=''
            document.getElementById('regNumber').value=''
            document.getElementById('regDate').value=''
            document.getElementById('regEmail').value=''
            document.getElementById('regPass').value=''
            document.getElementById('regConfirmPass').value=''

            signUpContainer.scrollTop = 0;

            let nameUserLS = JSON.parse(localStorage.getItem('userLS')) || 'no existe'

            nameHover.innerText = ` ${nameUserLS[0]?.name} `

            userLoged.addEventListener("mouseover", () => {
                 userHover.classList.add('showHover')
         
            })
            userLoged.addEventListener("mouseout", () => {
                 userHover.classList.remove('showHover')
         
            })
        }

   }



   logInForm?.addEventListener('submit', validateLogIn);

   function validateLogIn(e){
   e.preventDefault();
   let emailLogIn = document.getElementById('emailLogin').value
   let passLogIn = document.getElementById('passLogin').value
   let validation = validateUser(emailLogIn, passLogIn)

    let recoveredData = JSON.parse(localStorage.getItem('userLS'))

   if (validation){

        if((recoveredData[0]?.email == emailLogIn && recoveredData[0]?.pass == passLogIn)){
            const accessT = true

            const body = document.getElementsByTagName('body')[0]
            body.classList.remove('noScroll')   

            const containerLogin= document.getElementsByClassName('loginContainer')[0]
            containerLogin.classList.toggle('loginShow')

            for (const create of openLogin){
                create.classList.toggle('deleteButton') 
                };

            const userLoged = document.getElementsByClassName('userLoged')[0]
            userLoged.classList.toggle('userUnlock')

            const titleHero = document.getElementById('titleHero')
            const textHero = document.getElementById('textHero')

            titleHero.innerText = heroTitle
            textHero.innerText = heroText

            localStorage.setItem('accessYN', accessT)

            userMobile.innerText = ` ${userLocal[0].name} `
            userMobile.classList.add('showNameMobile')

            Toastify({
                text: "Welcome " + userLocal[0].name,
                className:"floatDuplicate",
                gravity: "bottom",
                position:"center",
                style: {
                    background: "#01FFC2",
                    color: "#3A4550",
                    borderRadius:"10px",
                    boxShadow : "0px 0px 20px 0px #01FFC2",
                    fontWeight: "500",
                    textTransform : "capitalize"
                }
        
              }).showToast(); 
 
        }else{

    
            Toastify({
            text: "Wrong username or password.",
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
    
          }).showToast();  
        }
    }else {


        Toastify({
        text: "You must enter your data.",
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

      }).showToast();  
    
   }
   }



   function validateUser(name, pass){
    if(name == "" || pass == ""){
        return false
    }else{
        return true
    }
}
if(JSON.parse(localStorage.getItem('userLS'))){

    let accessF = true
    localStorage.setItem('accessYN', accessF)

}else{

    let accessF = false
    localStorage.setItem('accessYN', accessF)
}



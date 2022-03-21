const auth = "563492ad6f91700001000001dda3472c7c2b4eddad776ae06fadf211"
let favorites = []
flightsStock = [ ]

let favsLS = JSON.parse(localStorage.getItem("favs"))

function viewFavs(){
  let addFavoritesModal = document.querySelector(".addFavoritesModal")

if(favsLS.length == 0){
  addFavoritesModal.innerHTML = `
        <p>You haven't added anything to favorites yet!</p>
  `
}else{
  addFavoritesModal.innerHTML = ` `
}
}

viewFavs()

let userReserves = []
let allReserves = JSON.parse(localStorage.getItem('reserve')) || []
    for(const res of allReserves){
      userReserves.push(res)
      let myResContainer = document.querySelector(".reserves")
      let divReserve = document.createElement("div")
      divReserve.className = "optionReserve"
      divReserve.innerHTML = `
      <div class="destination">
      <p>Destination: <br><strong>${res.destination}</strong></p>
    </div>
    <div class="classReserve">
      <p>Passengers: <br><strong>${res.passeng} Persons</strong></p>
    </div>
    <div class="deaparture">
      <p>Deaparture: <br><strong>${res.deaperture}</strong></p>
    </div>
      `
      myResContainer.appendChild(divReserve)
}


  

  let reserveLS = JSON.parse(localStorage.getItem('reserve')) || []

  let myReservesTitle = document.querySelector("#myReservesTitle")

  if(reserveLS.length == 0){
    myReservesTitle.innerText = "You haven't made your reservation yet, what are you waiting for!"
    myReservesTitle.style.opacity="50%";
  }

let optionFavorite = document.getElementsByClassName('optionFavorite')[0]

dataLS = JSON.parse(localStorage.getItem('data')) || []

dataLS.forEach(item => {
    flightsStock.push(item)
    
})

class Reserve{
  constructor(destination, passeng, deaperture) {
      this.destination = destination
      this.passeng = passeng
      this.deaperture = deaperture
  }
}




function crearCards(array){
    cardSection.innerHTML = "";
    array.forEach(el =>{
        const {img,nombre,nombre2,precio,id} = el
        let div = document.createElement('div')
        div.className = 'meCard'
        div.innerHTML = `
                <a id= "card${id}">
                <div class="cardName" style="background-image:url(${img}) ;">
                    <p><strong>${nombre}</strong>${nombre2}</p>
                </div>
                </a>
                <div class="cardPrice">
                    <p>Form <strong>$${precio}</strong></p>
                    <button id= "buttonFav${id}" >
                        <img src="../assets/svg/icons/heart_outline.svg" alt="">
                    <button>
            </div>

    `
    
    cardSection.appendChild(div)

    let nameVM = document.getElementById(`card${id}`)
    nameVM.addEventListener("click", () => {
        viewMore(el.id)
      
    })
    
    let accessYESorNO = localStorage.getItem('accessYN')

    let btnFav = document.getElementById(`buttonFav${id}`)



    btnFav.addEventListener('click', () =>{
        addToFavs(el.id)


        if(accessYESorNO != 'false'){
          btnFav.classList.toggle("liked")
        }
    })

    let accesso = localStorage.getItem('accessYN')

if (accesso != 'false'){

        for(const fav of favsLS){

          let btnLiked = document.querySelector("#buttonFav" + fav.id)
          btnLiked?.classList.add("liked")
         }
      
}
    })
}


function viewMore(id){
    let arrayVM =  flightsStock.find(element => element.id == id)
    const modalViewMoreBackground = document.querySelector(".modalViewMoreBackground")
    const header = document.querySelector(".header")
    header.classList.add("changeHeader")
    body.classList.add('noScroll')
    curatedPhotos(arrayVM.nombre)
    let imageSlider = []


    modalViewMoreBackground.innerHTML= ``

    async function curatedPhotos(search){
      const data = await fetch(
          `https://api.pexels.com/v1/search?query=${search}`,
          {
              method: "GET",
              headers: {
                  Accept: "application.json",
                  Authorization: auth,
              },
            }
          );
          const result = await data.json();
          let resPhoto = result.photos
          
          for(let i = 0 ; i < 4 ; i++){
              imageSlider.push(resPhoto[i].src.large2x)
            }

           

    modalViewMoreBackground.innerHTML= `
    <div class="modalViewMore">
    <div class="exitModalView">
      <button id="exitModalVM">
        <img  src="./assets/svg/icons/arrowTop.svg" alt="">
      </button>
    </div>
  <div class="modalContent">
    <div class="modalName">
      <p><strong>${arrayVM.nombre}</strong>${arrayVM.nombre2}</p>
    </div>
    <div class="containerData">
      <div class="containerSlider">
        <div class="slider" id="slider">
          <div class="sliderSection">
            <img src="${imageSlider[0]}" alt="" class="sliderImg">
          </div>
          <div class="sliderSection">
            <img src=${imageSlider[1]} alt="" class="sliderImg">
          </div>
          <div class="sliderSection">
            <img src="${imageSlider[2]}" alt="" class="sliderImg">
          </div>
          <div class="sliderSection">
            <img src="${imageSlider[3]}" alt="" class="sliderImg">
          </div>
        </div>
        <div class="sliderBtn sliderBtnRight" id="btnRight"><img src="./assets/svg/icons/arrowRSlider.svg" alt=""></div>
        <div class="sliderBtn sliderBtnLeft" id="btnLeft"><img src="./assets/svg/icons/arrowLSlider.svg" alt=""></div>
      </div>
    <div class="prices">
        <div class="priceOption">
          <div class="classFlight">
            <p>Class:</p>
            <h3>Tourist</h3>
          </div>
          <div class="priceFlight">
            <h1>$${arrayVM.precio}</h1>
            <button id="buttonPrice1" value="${arrayVM.precio}">Reserve</button>
          </div>
        </div>
        <div class="priceOption">
          <div class="classFlight">
            <p>Class:</p>
            <h3>Economy</h3>
          </div>
          <div class="priceFlight">
            <h1>$${arrayVM.precio*1.5}</h1>
            <button id="buttonPrice2" value="${arrayVM.precio*1.5}">Reserve</button>
          </div>
        </div>
        <div class="priceOption">
          <div class="classFlight">
            <p>Class:</p>
            <h3>Business</h3>
          </div>
          <div class="priceFlight">
            <h1>$${arrayVM.precio*2}</h1>
            <button id="buttonPrice3" value="${arrayVM.precio*2}">Reserve</button>
          </div>
        </div>
        <div class="priceOption">
          <div class="classFlight">
            <p>Class:</p>
            <h3>First Class</h3>
          </div>
          <div class="priceFlight">
            <h1>$${arrayVM.precio*2.5}</h1>
            <button id="buttonPrice4" value="${arrayVM.precio*2.5}">Reserve</button>
          </div>
        </div>

    </div>

    </div>

  </div>
  </div>
    `
    let buttonPrice1 = document.getElementById('buttonPrice1')
    let buttonPrice2 = document.getElementById('buttonPrice2')
    let buttonPrice3 = document.getElementById('buttonPrice3')
    let buttonPrice4 = document.getElementById('buttonPrice4')
    
    buttonPrice1.addEventListener("click", ()=>{
      reserveFlight(buttonPrice1.value)
    })
    buttonPrice2.addEventListener("click", ()=>{
      reserveFlight(buttonPrice2.value)
    })
    buttonPrice3.addEventListener("click", ()=>{
      reserveFlight(buttonPrice3.value)
    })
    buttonPrice4.addEventListener("click", ()=>{
      reserveFlight(buttonPrice4.value)
    })

//Reserve

  function reserveFlight(precie){
    header.classList.remove("changeHeader")
    let accessYESorNO = localStorage.getItem('accessYN')

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

      }).showToast(); 

    }else{


      const reserve1 = document.querySelector('.reserve1')
      const reserve2 = document.querySelector('.reserve2')

    
      reserve1.innerHTML = `
      <div class="containerReserve1">
      <p class="titleReserve1">
        You are about to make your reservation to ${arrayVM.nombre + arrayVM.nombre2}.
      </p>
      <p class="subtitleReserve1">
        Fill in the following information to continue
      </p>
      <form action="" name="checkAndPersons">
        <label for="checkIn">
          <p>Check-in</p>
          <input type="date" name="" id="checkIn" min="2023-01-01" required>
        </label>
        <label for="">
          <p>How many does people travel?</p>
          <div class="select">
            <select name="" required id="selectReserve1">
            
              <option selected >Choose an option</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              
            </select>
            <img src="./assets/svg/icons/Chevron_Down.svg" alt="">
          </div>
        </label>
      </form>
    </div>
    <div class="imageReserve1" style="background-image: url(${arrayVM.img});">
       <button type="submit" id="buttonSubmitReserve1">Continue 
         <img src="./assets/svg/icons/arrowContinue.svg" alt="">
        </button>
    </div>
      `
      let buttonSubmitReserve1 = document.querySelector('#buttonSubmitReserve1')


      reserve1.classList.add('showReserve1')

      buttonSubmitReserve1.addEventListener("click",()=>{
        let checkIn = document.querySelector('#checkIn').value
        let passengers = document.querySelector('#selectReserve1').value
        
        
        if((checkIn == "" && passengers == "Choose an option") || (checkIn == "")){
          Toastify({
            text: "Complete the form to continue.",
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
          reserve2.innerHTML = `
          <div class="reserve2Container">
          <p class="titleReserve2">Add a payment method</p>
          <p class="subtitleReserve2">Complete the form with your credit card details</p>
          <form action="" id="payment">
            <label for="" id="cardNumberLabel">
              <p>Card Number</p>
              <div class="cardNumberSection">
                <input type="number" maxlength="4" minlength="4" required id="cardNumber1">
                <input type="number" maxlength="4" minlength="4" required id="cardNumber2">
                <input type="number" maxlength="4" minlength="4" required id="cardNumber3">
                <input type="number" maxlength="5" minlength="4" required id="cardNumber4">
              </div>
            </label>
            <label for="">
              <p>Cardholder Name</p>
              <input type="text" name="" id=""  pattern="[a-zA-Z ]{3,40}" required>
            </label>
            <div class="expCvv">
              <label for="">
                <p>Expiration</p>
                <input type="month" min="2023-01" required>
              </label>
              <label for="">
                <p>CVV</p>
                <input type="number" id="ccvInput" maxlength="4" required>
              </label>
            </div>
            <label for="">
              <p>Identification document</p>
              <input type="number" maxlength="8" id="idInput" required>
            </label>
            <button type="submit" id="submitPayment">Continue <img src="./assets/svg/icons/arrowContinue.svg" alt=""></button>
          </form>
        </div>
          `
        reserve2.classList.add('showReserve2')
        reserve2.style.backgroundImage=`url(${arrayVM.img})`

        let formPayment = document.querySelector('#payment')
        
        formPayment.addEventListener('submit', validatePayment)

        function validatePayment(e){
          e.preventDefault()
          let cardNumber1 = document.querySelector('#cardNumber1').value
          let cardNumber2 = document.querySelector('#cardNumber2').value
          let cardNumber3 = document.querySelector('#cardNumber3').value
          let cardNumber4 = document.querySelector('#cardNumber4').value
          let ccvInput = document.querySelector('#ccvInput').value
          let idInput = document.querySelector('#idInput').value
          let reserveFees = document.querySelector('.reserve2Fees')



          if (((cardNumber1,cardNumber2,cardNumber3,cardNumber4).length > 4) || ((cardNumber1,cardNumber2,cardNumber3,cardNumber4).length < 4)){
            Toastify({
              text: "Please enter a valid payment method.",
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
            if(ccvInput.length > 3 || ccvInput.length < 3){
              Toastify({
                text: "Enter a valid CVV.",
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
              if(idInput.length > 8 || idInput.length < 7){
                Toastify({
                  text: "Invalid Identity Document.",
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


                reserveFees.innerHTML = `
                <div class="reserve2FeesContainer">
                <p class="titleReserve2Fees">Choose the amount of the installments</p>
                <p class="subtitleReserve2Fees">These are the rates we have available for ${passengers} passengers</p>
                <div class="fees">
                  <button class="amountFee" id="payments1"  value="${precie*passengers}">
                    <p><strong>1</strong> installments of <strong>$${precie*passengers},00</strong></p>
                    <h1>$${precie*passengers}</h1>
                  </button>
                  <button class="amountFee" id="payments3"  value="${parseInt((precie*1.20)*passengers)}">
                    <p><strong>3</strong> installments of <strong>$${parseInt(((precie/3)*1.20)*passengers)},00</strong></p>
                    <h1>$${parseInt((precie*1.20)*passengers)}</h1>
                  </button>
                  <button class="amountFee" id="payments6"  value="${parseInt((precie*1.40)*passengers)}">
                    <p><strong>6</strong> installments of <strong>$${parseInt(((precie/6)*1.40)*passengers)},00</strong></p>
                    <h1>$${parseInt((precie*1.40)*passengers)}</h1>
                  </button>
                  <button class="amountFee" id="payments9"  value="${parseInt((precie*1.50)*passengers)}">
                    <p><strong>9</strong> installments of <strong>$${parseInt(((precie/9)*1.50)*passengers)},00</strong></p>
                    <h1>$${parseInt((precie*1.60)*passengers)}</h1>
                  </button>
                  <button class="amountFee" id="payments12"  value="${parseInt((precie*1.70)*passengers)}">
                    <p><strong>12</strong> installments of <strong>$${parseInt(((precie/12)*1.70)*passengers)},00</strong></p>
                    <h1>$${parseInt((precie*1.80)*passengers)}</h1>
                  </button>
                </div>
              </div>
                `

                let fee1 = document.querySelector('#payments1')
                let fee3 = document.querySelector('#payments3')
                let fee6 = document.querySelector('#payments6')
                let fee9 = document.querySelector('#payments9')
                let fee12 = document.querySelector('#payments12')
                fee1.addEventListener('click',()=>{
                  finalPayment(parseInt(fee1.value))
                })
                fee3.addEventListener('click',()=>{
                  finalPayment(parseInt(fee3.value))
                })
                fee6.addEventListener('click',()=>{
                  finalPayment(parseInt(fee6.value))
                })
                fee9.addEventListener('click',()=>{
                  finalPayment(parseInt(fee9.value))
                })
                fee12.addEventListener('click',()=>{
                  finalPayment(parseInt(fee12.value))
                })
                reserveFees.classList.add("showReserve2Fees")

                function finalPayment(finalPrice){
                  let reserve3 = document.querySelector('.reserve3')
                  let nameReserve = JSON.parse(localStorage.getItem('userLS')) || 'no existe'


                  reserve3.innerHTML = `
                  <div class="reserve3Container">
                  <div class="reserve3Content">
                    <div class="facturation">
                      <h3>Details of your flight reservation</h3>
                      <div>
                        <p>Reservation under which name:</p>
                        <p><strong>${nameReserve[0]?.name}</strong></p>

                      </div>
                      <div>
                        <p>Destination:</p>
                        <p><strong>${arrayVM.nombre + arrayVM.nombre2}</strong></p>
                        <p>Departure date:</p>
                        <p><strong>${checkIn}</strong></p>
                      </div>
                      <div>
                        <p>Flight price: <strong>$${finalPrice}</strong></p>
                        <p>Passangers: <strong>${passengers}</strong></p>
                        <p>Taxes and others <strong>$${parseInt(finalPrice*0.10)}</strong></p>
                      </div>
                    </div>
                    <div class="finalPriceReserve">
                      <p><strong>Final price: $${parseInt(finalPrice + (finalPrice*0.10))}</strong></p>
                    </div>
                  </div>
                </div>
                <div class="reserve3Image" style="background-image: url(${arrayVM.img});">
                  <button id="finishReserve">Confirm Reserve</button>
                </div>
                  `
                reserve3.classList.add('showReserve3')
                
                let finishReserve = document.querySelector('#finishReserve')
                let backgroundReserveFinished = document.querySelector('.backgroundReserveFinished')
                let reserveFinished = document.querySelector('.reserveFinished')


                finishReserve.addEventListener("click", ()=>{



                userReserves.push(new Reserve(arrayVM.nombre + arrayVM.nombre2, passengers, checkIn ))
                localStorage.setItem('reserve', JSON.stringify(userReserves))
                let reserveLS = JSON.parse(localStorage.getItem('reserve', userReserves))
                

                let myResContainer = document.querySelector(".reserves")


                let divReserve = document.createElement("div")
                divReserve.className = "optionReserve"
                divReserve.innerHTML = `
                <div class="destination">
                <p>Destination: <br><strong>${arrayVM.nombre + arrayVM.nombre2}</strong></p>
              </div>
              <div class="classReserve">
                <p>Passengers: <br><strong>${passengers} Persons</strong></p>
              </div>
              <div class="deaparture">
                <p>Deaparture: <br><strong>${checkIn}</strong></p>
              </div>
                `
                myResContainer.appendChild(divReserve)
                  
                  reserveFinished.innerHTML = `
                  <div>
                  <img src="./assets/svg/icons/reserveOK.svg" alt="">
                  <h3>Booked successfully!</h3>
                  <p>You will receive a receipt in the email<br>${nameReserve[0]?.email}</p>
                  <button id="acceptReserve">To accept</button>
                </div>
                  `
                  let acceptReserve = document.querySelector("#acceptReserve")

                  reserve3.classList.remove('showReserve3')
                  reserveFees.classList.remove('showReserve2Fees')
                  reserve2.classList.remove('showReserve2')
                  reserve1.classList.remove('showReserve1')
                  modalViewMoreBackground.classList.remove('showModalVM')

                  setTimeout(()=>{
                    backgroundReserveFinished.classList.add("showBackgroundReserveFinished")
                    reserveFinished.classList.add("showReserveFinished")
                  },1000)
                  acceptReserve.addEventListener("click", ()=>{
                    backgroundReserveFinished.classList.remove("showBackgroundReserveFinished")
                    reserveFinished.classList.remove("showReserveFinished")
                    body.classList.remove('noScroll')

                  })
                })
                }
                
              }
            }
          }



        }

        }

        })
    
    }
  }

//Slider
    let sliderSection = document.querySelectorAll(".sliderSection")

    const exitModalVM = document.querySelector("#exitModalVM")

    function closeModalVM(){
      let backgroundReserveFinished = document.querySelector('.backgroundReserveFinished')

      modalViewMoreBackground.classList.remove('showModalVM')
      body.classList.remove('noScroll')
      backgroundReserveFinished.classList.remove("showBackgroundReserveFinished")
      header.classList.remove("changeHeader")

    }

    exitModalVM.addEventListener('click', closeModalVM)

    modalViewMoreBackground.classList.add('showModalVM')

    const slider = document.querySelector("#slider")
      let sliderSectionLast = sliderSection[sliderSection.length -1]

      const btnRight = document.querySelector("#btnRight")
      const btnLeft = document.querySelector("#btnLeft")

      slider.insertAdjacentElement('afterbegin', sliderSectionLast)


      function Next() {
          let sliderSectionFirst = document.querySelectorAll(".sliderSection") [0]
          slider.style.marginLeft = "-200%"
          slider.style.transition = "all .5s"
          setTimeout(function (){
              slider.style.transition = "none"
              slider.insertAdjacentElement('beforeend', sliderSectionFirst)
              slider.style.marginLeft = "-100%"
          },500)
      }
      function Prev() {
          let sliderSection = document.querySelectorAll(".sliderSection")
          let sliderSectionLast = sliderSection[sliderSection.length -1]    
          slider.style.marginLeft = "0%"
          slider.style.transition = "all .5s"
          setTimeout(function (){
              slider.style.transition = "none"
              slider.insertAdjacentElement('afterbegin', sliderSectionLast)
              slider.style.marginLeft = "-100%"
          },500)
      }

      btnRight.addEventListener('click', function(){
          Next()
      })
      btnLeft.addEventListener('click', function(){
          Prev()
      })
    
      document.onkeydown = ()=> {
        switch (window.event.keyCode) {
            case 37:
              Prev()
             break;
            case 38:
            closeModalVM()              
            break;
            case 39:
            Next()
             break;
        }

    }
  }
    
}

function addToFavs(id){
    let duplicate = favorites.find(el=> el.id == id)
    let accessYESorNO = localStorage.getItem('accessYN')
    
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
    
          }).showToast(); 

    }else{
      if(duplicate){
        Toastify({
          text: "Removed from favorites",
          className:"floatDuplicate",
          gravity: "top",
          style: {
                  background: "#DF1878",
                  marginTop: "80px",
                  color: "#ffff",
                  borderRadius:"10px",
                  boxShadow : "0px 0px 20px 0px #DF1878",
                  fontWeight: "500",
                  zIndex: "109"
              }
      
            }).showToast(); 
      
      

        let sectionFav = document.getElementById("secOptFav" + id)
      
        sectionFav?.parentElement.remove()
      
        favorites = favorites.filter(el => el.id != id)
      
        localStorage.setItem('favs', JSON.stringify(favorites))
        
        viewFavs()
          
      }else{

    let flightAdd = flightsStock.find(element => element.id == id)
    favorites.push(flightAdd)


    addsFav = favorites.find(el => el.id == flightAdd.id)

    let div = document.createElement('div')
    div.className = 'favOption'
    div.innerHTML = `
            <p><strong> ${flightAdd.nombre} </strong> ${flightAdd.nombre2} </p>
            <section id="secOptFav${flightAdd.id}" class="secOptFav">
            <button class="buttonView" id="buttonViewModal${flightAdd.id}">View more</button>
            <button id="deleteFav${flightAdd.id}" class="buttonDelete">
                <img src="./assets/svg/icons/Trash_Full.svg" alt="">
            </button>
            </section>
    `

    optionFavorite.appendChild(div)

    let buttonView = document.getElementById(`buttonViewModal${flightAdd.id}`)

    buttonView.addEventListener("click", ()=>{
      viewMore(flightAdd.id)
      modalContainer.classList.remove('show')
    })

    let sectionFav = document.getElementById(`secOptFav${flightAdd.id}`)

    let buttonDelete = document.getElementById(`deleteFav${flightAdd.id}`)
    buttonDelete.addEventListener('click', () => {
      let btnLiked = document.getElementById("buttonFav" + `${flightAdd.id}`)
      btnLiked?.classList.remove("liked")

      sectionFav.parentElement.remove()

      favorites = favorites.filter(el => el.id != flightAdd.id)

      localStorage.setItem('favs', JSON.stringify(favorites))

      viewFavs()

    })

}}

localStorage.setItem('favs', JSON.stringify(favorites))
viewFavs()


}
    function saveFavs() {
        let saveLocal = JSON.parse(localStorage.getItem('favs'))
        if(saveLocal){
            saveLocal.forEach(el => {
                addToFavs(el.id)
            })
        }
        
    }
    saveFavs()


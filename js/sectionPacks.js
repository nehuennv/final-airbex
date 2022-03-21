    
    fetch("stockPacks.json")
        .then( resp => resp.json())
        .then(data => { 
                createPacks(data)
         })
        .catch(error => console.log(error));


function createPacks(array){
    const packContainer = document.querySelector(".packsContainer")
    for(const pack of array){
        let div = document.createElement("div")
        div.className = "modalPack"
        div.innerHTML = `
        <div class="backgroundsPack">
        <div id="background1${pack.nameId}">
          <h3>${pack.name1}</h3>
        </div>
        <div id="background2${pack.nameId}">
          <h3>${pack.name2}</h3>
        </div>
        <div id="background3${pack.nameId}">
          <h3>${pack.name3}</h3>
        </div>
      </div>
      <div class="contentPack">
        <div class="titlePack">
          <h1>${pack.place} PACK</h1>
        </div>
        <div class="blockPack">
          <p>
          ${pack.description}
          </p>
          <p class="pricePack"><strong>GET THIS PACK FOR ONLY <strong>$${pack.price}</strong></strong></p>
          <button id="btnReservePack${pack.id}">RESERVE</button>
        </div>
      </div>
        `
        packContainer.appendChild(div)
        let btnReservePack = document.getElementById(`btnReservePack${pack.id}`)
        btnReservePack.addEventListener('click', ()=>{
          body.classList.add('noScroll')
          let accessYN = localStorage.getItem('accessYN')
          if(accessYN != 'true'){
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

            reservePack(pack)
          }
        })
    }
    

}
function reservePack(pack){
  const reserve1 = document.querySelector('.reserve1')
  const reserve2 = document.querySelector('.reserve2')

  reserve1.innerHTML = `
  <div class="containerReserve1">
  <p class="titleReserve1">
    You are about to make your reservation to ${pack.name1 + ", " + pack.name2 + " and " + pack.name3}.
  </p>
  <p class="subtitleReserve1">
    Fill in the following information to continue
  </p>
  <form action="" name="checkAndPersons">
    <label for="checkIn">
      <p>Check-in ${pack.name1}</p>
      <input type="date" name="" id="checkIn1" min="2023-01-01" required>
      <p>Check-in ${pack.name2}</p>
      <input type="date" name="" id="checkIn2" min="2023-01-01" required>
      <p>Check-in ${pack.name3}</p>
      <input type="date" name="" id="checkIn3" min="2023-01-01" required>
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
<div class="imageReserve1" style="background-image: url(${pack.img});">
   <button type="submit" id="buttonSubmitReserve1">Continue 
     <img src="./assets/svg/icons/arrowContinue.svg" alt="">
    </button>
</div>
  `
  let buttonSubmitReserve1 = document.querySelector('#buttonSubmitReserve1')

  reserve1.classList.add('showReserve1')
  buttonSubmitReserve1.addEventListener("click",()=>{
    let checkIn1 = document.querySelector('#checkIn1').value
    let checkIn2 = document.querySelector('#checkIn2').value
    let checkIn3 = document.querySelector('#checkIn3').value
    let passengers = document.querySelector('#selectReserve1').value
    
    
    if(((checkIn1 && checkIn2 && checkIn3) == "" && passengers == "Choose an option") || ((checkIn1 && checkIn2 && checkIn3) == "")){
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
    reserve2.style.backgroundImage=`url(${pack.img})`

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
              <button class="amountFee" id="payments1"  value="${pack.price*passengers}">
                <p><strong>1</strong> installments of <strong>$${pack.price*passengers},00</strong></p>
                <h1>$${pack.price*passengers}</h1>
              </button>
              <button class="amountFee" id="payments3"  value="${parseInt((pack.price*1.20)*passengers)}">
                <p><strong>3</strong> installments of <strong>$${parseInt(((pack.price/3)*1.20)*passengers)},00</strong></p>
                <h1>$${parseInt((pack.price*1.20)*passengers)}</h1>
              </button>
              <button class="amountFee" id="payments6"  value="${parseInt((pack.price*1.40)*passengers)}">
                <p><strong>6</strong> installments of <strong>$${parseInt(((pack.price/6)*1.40)*passengers)},00</strong></p>
                <h1>$${parseInt((pack.price*1.40)*passengers)}</h1>
              </button>
              <button class="amountFee" id="payments9"  value="${parseInt((pack.price*1.50)*passengers)}">
                <p><strong>9</strong> installments of <strong>$${parseInt(((pack.price/9)*1.50)*passengers)},00</strong></p>
                <h1>$${parseInt((pack.price*1.60)*passengers)}</h1>
              </button>
              <button class="amountFee" id="payments12"  value="${parseInt((pack.price*1.70)*passengers)}">
                <p><strong>12</strong> installments of <strong>$${parseInt(((pack.price/12)*1.70)*passengers)},00</strong></p>
                <h1>$${parseInt((pack.price*1.80)*passengers)}</h1>
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
                    <p><strong>${pack.name1 + ", " + pack.name2 + " and " + pack.name3}</strong></p>
                    <p>Departure date ${pack.name1}:</p>
                    <p><strong>${checkIn1}</strong></p>
                    <p>Departure date ${pack.name2}:</p>
                    <p><strong>${checkIn2}</strong></p>
                    <p>Departure date ${pack.name3}:</p>
                    <p><strong>${checkIn3}</strong></p>
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
            <div class="reserve3Image" style="background-image: url(${pack.img});">
              <button id="finishReserve">Confirm Reserve</button>
            </div>
              `
            reserve3.classList.add('showReserve3')
            
            let finishReserve = document.querySelector('#finishReserve')
            let backgroundReserveFinished = document.querySelector('.backgroundReserveFinished')
            let reserveFinished = document.querySelector('.reserveFinished')


            finishReserve.addEventListener("click", ()=>{

            let reservePack = []
              
            reservePack.push(new Reserve(pack.name1 + ", " + pack.nameId, passengers, checkIn1 ))
            reservePack.push(new Reserve(pack.name2 + ", " +pack.nameId, passengers, checkIn2 ))
            reservePack.push(new Reserve(pack.name3 + ", " +pack.nameId, passengers, checkIn3 ))

            userReserves.push(new Reserve(pack.name1 + ", " + pack.nameId, passengers, checkIn1 ))
            userReserves.push(new Reserve(pack.name2 + ", " + pack.nameId, passengers, checkIn2 ))
            userReserves.push(new Reserve(pack.name3 + ", " +pack.nameId, passengers, checkIn3 ))

            localStorage.setItem('reserve', JSON.stringify(userReserves))
            let reserveLS = JSON.parse(localStorage.getItem('reserve'))
          
            let myResContainer = document.querySelector(".reserves")
            myReservesTitle.innerText = "My Reserves"
            myReservesTitle.style.opacity="100%";


            for(const res of reservePack){
              let divReserve = document.createElement("div")
              divReserve.className = "optionReserve"
              divReserve.innerHTML = `
              <div class="destination">
              <p>Destination: <br><strong>${res.destination }</strong></p>
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
              
              reserveFinished.innerHTML = `
              <div>
              <img src="./assets/svg/icons/reserveOK.svg" alt="">
              <h3>Booked successfully!</h3>
              <p>You will receive a receipt in the email<br>${nameReserve[0]?.email}</p>
              <button id="acceptReserve">To accept</button>
            </div>
              `
              let acceptReserve = document.querySelector("#acceptReserve")
              const modalViewMoreBackground = document.querySelector(".modalViewMoreBackground")

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
                userRes = []
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
}
)}
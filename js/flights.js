let flightsStock = []

let cardSection = document.getElementById('cardSection');

let noResults = document.getElementById('noResults')

const loginInHome = document.querySelector(".loginFlights")  

let accessYESorNO = localStorage.getItem('accessYN')

let continentSelect = document.getElementById('continent')
let minPrice = document.getElementById('minPrice')
let maxPrice = document.getElementById('maxPrice')
let search = document.getElementById('searchFlight')


let dataLS = JSON.parse(localStorage.getItem('data')) || []
dataLS.forEach(data => {
    flightsStock.push(data)
})


cardSection.innerHTML= `
<div class="loader">
<span></span>
<span></span>
<span></span>
<span></span>
</div>
`
setTimeout(()=>{
    const urlStock = "stockFlights.json";
    fetch(urlStock)
        .then( resp => resp.json())
        .then(data => { 
                    localStorage.setItem('data', JSON.stringify(data))
                    let flightsOffers = data.filter(el => el.id >= 0 && el.id <= 33);
                    crearCards(flightsOffers)
         })
        .catch(error => console.log(error));
},3000)



continentSelect.addEventListener ('change', () =>{
    if(continentSelect.value === "All") {
        crearCards(flightsStock) 
    }else{
        crearCards(flightsStock.filter(el => el.continente == continentSelect.value))
        minPrice.value = 'All'
        search.value = ""
        maxPrice.value = "All"

    }
})
    minPrice.addEventListener ('change', () =>{
    if(minPrice.value === "All"){
        crearCards(flightsStock) 
    }else{
        crearCards(flightsStock.filter(el => el.precio >= minPrice.value))
        continentSelect.value = 'All'
        search.value = ""
        maxPrice.value = "All"
    }
    })

    maxPrice.addEventListener ('change', () =>{
    if(maxPrice.value === "All"){
        crearCards(flightsStock) 
    }else{
        crearCards(flightsStock.filter(el => el.precio <= maxPrice.value))
        continentSelect.value = 'All'
        search.value = ""
        continentSelect.value = "All"
        minPrice.value = "All"
    }
    })

    search.addEventListener ('input', () =>{
        if (search.value == ""){
            crearCards(flightsStock)
        }else{    
            crearCards(flightsStock.filter(el => el.nombre.toLowerCase().includes (search.value.toLowerCase()) || el.nombre2.toLowerCase().includes (search.value.toLowerCase()) ))
            continentSelect.value = 'All'
            minPrice.value = "All"
            maxPrice.value = "All"

        }
        })
    
    if(accessYESorNO != 'false'){

        const userHover = document.querySelector(".hoverUser")
        const nameHover = document.querySelector("#nameUser")
        const userLoged = document.querySelector(".userLoged")  
        
        const userMobile = document.querySelector(".nameUserMobile")
        const buttonMobileName = document.querySelector(".buttonMobileName")  

        let nameUserLS = JSON.parse(localStorage.getItem('userLS')) || 'no existe'

        const openLogin = document.getElementsByClassName('buttonCreate')

        userLoged.classList.toggle('userUnlock')
        buttonMobileName.classList.toggle('showButtonMobile')


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
    




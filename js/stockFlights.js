let cardSection = document.getElementById('cardSection');

cardSection.innerHTML= `
<div class="loader">
<span></span>
<span></span>
<span></span>
<span></span>
</div>
`

const urlStock = "stockFlights.json";
    fetch(urlStock)
        .then( resp => resp.json())
        .then(data => { 
                setTimeout (()=> {
                    localStorage.setItem('data', JSON.stringify(data))
                    let flightsIndex = data.filter(el => el.id > 36 && el.id < 43);
                    crearCards(flightsIndex)
                },3000)
         })
        .catch(error => console.log(error));
        





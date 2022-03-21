const urlReviews = "clientReview.json";
    fetch(urlReviews)
        .then( resp => resp.json())
        .then(data => { 
                    createReview(data)
         })
        .catch(error => console.log(error));


function createReview(array){
    const reviewContainer = document.querySelector(".reviews")
    for(const rev of array){
        let divReview = document.createElement("div")
        divReview.className = "cardReview"
        divReview.innerHTML = `
            <div class="photoReview">
                <img src="${rev.photo}" alt="">
                <h3 class="nameReviewMobile">${rev.nameClient}</h3>
            </div>
            <div class="nameAndReview">
                <h3 class="nameReview">${rev.nameClient}</h3>
                <p>${rev.review}</p>
            </div>
        `
        reviewContainer.appendChild(divReview)
    }
    let endReview = document.createElement("p")
    endReview.className = "endText"
    endReview.innerHTML = `
            “Travel, money is recovered, <strong>time is not”</strong> 
    `
    reviewContainer.appendChild(endReview)
}
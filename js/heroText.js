
const heroTitles = [
    "HEY, WELCOME TO AIRBEX!" ,  
    'HELLO TOURIST, BOOK YOUR NEXT DESTINATION', 
    "THE DAY IS EXCELLENT TO BOOK YOUR TRIP!", 
    "THE TRIP OF YOUR DREAMS IS IN YOUR HANDS!" ,
    "HEY FUTURE TRAVELER, HOW ARE YOU?"
]

let titleRandom = Math.floor(Math.random()*heroTitles.length)
let heroTitle = heroTitles[titleRandom]




const heroTexts = [
    "Have you already booked the flight you are looking for?", 
    "Do not forget that you can read reviews of some tourists who traveled with airbex, at the end of the web!", 
    "We are the only airline that has flights available on all the dates you can imagine!",
     "Did you know? Since we created our website, our customers have increased by more than 100%", 
     "Did you know? Since the creation of Airbex we have changed our logo more than 15 times!",
      "Did you know that our CEO Nehuen Villavicencio founded the company and developed the website?", 
      "Don't forget you can contact us! All information is in the footer."
]

let heroAleatorio = Math.floor(Math.random()*heroTexts.length)
let heroText = heroTexts[heroAleatorio]




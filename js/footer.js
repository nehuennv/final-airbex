let inputFooter = document.getElementById('suscribeInput')
let buttonFooter = document.getElementById('suscribeButton')

emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;



buttonFooter.addEventListener('click',() => {

    if(emailRegex.test(inputFooter.value)){
        Toastify({
            text: "Soon you will receive news!",
            className:"floatDuplicate",
            gravity: "bottom",
            position:"center",
            style: {
                background: "#fff",
                color: "#1A1E22",
                borderRadius:"10px",
                boxShadow : "0px 0px 20px 0px white",
                fontWeight: "500"
            }

          }).showToast();  
          inputFooter.value = ""  
        }else{
            Toastify({
                text: "Enter a valid email.",
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
    })


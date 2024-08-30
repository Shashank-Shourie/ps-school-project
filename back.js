let k=document.body.querySelector("#dark")
let nav=document.body.querySelector(".navbar")
let login=document.body.querySelector("#login")
let signup=document.body.querySelector("#signup")
let back="white"
k.addEventListener("click",()=>{
    if(back==="white"){
        document.body.style.color="white"
        document.body.style.backgroundColor="#333333"              
        k.innerText="Light"
        back="black"
    }
    else{
        document.body.style.color="#333333"
        document.body.style.backgroundColor="white"
        k.innerText="Dark"
        back="white"
    }
})
k.addEventListener("click",()=>{
    login.style.color="#333333"
})
k.addEventListener("click",()=>{
    signup.style.color="#333333"
})

let k=document.body.querySelector("#dark")
let login=document.body.querySelector("#login")
let signup=document.body.querySelector("#signup")
let write=document.body.querySelector("#txt")
let back="white"
k.addEventListener("click",(mode)=>{
    if(back==="white"){
        document.body.classList.add("dark")
        document.body.classList.remove("light")              
        // k.innerText="LightMode"
        back="black"
    }
    else{
        document.body.classList.add("light")
        document.body.classList.remove("dark")
        // k.innerText="DarkMode"
        back="white"
    }
})
k.addEventListener("click",()=>{
    login.style.color="#333333"
})
k.addEventListener("click",()=>{
    signup.style.color="#333333"
})
k.addEventListener("click",()=>{
    write.style.color="#333333"
})


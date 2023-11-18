import { gsap } from "gsap"
import { iconsBasics, brushes, filters, shapes, fonts } from "../utils/constant"
import { observer2 } from "../utils/observer"

const observerConfig = { childList: true, subtree: true };

const editFormContainer = document.querySelector(".editFormContainer")
const editMainContainer = document.querySelector(".edit-mainContainer")

const basicElements = iconsBasics.map(e => {
    return  `<div class="basic-main-elements">
      <i class="${e.icon}"></i>
    <span>${e.text}</span>
    </div>`   
})

const brushesEle = brushes.map(e => {
    return `<div class="brush-container">
    <img src=${e.src} alt="brush">
    <span style="display:none">${e.name}</span>
    </div>`
})

const filterEle = filters.map(e => {
    return `<div class="filter-MainContainer">
    <div class="filter-imageContainer">
    <img src=${e.src} alt="filter">
    </div>
    <span>${e.text}</span>
    </div>`
})

const shapesEle = shapes.map(e => {
    return  `<div class="shapes-Maincontainer">
    <div class="shapes-holder">
    <div class=${e.text}></div>
    </div>
    <span>${e.text}</span>
    </div>`   
})

const fontEle = fonts.map(e => {
    return `<div class="text-Maincontainer">
    <span>${e.fontName}</span>
    </div>`
})


// sliding animation for objects container
const animation = (element) => {
    gsap.fromTo(element, {
        duration: 0.5,
        x: "100%",
        opacity: 0
    },
    {
        duration: 0.5,
        x: '0%', 
        opacity: 1,   
        ease: 'power2.out'
    }
    )
}


const createObjects = (title) => {
if(!title){
    editMainContainer.innerHTML =  `<div class="heading">Basics</div>
    <div class="basic-elements">
    ${basicElements.join(" ")}
   </div>`
  observer2.observe(editMainContainer, observerConfig);
}else {
    if(title === "BASICS"){
        editMainContainer.innerHTML = `<div class="heading">Basics</div>
        <div class="basic-elements">
        ${basicElements.join(" ")}
      </div>`
    editFormContainer.style.display = "none"
    animation(editMainContainer)
  observer2.observe(editMainContainer, observerConfig);
    }else if(title === "TEXT"){
        editMainContainer.innerHTML =  `<div class="heading">Text</div>
        <div class="text-container">${fontEle.join(" ")}</div>`
        editFormContainer.style.display = "none"
       animation(editMainContainer)
  observer2.observe(editMainContainer, observerConfig);
    }else if(title === "DRAWING"){
        editMainContainer.innerHTML =  `<div class="heading">Drawing</div>
        <div class="brush-mainContainer">${brushesEle.join(" ")}<div>`
    editFormContainer.style.display = "none"
       animation(editMainContainer)
  observer2.observe(editMainContainer, observerConfig);
    }else if(title === "FILTERS"){
        editMainContainer.innerHTML =  `<div class="heading">Filters</div>
        <div class="filterContainer">
        ${filterEle.join(" ")}
        </div>`
    editFormContainer.style.display = "none"
       animation(editMainContainer)
  observer2.observe(editMainContainer, observerConfig);
    }else{
        editMainContainer.innerHTML =  `<div class="heading">Shapes</div>
        <div class="shapes-container">
        ${shapesEle.join(" ")}
       </div>`
    editFormContainer.style.display = "none"
       animation(editMainContainer)
  observer2.observe(editMainContainer, observerConfig);
    }
}}

let length
window.addEventListener("storage", () => {
    length = JSON.parse(window.localStorage.getItem("length"))
  })


export { createObjects }
import { layers } from "../utils/constant"

const layersContainerIcon = document.querySelector(".layers-container .layers-heading i")
const mainContainer = document.querySelector(".layers-mainContainer")

const createIcons = (visible, selectable) => {
    const layersEle = layers.map(e => {
        if(e.class === "visibility-container"){
            return `<div class=${e.class}>
            <i class="${e.icon}" style="color: ${visible ? "rgb(68, 68, 68)" : 'rgb(143, 143, 143)'}"></i>
            </div>` 
        }else if(e.class === "delete-container"){
            return `<div class=${e.class}>
            <i class="${e.icon}" style="color: rgb(68, 68, 68)"></i>
            </div>`
        }else{
            return `<div class=${e.class}>
            <i class="${e.icon}" style="color: ${selectable ? 'rgb(143, 143, 143)' : "rgb(68, 68, 68)"}"></i>
            </div>`
        }
    })  
    return layersEle
}

const layersContent = (layers) => {
    if(layers[0]){
        layersContainerIcon.className = "fa-solid fa-chevron-down"
        mainContainer.children[0].style.display = `block`   
        mainContainer.style.padding = "22px 20px 20px 10px"
        return layers.map((e,i) => {
            return `<div draggable="true" class="layers-miniContainer">
            ${createIcons(e.object.visible, e.object.selectable).join(" ")}           
            <div class="name-container">${e.objectName} <span>${i}</span></div>
            </div>`})
    }else{
        layersContainerIcon.className = "fa-solid fa-chevron-down"
        mainContainer.children[0].style.visibility = `visible`   
        mainContainer.style.padding = "22px 20px 20px 10px"
        return `<div class="noLayers">No layers yet<div>`
    }
}


const changeLayout = (e) => {
    if(e.target.classList.value === "fa-solid fa-chevron-down"){
        e.target.className = "fa-solid fa-chevron-down fa-rotate-180"
        if(mainContainer.children[0].classList.contains("layers-Box")){
            mainContainer.children[0].style.display = `none`   
            mainContainer.style.padding = "15px"
        }else{
            mainContainer.children[0].style.visibility = `hidden`   
            mainContainer.style.padding = "5px"
        }
    }else{
        e.target.className = "fa-solid fa-chevron-down"
        if(mainContainer.children[0].classList.contains("layers-Box")){
            mainContainer.children[0].style.display = `block`   
        }else{
            mainContainer.children[0].style.visibility = `visible`   
        }
    mainContainer.style.padding = "22px 20px 20px 10px"
    }
}


export {layersContent, changeLayout}
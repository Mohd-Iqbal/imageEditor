import { menu } from "../utils/constant"
import { setDialog, closeDialog, openSaveDialog } from "./dialog"

const coverContainer = document.querySelector(".coverContainer")
const menuContainer = document.querySelector(".menu-btnContainer")
const layers = document.querySelector(".layers-container")
const dialog = document.querySelector(".dialog")

const menuEle = menu.map((e,i) => {
    if(i === 2){
        return `<button type="button" class="button-one ${e.text}">${e.text}</button>`
    }else{
        return `<button type="button" class="button-two ${e.text}">${e.text}</button>`
    }
})

const menuBtns = () => {
    menuContainer.innerHTML = `${menuEle.join(" ")}`
}

const laterListener = () => {
    // we want height of dialog for creating appropriate aniamtion for different sizes 
    const dimentions = dialog.getBoundingClientRect()
    const height = dimentions.height
    closeDialog(height)

    // at last we remove event from cover container
    coverContainer.removeEventListener("click", laterListener);
}

// we first set the event and than remove that event and set another event
// we do this so that the event doesn't fire directly rather creates new event that can be listened later
// in case we want to open dialog thorugh open button and then set event on the cover container so that clicking it should close dialog and this is shouldn't happen directly  
const initialListener = () => {
    coverContainer.removeEventListener("click", initialListener);
    coverContainer.addEventListener("click", laterListener)
}


const dialogClose = () =>{
    coverContainer.addEventListener("click", initialListener)
}

const openingDialog = () => {
        setDialog(true)
        dialogClose()
}

const openingDialogSave = () => [
    openSaveDialog(),
    dialogClose()
]


const layersToggle = (e) => {
    const computedValues =  window.getComputedStyle(layers)
    if(computedValues.display === "block"){
        layers.style.display = "none"
            e.target.style.color = "rgb(143, 143, 143)"
    }else {
        layers.style.display = "block"
        e.target.style.color = "rgb(68, 68, 68)"
    }
}

export {menuBtns, openingDialog, openingDialogSave, laterListener, layersToggle}
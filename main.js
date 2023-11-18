import './/styles/index.scss'
import { iconContainerHtml, tabsEvent } from './components/tabs'
import { createObjects } from './components/objects'
import { setDialog, createNew, fileHandler, closeDialog } from "./components/dialog"
import { layersToggle, menuBtns, openingDialog, openingDialogSave } from './components/menu'
import { changeLayout } from './components/layers'
import { changeValue, initialValue, sizeIcon } from './components/slider'
import { laterListener } from './components/menu'
import { createCanvasWithImage } from './components/canvas'
import { createNewCanvasLogic } from './utils/observer'
import { CanvasFormColor, canvasResizeForm, canvasObjectsRotate, canvasCropForm } from './components/editForm'

// setting side tabs
iconContainerHtml()

// setting object container with basic initial values
createObjects()

const basicEle = document.querySelectorAll(".basic-main-elements")
if(basicEle){
    basicEle.forEach(e => {
      const childSpan = e.children[1].textContent
      if(childSpan === "Color"){
        e.addEventListener("click", () => {
            CanvasFormColor(childSpan)
        })
      }else if(childSpan === "Resize"){
        e.addEventListener("click", () => {
            canvasResizeForm(childSpan)
        })
      }else if(childSpan === "Rotate"){
        e.addEventListener("click", () => {
            canvasObjectsRotate(childSpan)
        })
      }else if(childSpan === "Crop"){
        e.addEventListener("click", () => {
            canvasCropForm(childSpan)
        })
      }
    })
}


// click event on side tabs for making it active and rendering objects accordingly 
const firstElement = document.querySelector("#ele0")
const tabsElements = document.querySelectorAll(".mini-iconsContainer")
tabsElements.forEach(ele => tabsEvent(ele,firstElement))

// set menu bottons
menuBtns()

// setting the initial dialog
setDialog(false)
 
// dialog box create new button event 
    const createNewBtn = document.querySelector(".createNew")
    if(createNewBtn){
        createNewBtn.addEventListener("click", (e) => {
        createNew()
    })
}

// dialog box sample button event 
const sample = document.querySelector(".sample")
const coverContainer = document.querySelector(".coverContainer")
if(sample){
    sample.addEventListener("click", (e) => {
        const image = new Image()
        image.onload = () => {
            const originalWidth = image.naturalWidth;
            const originalHeight = image.naturalHeight;
            createNewCanvasLogic(originalWidth, originalHeight, createCanvasWithImage ,image)
        }
        image.src = "/lotus.jpg"    
        let height = 204
        closeDialog(height)
        coverContainer.removeEventListener("click", laterListener);
})
}


// dialog box filepicker input event 
const fileInput = document.querySelector("#file")
if(fileInput){
    fileInput.addEventListener("change", (e) => {
        fileHandler(e)
    })
} 

// open dialog box through open menu button
const openMenu = document.querySelector(".OPEN")
openMenu.addEventListener("click", openingDialog)

const saveMenu = document.querySelector(".SAVE")
saveMenu.addEventListener("click", openingDialogSave)

// toggle display of layers container through layers menu button
const layersMenu = document.querySelector(".LAYERS")
layersMenu.addEventListener("click", layersToggle)

// setting the layers main container content 
let mainContainer = document.querySelector(".layers-mainContainer")
mainContainer.innerHTML = `<div class="noLayers">No layers yet<div>`

// event on i for hiding and showing layers main container
const iLayer = document.querySelector(".layers-heading i")
iLayer.addEventListener("click", (e) => {
    changeLayout(e)
})

// setting initial value for sliderValue container 
initialValue()

// for manipulating slider value 
const slider = document.querySelector(".slider")
slider.addEventListener("input", changeValue)

const iOriginalSize = document.querySelector("#originalSize")
iOriginalSize.addEventListener("click", sizeIcon)


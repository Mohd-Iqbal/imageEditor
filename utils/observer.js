import { setDialog,closeDialog, createNew, fileHandler } from "../components/dialog";
import { laterListener } from "../components/menu";
import { createCanvas, createCanvasWithImage, addImage, addShapes, addTextContainer, applyFilter, brushSelect } from "../components/canvas";
import { setOnCanvas } from "../components/slider";
import { CanvasFormColor, canvasCropForm, canvasObjectsRotate, canvasResizeForm } from "../components/editForm";
const dialog = document.querySelector(".dialog")
const coverContainer = document.querySelector(".coverContainer")

let dimensions = {
    width: 700,
    height: 400
}

const calcPercentage = (width, height) => {
    let widthPercentage = Math.floor((70 / 100) * width)
    let heightPercentage = Math.floor((70 / 100) * height)
    let percentage = 70

    let widthCalc = Math.floor(width / 100)
    let heightCalc = Math.floor(height / 100)

    return {widthPercentage, heightPercentage, widthCalc, heightCalc, percentage}
}

let canvas

const createNewCanvasLogic = (width, height, canvasFunc, imageEle) => {
    const prt = calcPercentage(width, height)
    canvas = canvasFunc(prt.widthPercentage, prt.heightPercentage, width, height, imageEle)
     setOnCanvas(prt.percentage)
     localStorage.setItem("prt", JSON.stringify(prt))
     window.dispatchEvent(new Event("storage"))
}

var imageFile;

  const observer1 = new MutationObserver(() => { 
        const cancel = dialog.querySelector(".cancel")
        const close = dialog.querySelector(".close")
        const create = dialog.querySelector(".create")
        const width = dialog.querySelector("#width")
        const height = dialog.querySelector("#height")
        const fileInput = dialog.querySelector("#file")
        const createNewBtn = dialog.querySelector(".createNew")
        const open = dialog.querySelector(".open")
        const sample = dialog.querySelector(".sample")

    if(cancel){
        cancel.addEventListener("click", ()=>{
            setDialog()
        })
    }
    if(close){
        close.addEventListener("click", () => {
            let height = 342
            closeDialog(height)
            coverContainer.removeEventListener("click", laterListener);
        })
    }if(fileInput){
        fileInput.addEventListener("change", (e) => {
         imageFile = fileHandler(e)
        })
    }if(createNewBtn){
        createNewBtn.addEventListener("click", (e) => {
            createNew()
        })
    }if(width){
        width.addEventListener("change", (e) => {
            dimensions[e.target.name] = Number(e.target.value)
        })
    }if(height){
        height.addEventListener("change", (e) => {
            dimensions[e.target.name] = Number(e.target.value)
        })
    }if(sample){
        sample.addEventListener("click", () => {
            const image = new Image()
            image.onload = () => {
                const originalWidth = image.naturalWidth;
                const originalHeight = image.naturalHeight;
                if(canvas === undefined){
                    createNewCanvasLogic(originalWidth, originalHeight, createCanvasWithImage ,image)
                }else{
                    addImage(image)
                }
            }
            image.src = "/lotus.jpg"    
            let height = 204
            closeDialog(height)
            coverContainer.removeEventListener("click", laterListener);
        })
    }if(open){ 
        open.addEventListener("click", () => {
            const image = new Image()
            image.onload = () => {
                const originalWidth = image.naturalWidth;
                const originalHeight = image.naturalHeight;
                if(canvas !== undefined){
                    addImage(image)
                }else{
                    if(originalWidth > 250 || originalHeight > 250){
                        if(originalWidth >= 950 && originalHeight >= 500){
                            createNewCanvasLogic(950, 500, createCanvasWithImage ,image)
                        }else if(originalWidth > 950){
                            createNewCanvasLogic(950, originalHeight, createCanvasWithImage ,image)
                        }else if(originalWidth > 500){
                            createNewCanvasLogic(originalWidth, 500, createCanvasWithImage ,image)
                        }else if(originalWidth < 250){
                            createNewCanvasLogic(250, originalHeight, createCanvasWithImage ,image)
                        }else if(originalHeight < 250){
                            createNewCanvasLogic(originalWidth, 250, createCanvasWithImage ,image)
                        }else{
                            createNewCanvasLogic(originalWidth, originalHeight, createCanvasWithImage ,image)
                        }
                    }else if(originalWidth <= 250 && originalHeight <= 250){
                        createNewCanvasLogic(250, 250, createCanvasWithImage ,image)
                    }    
                }}
                image.src = URL.createObjectURL(imageFile)    
            let height = 342
            closeDialog(height)
            coverContainer.removeEventListener("click", laterListener);
        })
    }if(create){
        create.addEventListener("click", () => {
            let height = 144
            closeDialog(height)
            coverContainer.removeEventListener("click", laterListener)
            if(dimensions.width > 250 || dimensions.height > 250){
                if(dimensions.width >= 950 && dimensions.height >= 500){
                    createNewCanvasLogic(950, 500, createCanvas)
                }else if(dimensions.width > 950){
                    createNewCanvasLogic(950, dimensions.height, createCanvas)
                }else if(dimensions.height > 500){
                    createNewCanvasLogic(dimensions.width, 500, createCanvas)
                }else if(dimensions.width < 250){
                    createNewCanvasLogic(250, dimensions.height, createCanvas)
                }else if(dimensions.height < 250){
                    createNewCanvasLogic(dimensions.width, 250, createCanvas)
                }else{
                    createNewCanvasLogic(dimensions.width, dimensions.height, createCanvas)
                }
            }else if(dimensions.width <= 250 && dimensions.height <= 250){
                createNewCanvasLogic(250, 250, createCanvas)
            }
            dimensions = {width: 700, height: 400}
        })
    }
});

const editMainContainer = document.querySelector(".edit-mainContainer")


const observer2 = new MutationObserver(() => {
    const shapesContainers = editMainContainer.querySelectorAll(".shapes-Maincontainer")
    const textContainers = editMainContainer.querySelectorAll(".text-Maincontainer")
    const brushes = editMainContainer.querySelectorAll(".brush-container")
    const basicEle = editMainContainer.querySelectorAll(".basic-main-elements")
    const filters = editMainContainer.querySelectorAll(".filter-MainContainer")

    if(shapesContainers){
        shapesContainers.forEach(e => {
            e.addEventListener("click", () => {
                addShapes(e.children[1].textContent)
            })
        })            
    }if(textContainers){
        textContainers.forEach(e => {
            e.addEventListener("click", (e) => {
            if(e.target.classList.contains("text-Maincontainer")){
                let font = e.target.children[0].textContent
                let element = e.target
            addTextContainer(e,textContainers, font, element)
            }else if(!e.target.classList.contains("text-Maincontainer")){
                let font = e.target.textContent
                let element = e.target.parentNode
                addTextContainer(e,textContainers, font, element)
            }
            })
        })            
    }if(brushes){
        brushes.forEach(e => {
        e.addEventListener("click", (e) => {
            if(e.target.classList.contains("brush-container")){
                let brush = e.target.children[1].textContent
                    brushSelect(brush)
            }else if(!e.target.classList.contains("text-Maincontainer")){
                let brush = e.target.parentNode.children[1].textContent
               brushSelect(brush)
            }
        })
    })            
    }if(basicEle){
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
    }if(filters){
        filters.forEach(e => {
            e.addEventListener("click", (e) => {
            const filterName = e.target.parentNode.parentNode.children[1].textContent
            applyFilter(filterName)
            })
        })
    }        
 })


    export { observer1, observer2, dimensions, createNewCanvasLogic }
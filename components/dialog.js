import { gsap } from "gsap"
const dialog = document.querySelector(".dialog")
const tabsContainer = document.querySelector(".tabsContainer")
const menuContainer = document.querySelector(".menu-btnContainer")
const coverContainer = document.querySelector(".coverContainer")
const layersContainer = document.querySelector(".layers-container")
const canvasSetup = document.querySelector(".canvasSetup-container")
const canvasContainer = document.querySelector(".canvasContainer")
const editFormContainer = document.querySelector(".editFormContainer")
const cropButtonContainer = document.querySelector(".Crop-button-container")
import { observer1 } from "../utils/observer"
import { saveImage } from "./canvas"
import { laterListener } from "./menu"

const observerConfig = { childList: true, subtree: true };

const sameTags = () => {
  return `<input accept="image/*" type="file" hidden id="file">
  <label for="file" class="upload-container">
    <i class="fa-solid fa-cloud-arrow-up"></i>
    <span>Upload</span>
  </label>
</input>
<div class="span-cover">
  <span class="span-line"></span>
  <span>OR</span>
  <span class="span-line"></span>
</div>` 
}

// different animation on dialog depending on different parameters passed
const animation = (element, type, height) => {
  if(type === "open"){
    gsap.fromTo(element, {
      duration: 0.5,
      scale:  0,
      y: "-72%",
      x: "17%",
      opacity: 0
  }, 
  {
      duration: 0.5,
      y: "0",
      x: "0",
      scale: 1 , 
      opacity: 1,   
      ease: 'power2.out'
  })
  }else if(type === "save"){
    gsap.fromTo(element, {
      duration: 0.5,
      scale:  0,
      y: "-130%",
      x: "110%",
      opacity: 0
  }, 
  {
      duration: 0.5,
      y: "0",
      x: "40%",
      scale: 1 , 
      opacity: 1,   
      ease: 'power2.out'
  })
  }else if(type === "close" && height === 342){
    gsap.fromTo(element, {
      duration: 0.5,
      y: "0",
      x: "0",
      scale:  1,
      opacity: 0
  },
  {
      duration: 0.5,
      y: "-67%",
      x: "17%",
      scale: 0, 
      opacity: 1,   
      ease: 'power2.out'
  })
  }else if(type === "close" && height === 204){
    gsap.fromTo(element, {
      duration: 0.5,
      y: "0",
      x: "0",
      scale:  1,
      opacity: 0
  },
  {
      duration: 0.5,
      y: "-114%",
      x: "17%",
      scale: 0, 
      opacity: 1,   
      ease: 'power2.out'
  })
  }else if(type === "close" && height === 144){
    gsap.fromTo(element, {
      duration: 0.7,
      y: "0",
      x: "0",
      scale:  1,
      opacity: 0
  },
  {
      duration: 0.7,
      y: "-172%",
      x: "17%",
      scale: 0, 
      opacity: 1,   
      ease: 'power2.out'
  })
  }else if(type === "close" && height === 248.1875){
    gsap.fromTo(element, {
      duration: 0.7,
      y: "0",
      x: "40%",
      scale:  1,
      opacity: 0
  },
  {
      duration: 0.7,
      y: "-105%",
      x: "95%",
      scale: 0, 
      opacity: 1,   
      ease: 'power2.out'
  })
  }else if(type === "close" && height === 187){
    gsap.fromTo(element, {
      duration: 0.7,
      y: "0",
      x: "40%",
      scale:  1,
      opacity: 0
  },
  {
      duration: 0.7,
      y: "-120%",
      x: "95%",
      scale: 0, 
      opacity: 1,   
      ease: 'power2.out'
  })
  }
}


const setDialog = (open) => {
    coverContainer.style.zIndex = "100"
    tabsContainer.style.zIndex = "-1"
    menuContainer.style.zIndex = "-1"
    layersContainer.style.zIndex = "-1"
    canvasSetup.style.zIndex = "-1"
    canvasContainer.style.zIndex = "-1"
    editFormContainer.style.zIndex = "-1"
    cropButtonContainer.style.zIndex = "-1"
    dialog.style.top = "12rem"

    dialog.innerHTML = `<form>
    ${sameTags()}
  <div class="button-container">
    <button type="button" class="button-one createNew">CREATE NEW</button>
    <button type="button" class="button-two sample">SAMPLE</button>
  </div>
  <form>`

  dialog.show()
  // we prevent animation on initial dialog load 
  if(open){
    animation(dialog, "open")
  }

  // we observe dialog based on it's content so that we can get proper children of it
  observer1.observe(dialog, observerConfig);
}

const createNew = () => {
dialog.style.top = "14rem"
    dialog.innerHTML = `<form>
    <div class="input-container">
    <div class="input-mainContainer">
    <label for="width">Width</label>
    <input type="number" name="width" id="width" value="700" min="250" max="950">
    </div>
    <div class="input-mainContainer">
    <label for="width">Height</label>
    <input type="number" name="height" id="height" value="400" min="250" max="500">
    </div>
    </div>
    <div class="button-container">
    <button type="button" class="button-two cancel">CANCEL</button>
    <button type="button" class="button-one create">CREATE</button>
    </div>
  </form>`

  dialog.show()
  observer1.observe(dialog, observerConfig);
 }

 const fileUpload = (img) => {
  dialog.style.top = "8rem"
  dialog.innerHTML = `<form>
  ${sameTags()}
  <div class="imageContainer">
  <img src=${img} alt="img">
  </div>
<div class="button-container">
  <button type="button" class="button-one open">OPEN</button>
  <button type="button" class="button-two close">CLOSE</button>
</div>
<form>`

dialog.show()
observer1.observe(dialog, observerConfig);
 }

 const openSaveDialog = () => {
  coverContainer.style.zIndex = "100"
  tabsContainer.style.zIndex = "-1"
  menuContainer.style.zIndex = "-1"
  layersContainer.style.zIndex = "-1"
  canvasSetup.style.zIndex = "-1"
  canvasContainer.style.zIndex = "-1"
  editFormContainer.style.zIndex = "-1"
  cropButtonContainer.style.zIndex = "-1"
  dialog.style.top = "12rem"
  dialog.style.transform = "translate(0px, 0px)"

  dialog.innerHTML = `<form class="save-form" autofocus> 
  <div class="input-Container">
  <label class="label" for="fileName">File Name</label>
  <input type="text" id="fileName" class="fileName" name="fileName" value="Image" autocomplete="off">
  </div>
  <div class="radios-container">
  <div class="radios-mainContainer">
  <div class="radiosBox">
  <input type="radio" name="imageQuality" id="JPEG">
  <label for="JPEG">JPEG</label>
  </div>
  <div class="radiosBox">
  <input type="radio" name="imageQuality" id="PNG">
  <label for="PNG">PNG</label>
  </div>
  </div>
  <div class="radio-rangeContainer">  
  </div>
  <div class="button-container">
  <a class="Image-Saver button">Save</a>
  </div>
  </div>
  </form>`

  dialog.show()
  animation(dialog, "save")
observer1.observe(dialog, observerConfig);

const fileNameInput = dialog.querySelector(".fileName")
const labelTag = dialog.querySelector(".label")
const containerFileInput = dialog.querySelector(".input-Container")
const rangeContainer = dialog.querySelector(".radio-rangeContainer")
const radioJpeg = dialog.querySelector("#JPEG")
const radioPng = dialog.querySelector("#PNG")
const buttonContainer = dialog.querySelector(".button-container")
const button = dialog.querySelector(".Image-Saver")

labelTag.style.color = "rgb(180, 180, 180)"

buttonContainer.style.marginTop = "0.5rem"

rangeContainer.innerHTML = `<label class="qualityLabel" for="slider">Quality <span>8</span></label>
<input type="range" name="slider" id="slider" value="0.8" min="0.1" step="0.1" max="1" class="sliderQuality">`

radioJpeg.checked = true

const slider = dialog.querySelector("#slider")
const qualityContainer = dialog.querySelector(".qualityLabel span")

radioJpeg.addEventListener("change", (e) => {
  if(e.target.checked){
    if(!rangeContainer.children[0]){
    rangeContainer.innerHTML = `<label class="qualityLabel" for="slider">Quality <span>8</span></label>
    <input type="range" name="slider" id="slider" value="0.8" min="0.1" step="0.1" max="1" class="sliderQuality">`

    buttonContainer.style.marginTop = "0.5rem"
    const slider = dialog.querySelector("#slider")
const qualityContainer = dialog.querySelector(".qualityLabel span")

if(slider){
  slider.addEventListener("input", (e) => {
    const number = e.target.value
    if(number !== "1"){
      qualityContainer.textContent = number[number.length - 1]
    }else{
      qualityContainer.textContent = "10"
    }
  })
}
  }
}
})

radioPng.addEventListener("change", (e) => {
  if(e.target.checked){
    if(rangeContainer.children[0]){
    rangeContainer.innerHTML = ``
    buttonContainer.style.marginTop = "-1rem"
  }
}
})


if(slider){
  slider.addEventListener("input", (e) => {
    const number = e.target.value
    if(number !== "1"){
      qualityContainer.textContent = number[number.length - 1]
    }else{
      qualityContainer.textContent = "10"
    }
  })
}

  fileNameInput.addEventListener('focus', (e) => {
    if(containerFileInput.children[0] !== fileNameInput){
      containerFileInput.children[0].style.color = "orangered"
      fileNameInput.style.borderBottom = "1px solid orangered"
    }else{
      const label = document.createElement("label")
      label.setAttribute("for", "fileName")
      label.textContent = "File Name"
      label.style.color = "orangered"
      containerFileInput.prepend(label)
      fileNameInput.style.borderBottom = "1px solid orangered"
      fileNameInput.removeAttribute("placeholder")
    }
  })

  fileNameInput.addEventListener('blur', (e) => {
    if(fileNameInput.value === ""){
      fileNameInput.setAttribute("placeholder", "File Name")
      fileNameInput.style.borderBottom = "1px solid rgb(180, 180, 180)"
      containerFileInput.removeChild(containerFileInput.children[0])
    }else{
      if(containerFileInput.children[0] !== fileNameInput){
        containerFileInput.children[0].style.color = "rgb(180, 180, 180)"
        fileNameInput.style.borderBottom = "1px solid rgb(180, 180, 180)"
      }else{
        const label = document.createElement("label")
        label.setAttribute("for", "fileName")
        label.textContent = "File Name"
        label.style.color = "rgb(180, 180, 180)"
      containerFileInput.prepend(label)
        fileNameInput.style.borderBottom = "1px solid rgb(180, 180, 180)"
      }
    }
  })
 
  button.addEventListener("click", (e) => {
    if(radioPng.checked){
      saveImage(e,"PNG", fileNameInput.value)
      closeDialog(187)
    coverContainer.removeEventListener("click", laterListener);
    }else{
      saveImage(e,"JPEG", fileNameInput.value, Number(slider.value))
      closeDialog(248.1875)
    coverContainer.removeEventListener("click", laterListener);
    }
  })

 }

 const closeDialog = (height) => {
  coverContainer.style.zIndex = "-1"
    tabsContainer.style.zIndex = "100"
    menuContainer.style.zIndex = "100"  
    layersContainer.style.zIndex = "100"
    canvasSetup.style.zIndex = "100"
    canvasContainer.style.zIndex = "100"
    editFormContainer.style.zIndex = "100"
    cropButtonContainer.style.zIndex = "100"

      animation(dialog, "close" ,height)    

      // setTimeOut for getting animation before closing
    setTimeout(() => {
      dialog.close()
    }, 500);
 }

 const fileHandler = (e) => {
  const file = e.target.files[0] 
            const reader = new FileReader()
            reader.onload = (e) => {
              fileUpload(e.target.result)      
            }
            reader.readAsDataURL(file)
            
            return file
 }



export {setDialog, createNew, fileHandler, closeDialog, openSaveDialog}



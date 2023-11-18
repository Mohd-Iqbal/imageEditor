import { dimensions } from "../utils/observer";
import { gsap } from "gsap/gsap-core";
import "@melloware/coloris/dist/coloris.css";
import { coloris, init } from "@melloware/coloris";
import {
  addFreeDrawing,
  applyColorChange,
  applyRotateObject,
  cancelChangeColor,
  cancelCrop,
  cancelRotate,
  cancelTextStyle,
  canvasColorChange,
  canvasCrop,
  canvasResize,
  changeBgColorText,
  changeFontSize,
  changeOpacityText,
  changeOutlineColor,
  changeShapeBgColor,
  changeShapeOpacity,
  shapeShadowToggle,
  changeTextAlign,
  changeTextColor,
  changeTextStyle,
  croppingCanvas,
  getDimensionsCrop,
  rotateObject,
  shapeBorderToggle,
  changeShadowBlur,
  changeShadowOffX,
  changeShadowOffY,
  changeShadowColor,
  changeBorderWidth,
  changeBorderColor,
  cancelShapeButton,
} from "./canvas";

const editFormContainer = document.querySelector(".editFormContainer");

const animation = (element, name) => {
  if (name === "Color") {
    gsap.fromTo(
      element,
      {
        duration: 0.5,
        scale: 0,
        x: "-120%",
        y: "110%",
        opacity: 0,
      },
      {
        duration: 0.5,
        y: "0",
        x: "0",
        scale: 1,
        opacity: 1,
        ease: "power2.out",
      }
    );
  } else if (name === "Resize") {
    gsap.fromTo(
      element,
      {
        duration: 0.5,
        scale: 0,
        x: "-120%",
        y: "40%",
        opacity: 0,
      },
      {
        duration: 0.5,
        y: "0",
        x: "0",
        scale: 1,
        opacity: 1,
        ease: "power2.out",
      }
    );
  } else if (name === "Rotate") {
    gsap.fromTo(
      element,
      {
        duration: 0.5,
        scale: 0,
        x: "-120%",
        y: "-15%",
        opacity: 0,
      },
      {
        duration: 0.5,
        y: "0",
        x: "0",
        scale: 1,
        opacity: 1,
        ease: "power2.out",
      }
    );
  }
};

let color = "#000000";
const CanvasFormColor = (name) => {
  editFormContainer.style.display = "block";
  editFormContainer.style.height = "10rem";
  editFormContainer.style.overflowY = "hidden"

  editFormContainer.innerHTML = `<div class="heading-Container">Canvas Background Color</div>
    <form class="color-container">
    <input name="color-picker" id="color-picker" value=${color}></input>
    </form> 
    <div class="button-container">
    <button type="button" class="button-two cancel-canvas-color">CANCEL</button>
  <button type="button" class="button-one apply-canvas-color">APPLY</button>
  </div>
  `;

  init();
  coloris({
    el: "#color-picker",
    parent: "color-container",
    rtl: false,
    margin: 6,
  });

  const input = editFormContainer.querySelector("#color-picker");
  const buttonContainer = editFormContainer.querySelector(".button-container");
  const picker = document.querySelector(".clr-picker");
  const cancelButton = editFormContainer.querySelector(".cancel-canvas-color");
  const applyButton = editFormContainer.querySelector(".apply-canvas-color");

  input.addEventListener("open", (e) => {
    editFormContainer.style.height = "23rem";
    buttonContainer.style.marginTop = "13rem";
    picker.style.boxShadow = "none";
    applyButton.textContent = "CHOOSE";
  });
  input.addEventListener("close", (e) => {
    editFormContainer.style.height = "10rem";
    buttonContainer.style.marginTop = "0rem";
    applyButton.textContent = "APPLY";
  });

  input.addEventListener("input", (e) => {
    canvasColorChange(e.target.value);
  });

  cancelButton.addEventListener("click", CancelColorForm);
  applyButton.addEventListener("click", (e) => {
    applyColor(e, input);
  });

  animation(editFormContainer, name);
};

const CancelColorForm = (e) => {
  editFormContainer.style.display = "none";
  cancelChangeColor();
};

const applyColor = (e, input) => {
  applyColorChange(input.value);
  editFormContainer.style.display = "none";
  color = input.value;
};

const canvasResizeForm = (name) => {
  editFormContainer.style.display = "block";
  editFormContainer.style.height = "11.5rem";
  editFormContainer.style.overflowY = "hidden"

  editFormContainer.innerHTML = `<div class="heading-Container">Resize</div>
    <form>
    <div class="input-container">
    <div class="input-mainContainer">
    <label for="width">Width</label>
    <input type="number" name="width" id="width" value="700" min="250" max="950">
    </div>
    <div class="input-mainContainer">
    <label for="height">Height</label>
    <input type="number" name="height" id="height" value="400" min="250" max="500">
    </div>
    </div>
    </form>
    <div class="button-container">
    <button type="button" class="button-two canvas-resize-close">CLOSE</button>
  <button type="button" class="button-one canvas-resize">RESIZE</button>
  </div>`;

  const closeButton = editFormContainer.querySelector(".canvas-resize-close");
  const resizeButton = editFormContainer.querySelector(".canvas-resize");
  const widthInput = editFormContainer.querySelector("#width");
  const heightInput = editFormContainer.querySelector("#height");

  closeButton.addEventListener("click", closeResize);
  resizeButton.addEventListener("click", () => {
    resizingCanvas(widthInput.value, heightInput.value);
  });

  animation(editFormContainer, name);
};

const closeResize = () => {
  editFormContainer.style.display = "none";
};

const resizingCanvas = (width, height) => {
  editFormContainer.style.display = "none";
  if (width > 250 || height > 250) {
    if (width >= 950 && height >= 500) {
      canvasResize(950, 500);
    } else if (width > 950) {
      canvasResize(950, height);
    } else if (height > 500) {
      canvasResize(width, 500);
    } else if (width < 250) {
      canvasResize(250, height);
    } else if (height < 250) {
      canvasResize(width, 250);
    } else {
      canvasResize(width, height);
    }
  } else if (width <= 250 && height <= 250) {
    canvasResize(250, 250);
  }
};

const canvasObjectsRotate = (name) => {
  editFormContainer.style.display = "block";
  editFormContainer.style.height = "11.5rem";
  editFormContainer.style.overflowY = "hidden"
  
  editFormContainer.innerHTML = `<div class="heading-Container">Rotate</div>
    <form>
    <div class="input-rotateContainer">
    <div class="input-sliderContainer">
    <label for="slider" class="label-Slider">Angle</label>
    <input type="range" name="slider" id="slider" min="0" value="0" max="360" class="sliderRotate" >
    </div>
    <div class="input-mainContainer">
    <input type="number" name="angle" id="angle" value="0" min="0" max="360">
    </div>
    </div>
    </form>
    <div class="button-container rotate-Button-Container">
    <button type="button" class="button-two canvas-rotate-cancel">CANCEL</button>
  <button type="button" class="button-one canvas-apply-rotate">APPLY</button>
  </div>`;

  const closeButton = editFormContainer.querySelector(".canvas-rotate-cancel");
  const rotateButton = editFormContainer.querySelector(".canvas-apply-rotate");
  const angleSlider = editFormContainer.querySelector("#slider");
  const angleNumber = editFormContainer.querySelector("#angle");

  closeButton.addEventListener("click", closeRotate);
  rotateButton.addEventListener("click", () => {
    applyRotate(Number(angleNumber.value));
  });

  angleSlider.addEventListener("input", (e) => {
    const angle = Number(e.target.value);
    angleNumber.value = Number(angle);
    rotateObject(angle);
  });

  angleNumber.addEventListener("change", (e) => {
    const angle = Number(e.target.value);
    angleSlider.value = Number(angle);
    rotateObject(angle);
  });

  animation(editFormContainer, name);
};

const applyRotate = (angle) => {
  editFormContainer.style.display = "none";
  applyRotateObject(angle);
};

const closeRotate = () => {
  editFormContainer.style.display = "none";
  cancelRotate();
};

const canvasCropForm = (name) => {
  const div = document.querySelector(".Crop-button-container");

  div.style.display = "block";
  div.style.display = "flex";
  div.style.justifyContent = "space-evenly";
  div.style.alignItems = "center";

  div.innerHTML = `<button type="button" class="button-two canvas-crop-cancel">CANCEL</button>
<button type="button" class="button-one canvas-cropper">CROP</button>`;

  const cropDimensions = getDimensionsCrop();
  const closeButton = div.querySelector(".canvas-crop-cancel");
  const cropButton = div.querySelector(".canvas-cropper");

  if (cropDimensions) {
    canvasCrop(dimensions.width, dimensions.height);
  }

  closeButton.addEventListener("click", closeCrop);
  cropButton.addEventListener("click", cropCanvas);
};

const cropCanvas = () => {
  croppingCanvas();
};

const closeCrop = () => {
  cancelCrop();
};

const canvasTextForm = (name, opacity, fontSize, align, underline, overline, linethrough, fontStyle, color, bgColor, outline, top, left, width, height, fontFamily, strokeWidth, text) => {
  editFormContainer.style.display = "block";
  editFormContainer.style.height = "29rem";
  editFormContainer.style.overflowY = "hidden"

  editFormContainer.innerHTML = `<div class="heading-Container">${name}</div>
    <form>
    <div class="input-textContainer">
    <div class="input-sliderContainer">
    <label for="slider" class="label-Slider">Opacity</label>
    <input type="range" name="slider" id="slider" value=${opacity} min="0.1" step="0.1" max="1" class="sliderOpacity" >
    </div>
    <div class="input-mainContainer">
    <input type="number" name="opacity" id="opacity" value=${opacity} min="0.1" step="0.1" max="1">
    </div>
    </div>
    <div class="input-textContainer">
    <div class="input-sliderContainer">
    <label for="slider" class="label-Slider">Font Size</label>
    <input type="range" name="slider" id="slider" min="10" value=${fontSize} max="100" class="sliderFontSize" >
    </div>
    <div class="input-mainContainer">
    <input type="number" name="font" id="font" value=${fontSize} min="10" max="100">
    </div>
    </div>
    <div class="straight-line"></div>
    <div class="adjustment-container">
    <div class="alignment-icons">
    <div class="icon-container align" id="left">
    <i class="fa-solid fa-align-left"></i>
    </div>
    <div class="icon-container align" id="center">
    <i class="fa-solid fa-align-center"></i>
    </div>
    <div class="icon-container align" id="right">
    <i class="fa-solid fa-align-right"></i>
    </div>
    </div>
    <div class="styling-icons">
    <div class="icon-container styleText" id="underline">
    <i class="fa-solid fa-underline"></i>
    </div>
    <div class="icon-container styleText" id="line-through">
    <i class="fa-solid fa-strikethrough"></i>
    </div>
    <div class="icon-container styleText" id="overline">
    <div class="icon-overline">O</div>
    </div>
    <div class="icon-container styleText" id="italic">
    <i class="fa-solid fa-italic"></i>
    </div>
    </div>
    </div>
    <div class="straight-line"></div>
    <div class="colors-container">
    <div class="colors-miniContainer">
    <label for="color">Color</label>
    <input type="color" name="color" id="color">
    </div>
    <div class="colors-miniContainer">
    <div class="checkboxContainer">
    <input type="checkbox" name="bg" class="checkbox" id="bg">
    <label for="bg">Background</label>
    </div>
    <input type="color" name="bgColor" id="bgColor" disabled="true">
    </div>
    <div class="colors-miniContainer">
    <div class="checkboxContainer">
    <input type="checkbox" name="outline" class="checkbox" id="outline">
    <label for="outline">Outline</label>
    </div>
    <input type="color" name="outlineColor" id="outlineColor" disabled="true">
    </div>
    </div>
    <div class="straight-line text-las-line"></div>
    <div class="button-container">
    <button type="button" class="button-two canvas-cancel-style">CANCEL</button>
  <button type="button" class="button-one canvas-apply-style">APPLY</button>
  </div>
    </form>`

    const sliderOpacity = editFormContainer.querySelector(".sliderOpacity") 
    const inputOpacity = editFormContainer.querySelector("#opacity")
    const sliderFontSize = editFormContainer.querySelector(".sliderFontSize")
    const inputFontSize = editFormContainer.querySelector("#font")
    const alignmentIconContainer = editFormContainer.querySelector(".alignment-icons")
    const alignIcons = editFormContainer.querySelectorAll(".align")
    const styleIcons = editFormContainer.querySelectorAll(".styleText")
    const colorText = editFormContainer.querySelector("#color")
    const checkBgColor = editFormContainer.querySelector("#bg")
    const colorBg = editFormContainer.querySelector("#bgColor")
    const checkOutlineColor = editFormContainer.querySelector("#outline")
    const colorOutline = editFormContainer.querySelector("#outlineColor")
    const applyButton = editFormContainer.querySelector(".canvas-apply-style")
    const cancelButton = editFormContainer.querySelector(".canvas-cancel-style")

    alignIcons.forEach(e => {
      let id = e.getAttribute("id")
      if(id === align){
        e.style.backgroundColor = "rgb(216, 216, 216)"
      }else{
        e.style.backgroundColor = "rgb(180, 180, 180)"
      }
    })


    if(underline){
      styleIcons[0].style.backgroundColor = "rgb(216, 216, 216)"
    }else{
      styleIcons[0].style.backgroundColor = "rgb(180, 180, 180)"
    }

    if(linethrough){
      styleIcons[1].style.backgroundColor = "rgb(216, 216, 216)"
    }else{
      styleIcons[1].style.backgroundColor = "rgb(180, 180, 180)"
    }

    if(overline){
      styleIcons[2].style.backgroundColor = "rgb(216, 216, 216)"
    }else{
      styleIcons[2].style.backgroundColor = "rgb(180, 180, 180)"
    }

    if(fontStyle === "italic"){
      styleIcons[3].style.backgroundColor = "rgb(216, 216, 216)"
    }else{
      styleIcons[3].style.backgroundColor = "rgb(180, 180, 180)"
    }

    if(color === "black"){
      colorText.value = 'rgb(0,0,0)'
    }else{
      colorText.value = color
    }

    if(bgColor === "transparent"){
      checkBgColor.checked = false
    }else{
      checkBgColor.checked = true
      colorBg.removeAttribute("disabled")
      colorBg.value = bgColor
    }

    if(outline === "transparent"){
      checkOutlineColor.checked = false
    }else{
      checkOutlineColor.checked = true
      colorOutline.removeAttribute("disabled")
      colorOutline.value = outline
    }

    sliderOpacity.addEventListener("input", (e) => {
      let numberValue = Number(e.target.value)
      inputOpacity.value = numberValue
      changeOpacityText(numberValue)
    })

    inputOpacity.addEventListener("change", (e) => {
      let numberValue = Number(e.target.value)
      if(numberValue <= 1){
        sliderOpacity.value = numberValue
        changeOpacityText(numberValue)
      }
    })

    sliderFontSize.addEventListener("input", (e) => {
      let numberValue = Number(e.target.value)
      inputFontSize.value = numberValue
      changeFontSize(numberValue)
    })

    inputFontSize.addEventListener("change", (e) => {
      let numberValue = Number(e.target.value)
      if(numberValue >= 10 && numberValue <= 100){
        sliderFontSize.value = numberValue
      changeFontSize(numberValue)
      }
    })

    alignIcons.forEach(e => {
      e.addEventListener("click", (e) => {
        let target
        if(e.target.classList.contains("fa-solid")){
          target = e.target.parentNode
        target.style.backgroundColor = "rgb(216, 216, 216)"
        }else{
          target = e.target
        target.style.backgroundColor = "rgb(216, 216, 216)"
        }
        let id = target.getAttribute("id")
        const children = Array.from(alignmentIconContainer.children)
        const filterIcons = children.filter(e => e !== target)
        filterIcons.forEach(e => {
          e.style.backgroundColor = "rgb(180, 180, 180)"
        })
        changeTextAlign(id)
      })
    })

    styleIcons.forEach(e => {
      e.addEventListener("click", (e) => {
        let target
        if(e.target.classList.contains("fa-solid") || e.target.classList.contains("icon-overline")){
          target = e.target.parentNode      
          let computedValues = window.getComputedStyle(target) 
          const colorBg = computedValues.backgroundColor 
          if(colorBg === "rgb(180, 180, 180)"){
            target.style.backgroundColor = "rgb(216, 216, 216)"
          }else{
            target.style.backgroundColor = "rgb(180, 180, 180)"
          }
        }else{
          target = e.target
          let computedValues = window.getComputedStyle(target) 
          const colorBg = computedValues.backgroundColor 
          if(colorBg === "rgb(180, 180, 180)"){
            target.style.backgroundColor = "rgb(216, 216, 216)"
          }else{
            target.style.backgroundColor = "rgb(180, 180, 180)"
          }
        }  
        let id = target.getAttribute("id")
        changeTextStyle(id)
      })
    })

    checkBgColor.addEventListener("change", (e) => {
      if(e.target.checked){
        colorBg.removeAttribute("disabled")
        changeBgColorText(true,colorBg.value)
      }else{
        colorBg.setAttribute("disabled", "true")
        changeBgColorText(false,colorBg.value)
      }
    })

    checkOutlineColor.addEventListener("change", (e) => {
      if(e.target.checked){
        colorOutline.removeAttribute("disabled")
        changeOutlineColor(true,colorOutline.value)
      }else{
        colorOutline.setAttribute("disabled", "true")
        changeOutlineColor(false,colorOutline.value)
      }
    })

    colorText.addEventListener("change", (e) => {
      changeTextColor(e.target.value)
    })

    colorOutline.addEventListener("change", (e) => {
      changeOutlineColor(true,e.target.value)
    })

    colorBg.addEventListener("change", (e) => {
      changeBgColorText(true,e.target.value)
    })

    applyButton.addEventListener("click", () => {
      editFormContainer.style.display = "none";
    })


    cancelButton.addEventListener("click", () => {
      cancelTextStyle(opacity, fontSize, align, underline, overline, linethrough, fontStyle, color, bgColor, outline, top, left, width, height, fontFamily, strokeWidth, text)
      editFormContainer.style.display = "none";
    })


}

const canvasDrawingForm = (name, brush) => {
  if(brush !== "circle"){
    editFormContainer.style.display = "block";
    editFormContainer.style.height = "12.5rem";
  editFormContainer.style.overflowY = "hidden"
    editFormContainer.innerHTML = `<div class="heading-Container">${name}</div>
    <form>
      <div class="input-textContainer">
      <div class="input-sliderContainer">
      <label for="slider" class="label-Slider">Brush Thickness</label>
      <input type="range" name="slider" id="slider" value="9" min="1" max="100" class="sliderThick" >
      </div>
      <div class="input-mainContainer">
      <input type="number" name="thickness" id="thickness" value="9" min="1" max="100">
      </div>
      </div>
      <div class="colors-miniContainer">
      <label for="color">Color</label>
      <input type="color" name="color" id="color">
      </div>
      <div class="button-container">
      <button type="button" class="button-two canvas-brush-cancel">CANCEL</button>
    <button type="button" class="button-one canvas-brush-select">SELECT</button>
    </div>
      </form>`;  
  }else {
    editFormContainer.style.display = "block";
    editFormContainer.style.height = "9rem";
  editFormContainer.style.overflowY = "hidden"
    editFormContainer.innerHTML = `<div class="heading-Container">${name}</div>
    <form>
    <div class="colors-miniContainer">
    <label for="color">Color</label>
    <input type="color" name="color" id="color">
    </div>
    <div class="button-container">
    <button type="button" class="button-two canvas-brush-cancel">CANCEL</button>
  <button type="button" class="button-one canvas-brush-select">SELECT</button>
  </div>
  </form>`;  
  }


  const inputThickness = editFormContainer.querySelector("#thickness")
  const sliderThickness = editFormContainer.querySelector(".sliderThick") 
  const color = editFormContainer.querySelector("#color")
  const btnCancel = editFormContainer.querySelector(".canvas-brush-cancel")
  const btnSelect = editFormContainer.querySelector(".canvas-brush-select")
  
  if(brush !== "circle"){
      sliderThickness.addEventListener("input", (e) => {
        let numberValue = Number(e.target.value)
        inputThickness.value = numberValue
      })
      
      inputThickness.addEventListener("change", (e) => {
        let numberValue = Number(e.target.value)
        if(numberValue >= 1 && numberValue <= 100){
          sliderThickness.value = numberValue
        }
      })
    }

    btnSelect.addEventListener("click", () => {
  if(brush !== "circle"){
  addFreeDrawing(brush,color.value,sliderThickness.value)
  }else{
  addFreeDrawing(brush,color.value)
  }
  editFormContainer.style.display = "none";
    })

    btnCancel.addEventListener("click", () => {
  editFormContainer.style.display = "none";
    })

};

const canvasShapeForm = (name, opacity, outline, strokeWidth, color, shadow, top, left, width, height, radius, x1, y1, x2, y2, x3, y3, rx, ry) => {
  editFormContainer.style.display = "block";
  editFormContainer.style.height = "29rem";
  editFormContainer.style.overflowY = "scroll"

  editFormContainer.innerHTML = `<div class="heading-Container">${name}</div>
  <form>
  <div class="input-textContainer">
  <div class="input-sliderContainer">
  <label for="slider" class="label-Slider">Opacity</label>
  <input type="range" name="slider" id="slider" value=${opacity} min="0.1" step="0.1" max="1" class="sliderOpacity" >
  </div>
  <div class="input-mainContainer">
  <input type="number" name="opacity" id="opacity" value=${opacity} min="0.1" step="0.1" max="1">
  </div>
  </div>
    <div class="colors-miniContainer">
    <label for="color">Color</label>
    <input type="color" name="color" id="color" value=${color}>
    </div>
    <div class="straight-line shapes-line"></div>
    <div class="checkContainer">
    <input type="checkbox" name="shadow" class="checkbox" id="shadow">
    <label for="shadow">Shadow</label>
    </div>
    <div class="input-textContainer">
    <div class="input-sliderContainer">
    <label for="slider" class="label-Slider">Blur</label>
    <input type="range" name="slider" id="slider" value="30" min="1" max="80" class="sliderBlur" disabled="true">
    </div>
    <div class="input-mainContainer">
    <input type="number" name="blur" id="blur" value="30" min="1" max="80" disabled="true">
    </div>
    </div>  
    <div class="colors-miniContainer">
    <label for="colorShadow">Color</label>
    <input type="color" name="colorShadow" id="colorShadow" disabled="true">
    </div>
    <div class="input-textContainer">
    <div class="input-sliderContainer">
    <label for="slider" class="label-Slider">offsetX</label>
    <input type="range" name="slider" id="slider" value="5" min="1" max="30" class="sliderX" disabled="true">
    </div>
    <div class="input-mainContainer">
    <input type="number" name="offsetX" id="offsetX" value="5" min="1" max="30" disabled="true">
    </div>
    </div>  
    <div class="input-textContainer">
    <div class="input-sliderContainer">
    <label for="slider" class="label-Slider">offsetY</label>
    <input type="range" name="slider" id="slider" value="5" min="1" max="30" class="sliderY" disabled="true">
    </div>
    <div class="input-mainContainer">
    <input type="number" name="offsetY" id="offsetY" value="5" min="1" max="30" disabled="true">
    </div>
    </div>  
    <div class="straight-line shapes-line"></div>
    <div class="checkContainer">
    <input type="checkbox" name="border" class="checkbox" id="border">
    <label for="border">Border</label>
    </div>
    <div class="colors-miniContainer">
    <label for="colorBorder">Color</label>
    <input type="color" name="colorBorder" id="colorBorder" disabled="true">
    </div>
    <div class="input-textContainer">
    <div class="input-sliderContainer">
    <label for="slider" class="label-Slider">Width</label>
    <input type="range" name="slider" id="slider" value="5" min="1" max="40" class="sliderWidth" disabled="true">
    </div>
    <div class="input-mainContainer">
    <input type="number" name="border" id="width" value="5" min="1" max="40" disabled="true">
    </div>
    </div> 
    <div class="straight-line shapes-line"></div>
    <div class="button-container">
    <button type="button" class="button-two canvas-shape-cancel">CANCEL</button>
  <button type="button" class="button-one canvas-shape-apply">APPLY</button>
  </div>
  </form>`  

  const bgColor = editFormContainer.querySelector("#color")
  const sliderOpacity = editFormContainer.querySelector(".sliderOpacity") 
  const inputOpacity = editFormContainer.querySelector("#opacity")
  const sliderBlur = editFormContainer.querySelector(".sliderBlur") 
  const inputBlur = editFormContainer.querySelector("#blur")
  const sliderOffsetX = editFormContainer.querySelector(".sliderX") 
  const inputOffsetX = editFormContainer.querySelector("#offsetX")
  const sliderOffsetY = editFormContainer.querySelector(".sliderY") 
  const inputOffsetY = editFormContainer.querySelector("#offsetY")
  const sliderBorder = editFormContainer.querySelector(".sliderWidth") 
  const inputBorder = editFormContainer.querySelector("#width")
  const checkBoxShadow = editFormContainer.querySelector("#shadow")
  const checkBoxBorder = editFormContainer.querySelector("#border")
  const colorShadow = editFormContainer.querySelector("#colorShadow")
  const colorBorder = editFormContainer.querySelector("#colorBorder")
  const applyButton = editFormContainer.querySelector('.canvas-shape-apply')
  const cancelButton = editFormContainer.querySelector('.canvas-shape-cancel')

  if(outline !== "transparent"){
    checkBoxBorder.checked = true
    colorBorder.removeAttribute("disabled")
    sliderBorder.removeAttribute("disabled")
    inputBorder.removeAttribute("disabled")
    colorBorder.value = outline
    sliderBorder.value = strokeWidth 
    inputBorder.value = strokeWidth 
  }

  if(shadow !== null){
    checkBoxShadow.checked = true
    colorShadow.removeAttribute("disabled")
    sliderBlur.removeAttribute("disabled")
    inputBlur.removeAttribute("disabled")
    sliderOffsetX.removeAttribute("disabled")
    inputOffsetX.removeAttribute("disabled")
    sliderOffsetY.removeAttribute("disabled")
    inputOffsetY.removeAttribute("disabled")
    colorShadow.value = shadow.color
    sliderBlur.value = shadow.blur
    inputBlur.value = shadow.blur
    sliderOffsetX.value = shadow.offsetX
    inputOffsetX.value = shadow.offsetX
    sliderOffsetY.value = shadow.offsetY
    inputOffsetY.value = shadow.offsetY
  }

  checkBoxShadow.addEventListener("change", (e) => {
    if(e.target.checked){
      colorShadow.removeAttribute("disabled")
      sliderBlur.removeAttribute("disabled")
      inputBlur.removeAttribute("disabled")
      sliderOffsetX.removeAttribute("disabled")
      inputOffsetX.removeAttribute("disabled")
      sliderOffsetY.removeAttribute("disabled")
      inputOffsetY.removeAttribute("disabled")
      shapeShadowToggle(true, Number(sliderBlur.value), Number(sliderOffsetX.value), Number(sliderOffsetY.value), colorShadow.value)
    }else{
      colorShadow.setAttribute("disabled", "true")
      sliderBlur.setAttribute("disabled", "true")
      inputBlur.setAttribute("disabled", "true")
      sliderOffsetX.setAttribute("disabled", "true")
      inputOffsetX.setAttribute("disabled", "true")
      sliderOffsetY.setAttribute("disabled", "true")
      inputOffsetY.setAttribute("disabled", "true")
      shapeShadowToggle(false)
    }
  })

  checkBoxBorder.addEventListener("change", (e) => {
    if(e.target.checked){
      colorBorder.removeAttribute("disabled")
      sliderBorder.removeAttribute("disabled")
      inputBorder.removeAttribute("disabled")
      shapeBorderToggle(true, Number(sliderBorder.value), colorBorder.value)
    }else{
      colorShadow.setAttribute("disabled", "true")
      sliderBorder.setAttribute("disabled", "true")
      inputBorder.setAttribute("disabled", "true")
      shapeBorderToggle(false)
    }
  })


  bgColor.addEventListener("change", (e) => {
    changeShapeBgColor(e.target.value)
  })

  sliderOpacity.addEventListener("input", (e) => {
    let numberValue = Number(e.target.value)
    inputOpacity.value = numberValue
    changeShapeOpacity(numberValue)
  })

  inputOpacity.addEventListener("change", (e) => {
    let numberValue = Number(e.target.value)
    if(numberValue <= 1){
      sliderOpacity.value = numberValue
    changeShapeOpacity(numberValue)
    }
  })

  sliderBlur.addEventListener("input", (e) => {
    let numberValue = Number(e.target.value)
    inputBlur.value = numberValue
    changeShadowBlur(numberValue)
  })

  inputBlur.addEventListener("change", (e) => {
    let numberValue = Number(e.target.value)
    if(numberValue >= 1 && numberValue <= 80){
      sliderBlur.value = numberValue
    changeShadowBlur(numberValue)
    }
  })

  sliderOffsetX.addEventListener("input", (e) => {
    let numberValue = Number(e.target.value)
    inputOffsetX.value = numberValue
    changeShadowOffX(numberValue)
  })

  inputOffsetX.addEventListener("change", (e) => {
    let numberValue = Number(e.target.value)
    if(numberValue >= 1 && numberValue <= 30){
      sliderOffsetX.value = numberValue
    changeShadowOffX(numberValue)
    }
  })

  sliderOffsetY.addEventListener("input", (e) => {
    let numberValue = Number(e.target.value)
    inputOffsetY.value = numberValue
    changeShadowOffY(numberValue)
  })

  inputOffsetY.addEventListener("change", (e) => {
    let numberValue = Number(e.target.value)
    if(numberValue >= 1 && numberValue <= 30){
      sliderOffsetY.value = numberValue
    changeShadowOffY(numberValue)
    }
  })

  colorShadow.addEventListener("change", (e) => {
    changeShadowColor(e.target.value)
  })

  sliderBorder.addEventListener("input", (e) => {
    let numberValue = Number(e.target.value)
    inputBorder.value = numberValue
    changeBorderWidth(numberValue)
  })

  inputBorder.addEventListener("change", (e) => {
    let numberValue = Number(e.target.value)
    if(numberValue >= 1 && numberValue <= 40){
      sliderBorder.value = numberValue
      changeBorderWidth(numberValue)
    }
  })

  colorBorder.addEventListener("change", (e) => {
    changeBorderColor(e.target.value)
  })

  applyButton.addEventListener("click", () => {
    editFormContainer.style.display = "none";
  })

  cancelButton.addEventListener("click", () => {
    cancelShapeButton(opacity, outline, strokeWidth, color, shadow, top, left, width, height, radius, x1, y1, x2, y2, x3, y3, rx, ry)
  })

};


export {
  CanvasFormColor,
  canvasResizeForm,
  canvasObjectsRotate,
  canvasCropForm,
  canvasTextForm,
  canvasDrawingForm,
  canvasShapeForm,
};

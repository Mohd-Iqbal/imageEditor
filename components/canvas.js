import { fabric } from "fabric";
import { setOnCanvas } from "./slider";
import { layersContent } from "./layers";
import { changeStyle } from "./tabs";
import { canvasTextForm, canvasDrawingForm, canvasShapeForm} from "./editForm"
import Croppie from "croppie";

const canvasContainer = document.querySelector(".canvasContainer");
const cropButtonContainer = document.querySelector(".Crop-button-container");
const editFormContainer = document.querySelector(".editFormContainer")
let mainContainer = document.querySelector(".layers-mainContainer");

let checkCroppie = undefined;
let canvasObjects = [];
let indexText
let layerShapeName 

const getCroppie = (croppie) => {
  checkCroppie = croppie;
};

const changeTab = (children, firstElement, string) => {
  for(let i = 0; i < children.length; i++){
    if(children[i].children[1].textContent === string){
        changeStyle(children[i],string)
    }else{
      if(firstElement){
        firstElement.removeAttribute("id")
      }
            children[i].classList.remove("change-iconContainer")
            children[i].classList.add("mini-iconsContainer")
        }
}
}

const returningProperties = (selected) =>{
  let opacity = selected?.opacity
  let fontSize = selected?.fontSize
  let align = selected?.textAlign
 let underline = selected?.underline
 let overline = selected?.overline
 let linethrough = selected?.linethrough
 let fontStyle = selected?.fontStyle
 let color = selected?.fill
 let bgColor = selected?.backgroundColor
 let outline = selected?.stroke
 let top = selected?.top
 let left = selected?.left
 let width = selected?.width
 let height = selected?.height
 let fontFamily = selected?.fontFamily
 let strokeWidth = selected?.strokeWidth
 let text = selected?.text
 let shadow = selected?.shadow
 let radius = selected?.radius
 let x1 = selected?.x1
 let y1 = selected?.y1
 let x2 = selected?.x2
 let y2 = selected?.y2
 let x3 = selected?.x3
 let y3 = selected?.y3
 let rx = selected?.rx
 let ry = selected?.ry

  return {opacity, fontSize, align, underline, overline, linethrough, fontStyle, color, bgColor, outline, top, left, width, height, fontFamily, strokeWidth, text, shadow, radius, x1, y1, x2, y2, x3, y3, rx, ry}
}

const element = document.querySelector(".iconsContainer")
function onObjectSelected(e) {
  if(e.selected.length === 1){
    const children = element.children
    const selectedObject = e.selected[0]
    const firstElement = document.querySelector("#ele0")
    if(e.selected[0].styles){
      let string = "TEXT" 
      changeTab(children, firstElement, string)
     const {opacity, fontSize, align, underline, overline, linethrough, fontStyle, color, bgColor, outline, top, left, width, height, fontFamily, strokeWidth, text} = returningProperties(e.selected[0])

     canvasTextForm(string, opacity, fontSize, align, underline, overline, linethrough, fontStyle, color, bgColor, outline, top, left, width, height, fontFamily, strokeWidth, text)

     indexText = canvasObjects.findIndex(e => e.object === selectedObject)
    }else if(e.selected[0].strokeLineCap === "round"){
      let string = "DRAWING" 
      changeTab(children, firstElement, string)
    }else if(e.selected[0]._objects){
      let string = "DRAWING" 
      changeTab(children, firstElement, string)
    }else if(e.selected[0].filters){
      let string = "FILTERS" 
      changeTab(children, firstElement, string)
    }else{
      let string = "SHAPES" 
      changeTab(children, firstElement, string)

      const {opacity, outline, strokeWidth, color, shadow, top, left, width, height, radius, x1, y1, x2, y2, x3, y3, rx, ry}  = returningProperties(e.selected[0])

      canvasShapeForm(string, opacity, outline, strokeWidth, color, shadow, top, left, width, height, radius, x1, y1, x2, y2, x3, y3, rx, ry)
     indexText = canvasObjects.findIndex(e => e.object === selectedObject)
     layerShapeName = canvasObjects[indexText].objectName
    }
  }
}


// store the originalSize of canvas so that originalSize icon can set it
let originalSize = {
  width: 0,
  height: 0,
};

let canvas;
// creating canvas with just the width and height
const createCanvas = (width, height, originalWidth, originalHeight) => {
  if (checkCroppie) {
    checkCroppie.destroy();
    cropButtonContainer.style.display = "none";
    checkCroppie = undefined;
  }
  // we do this so that we can have only one canvas element
  canvasContainer.innerHTML = ``;
  const lowerCanvas = document.createElement("canvas");
  lowerCanvas.id = "canvas";
  lowerCanvas.style.boxShadow = "0 0 10px 4px rgba(0, 0, 0, 0.20)";
  canvasContainer.append(lowerCanvas);

  // saving original size values
  originalSize.width = originalWidth;
  originalSize.height = originalHeight;

  canvasObjects = [];
  mainContainer.innerHTML = layersContent(canvasObjects);

  canvas = new fabric.Canvas("canvas", {
    width: width,
    height: height,
  });

  let src = "/canvas-bg.png";
  canvas.setBackgroundColor({ source: src, repeat: "repeat" }, function () {
    canvas.renderAll();
  });
  
      canvas.on('selection:created', onObjectSelected);
      canvas.on('selection:updated', onObjectSelected);
  
  // return canvas so that we can either create new canvas with image or just create image and add it to canvas
  return canvas;
};

// originalsize icon logic
const setOriginalSize = () => {
  if (canvas) {
    canvas.setWidth(originalSize.width);
    canvas.setHeight(originalSize.height);
    setOnCanvas(100);
    const obj = JSON.parse(localStorage.getItem("prt"));
    if (obj.percentage) {
      obj.percentage = 100;
    }
    localStorage.setItem("prt", JSON.stringify(obj));
    window.dispatchEvent(new Event("storage"));
  }
};

const setEventListenerOnLayers = (children) => {
  children.forEach((e) => {
    e.addEventListener("dragstart", startDragging);
    e.addEventListener("dragend", endDragging);
    e.parentNode.parentNode.addEventListener("dragover", draggingOver);
    e.parentNode.parentNode.addEventListener("drop", draggingDrop);
    let object = e.children[3].children[0].textContent;
    e.children[0].children[0].addEventListener("click", (e) =>
      objectVisibility(e, object)
    );
    e.children[1].children[0].addEventListener("click", (e) =>
      objectDelete(e, object)
    );
    e.children[2].children[0].addEventListener("click", (e) =>
      objectLock(e, object)
    );
  });
};

const startDragging = (e) => {
  e.target.style.opacity = "0.5";
  e.target.classList.add("dragElement");
};

const endDragging = (e) => {
  e.target.style.opacity = "1";
  e.target.classList.remove("dragElement");
};

let initailPosition, finalPosition;
const draggingOver = (e) => {
  e.preventDefault();
  const container = e.target;
  const dragElement = container.querySelector(".dragElement");
  const dragElements = Array.from(
    container.querySelectorAll(".layers-miniContainer:not(.dragElement)")
  );

  if (dragElements[0]) {
    let mouseY = e.clientY;
    const element = dragElements.filter((e) => {
      const eDimensions = e.getBoundingClientRect();
      if (mouseY) {
        if (eDimensions.top - mouseY <= 10 && eDimensions.top - mouseY >= -5) {
          return e;
        } else {
          return;
        }
      } else {
        return;
      }
    });
    initailPosition = Number(dragElement?.children[3].children[0].textContent);
    finalPosition = Number(element[0]?.children[3].children[0].textContent);
  }
};

const draggingDrop = (e) => {
  if (
    typeof initailPosition === "number" &&
    typeof finalPosition === "number"
  ) {
    const items = canvas.getObjects();
    canvas.moveTo(items[initailPosition], finalPosition);
    const removeItem = canvasObjects.splice(initailPosition, 1);
    canvasObjects.splice(finalPosition, 0, removeItem[0]);
    canvas.renderAll();
    mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
      canvasObjects
    ).join(" ")}</div>`;
    const children = Array.from(mainContainer.children[0].children);
    setEventListenerOnLayers(children);
  }
};

const objectVisibility = (e, object) => {
  if (canvas) {
    const computedValues = window.getComputedStyle(e.target);
    if (computedValues.color === "rgb(68, 68, 68)") {
      e.target.style.color = "rgb(143, 143, 143)";
    } else {
      e.target.style.color = "rgb(68, 68, 68)";
    }
    const items = canvas.getObjects();
    let isVisible = items[object].visible;
    items[object].set({ visible: !isVisible });
    const layerName = canvasObjects[object].objectName;
    canvasObjects.splice(object, 1, {
      object: items[object],
      objectName: layerName,
    });
    canvas.renderAll();
  }
};

const objectLock = (e, object) => {
  if (canvas) {
    const computedValues = window.getComputedStyle(e.target);
    if (computedValues.color === "rgb(143, 143, 143)") {
      e.target.style.color = "rgb(68, 68, 68)";
    } else {
      e.target.style.color = "rgb(143, 143, 143)";
    }
    let selectedObject = canvas.getActiveObject();
    const items = canvas.getObjects();
    let isLock = items[object].selectable;
    if (selectedObject && selectedObject === items[object]) {
      canvas.discardActiveObject();
      items[object].set({ selectable: !isLock });
      const layerName = canvasObjects[object].objectName;
      canvasObjects.splice(object, 1, {
        object: items[object],
        objectName: layerName,
      });
    } else {
      items[object].set({ selectable: !isLock });
      const layerName = canvasObjects[object].objectName;
      canvasObjects.splice(object, 1, {
        object: items[object],
        objectName: layerName,
      });
    }
    canvas.renderAll();
  }
};

const objectDelete = (e, object) => {
  if (canvas) {
    const items = canvas.getObjects();
    const obj = items[object];
    canvas.remove(obj);
    canvas.renderAll();
    canvasObjects.splice(object, 1);
    const elements = layersContent(canvasObjects);
    if (typeof elements === "string") {
      mainContainer.innerHTML = elements;
    } else if (Array.isArray(elements)) {
      mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
        canvasObjects
      ).join(" ")}</div>`;
      const children = Array.from(mainContainer.children[0].children);
      setEventListenerOnLayers(children);
    }
  }
};

// creating canvas with image
const createCanvasWithImage = (
  width,
  height,
  originalWidth,
  originalHeight,
  img
) => {
  canvasContainer.innerHTML = ``;
  const loweCanvas = document.createElement("canvas");
  loweCanvas.id = "canvas";
  loweCanvas.style.boxShadow = "0 0 10px 4px rgba(0, 0, 0, 0.20)";
  canvasContainer.append(loweCanvas);

  originalSize.width = originalWidth;
  originalSize.height = originalHeight;

  canvas = new fabric.Canvas("canvas", {
    width: width,
    height: height,
  });

  let src = "/canvas-bg.png";
  canvas.setBackgroundColor({ source: src, repeat: "repeat" }, function () {
    canvas.renderAll();
  });

  const imageInstance = new fabric.Image(img, {
    left: 0,
    top: 0,
    visible: true,
    selectable: true,
  });

  canvas.add(imageInstance);
  canvas.renderAll();
  canvas.on('selection:created', onObjectSelected);
  canvas.on('selection:updated', onObjectSelected);
  var items = canvas.getObjects();
  canvasObjects.push({ object: items[0], objectName: "Image" });
  mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
    canvasObjects
  ).join(" ")}</div>`;
  let objectIndex =
    mainContainer.children[0].children[0].children[3].children[0].textContent;
  let eye = mainContainer.children[0].children[0].children[0].children[0];
  eye.addEventListener("click", (e) => objectVisibility(e, objectIndex));
  let lock = mainContainer.children[0].children[0].children[2].children[0];
  lock.addEventListener("click", (e) => objectLock(e, objectIndex));
  let deleteEle = mainContainer.children[0].children[0].children[1].children[0];
  deleteEle.addEventListener("click", (e) => objectDelete(e, objectIndex));

  return canvas;
};

// adding image to existing canvas
const addImage = (img) => {
  if (canvas && !checkCroppie) {
    const imageInstance = new fabric.Image(img, {
      left: 0,
      top: 0,
      visible: true,
      selectable: true,
    });
    canvas.isDrawingMode = false;
    imageInstance.bringToFront();
    canvas.add(imageInstance);
    canvas.renderAll();
    var items = canvas.getObjects();
    canvasObjects.push({
      object: items[items.length - 1],
      objectName: "Image",
    });
    mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
      canvasObjects
    ).join(" ")}</div>`;
    const children = Array.from(mainContainer.children[0].children);
    setEventListenerOnLayers(children);
  }
};

const addShapes = (shapeName) => {
  if (canvas && !checkCroppie) {
    let shape;
    const size = 100;
    if (shapeName === "Circle") {
      shape = new fabric.Circle({
        top: 80,
        left: 100,
        radius: size / 2,
        fill: "#444444",
        stroke: "transparent",
        shadow: null,
        visible: true,
        selectable: true,
      });
    } else if (shapeName === "Rectangle") {
      shape = new fabric.Rect({
        top: 90,
        left: 100,
        width: size,
        height: size / 1.5,
        fill: "#444444",
        stroke: "transparent",
        shadow: null,
        visible: true,
        selectable: true,
      });
    } else if (shapeName === "Triangle") {
      shape = new fabric.Triangle({
        top: 100,
        left: 100,
        x1: 250,
        y1: 100,
        x2: 200 + size / 2,
        y2: 200 + size,
        x3: 300 - size / 2,
        y3: 200 + size,
        shadow: null,
        stroke: "transparent",
        fill: "#444444",
        visible: true,
        selectable: true,
      });
    } else if (shapeName === "Ellipse") {
      shape = new fabric.Ellipse({
        top: 110,
        left: 100,
        rx: size / 2,
        ry: size / 3.5,
        fill: "#444444",
        stroke: "transparent",
        shadow: null,
        visible: true,
        selectable: true,
      });
    }
    canvas.isDrawingMode = false;
    shape.bringToFront();
    canvas.add(shape);
    canvas.renderAll();
    var items = canvas.getObjects();
    canvasObjects.push({
      object: items[items.length - 1],
      objectName: shapeName,
    });
    mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
      canvasObjects
    ).join(" ")}</div>`;
    const children = Array.from(mainContainer.children[0].children);
    setEventListenerOnLayers(children);
  }
};

const addTextContainer = (e, textContainers, font, element) => {
  if (canvas && !checkCroppie) {
    let text;
    textContainers.forEach((e) => {
      if (e === element) {
        text = new fabric.Textbox("Your Text Here", {
          top: 10,
          left: 10,
          width: 200,
          fontSize: 16,
          fill: "black",
          fontFamily: font,
          textAlign: 'left',
          backgroundColor: 'transparent',
          stroke: "transparent",
          hasControls: true,
          visible: true,
          selectable: true,
        });
      }
    });
    canvas.isDrawingMode = false;
    text.bringToFront();
    canvas.add(text);
    canvas.renderAll();
    var items = canvas.getObjects();
    canvasObjects.push({ object: items[items.length - 1], objectName: "Text" });
    mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
      canvasObjects
    ).join(" ")}</div>`;
    const children = Array.from(mainContainer.children[0].children);
    setEventListenerOnLayers(children);
  }
};

const brushSelect = (brush) => {
canvasDrawingForm("DRAWING", brush)
}

let lengthInitial
const addFreeDrawing = (brush, color, width) => {
  if (canvas && !checkCroppie) {
    let MyPatternBrush;
    if (brush === "pencil") {
      canvas.isDrawingMode = true;
      MyPatternBrush = new fabric.PencilBrush(canvas);
      MyPatternBrush.width = width;
      MyPatternBrush.color = color;
      MyPatternBrush.visible = true;
      MyPatternBrush.selectable = true;
    } else if (brush === "circle") {
      canvas.isDrawingMode = true;
      MyPatternBrush = new fabric.CircleBrush(canvas);
      MyPatternBrush.color = color;
      MyPatternBrush.visible = true;
      MyPatternBrush.selectable = true;
    } else if (brush === "spray") {
      canvas.isDrawingMode = true;
      MyPatternBrush = new fabric.SprayBrush(canvas);
      MyPatternBrush.width = width; 
      MyPatternBrush.color = color;
      MyPatternBrush.visible = true;
      MyPatternBrush.selectable = true;
    }
    canvas.freeDrawingBrush = MyPatternBrush;
    canvas.renderAll();
    const items = canvas.getObjects();
    lengthInitial = items.length
    AppEvent();
  }
};

const App = document.querySelector(".App");

const laterListener = () => {
  if (canvas) {
    const items = canvas.getObjects();
    let length = items.length
    if(length > 0 && length === lengthInitial + 1){      
      canvas.isDrawingMode = false;
      canvasObjects.push({
        object: items[items.length - 1],
        objectName: "Drawing",
      });
      mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
        canvasObjects
        ).join(" ")}</div>`;
        const children = Array.from(mainContainer.children[0].children);
        setEventListenerOnLayers(children);
      }else{
      canvas.isDrawingMode = false;
      }
  }
  App.removeEventListener("click", laterListener);
};

const initialListener = () => {
  App.removeEventListener("click", initialListener);
  App.addEventListener("click", laterListener);
};

const AppEvent = () => {
  App.addEventListener("click", initialListener);
};

const canvasResize = (width, height) => {
  if (canvas) {
    canvas.setWidth(Number(width));
    canvas.setHeight(Number(height));
    originalSize.width = Number(width);
    originalSize.height = Number(height);
    setOnCanvas(100);
    const obj = {
      widthPercentage: Number(width),
      heightPercentage: Number(height),
      widthCalc: Math.floor(Number(width) / 100),
      heightCalc: Math.floor(Number(height) / 100),
      percentage: 100,
    };
    localStorage.setItem("prt", JSON.stringify(obj));
    window.dispatchEvent(new Event("storage"));
  }
};

// logic for the slider
const canvasSize = (value, width, height) => {
  if (canvas) {
    let currentWidth = canvas.getWidth();
    let currentHeight = canvas.getHeight();
    let newWidth = Math.floor(currentWidth + width * value);
    let newheight = Math.floor(currentHeight + height * value);
    canvas.setWidth(newWidth);
    canvas.setHeight(newheight);
    canvas.renderAll();
  }
};

let newColor;
const canvasColorChange = (color) => {
  if (canvas) {
    canvas.backgroundColor = color;
    canvas.renderAll();
  }
};

const applyColorChange = (color) => {
  if (canvas) {
    newColor = color;
    canvas.backgroundColor = newColor;
    canvas.renderAll();
  }
};

const cancelChangeColor = () => {
  if (canvas) {
    if (newColor) {
      canvas.backgroundColor = newColor;
      canvas.renderAll();
    } else {
      let src = "/canvas-bg.png";
      canvas.setBackgroundColor({ source: src, repeat: "repeat" }, function () {
        canvas.renderAll();
      });
    }
  }
};

let object;
const rotateObject = (angle) => {
  let items = canvas.getObjects();
  if (canvas) {
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      activeObject.rotate(angle);
      canvas.renderAll();
      object = activeObject;
    } else {
      const lastObject = items[items.length - 1];
      lastObject.rotate(angle);
      canvas.renderAll();
      object = lastObject;
    }
  }
};

const applyRotateObject = (angle) => {
  if (canvas && object) {
    object.rotate(angle);
    canvas.renderAll();
  }
};

const cancelRotate = () => {
  if (canvas && object) {
    object.rotate(0);
    canvas.renderAll();
  }
};

const getDimensionsCrop = () => {
  if (canvas) {
    let width = canvas.getWidth();
    let height = canvas.getHeight();
    return { width, height };
  }
};

let croppie;

const canvasCrop = (widthBoundry, heightBoundry) => {
  if (canvas && !checkCroppie) {
    canvasContainer.innerHTML = "";
    const dataURL = canvas.toDataURL("image/jpeg", 1);
    let imgElement = new Image();
    imgElement.src = dataURL;

    croppie = new Croppie(canvasContainer, {
      viewport: { width: 300, height: 300 },
      boundary: { width: widthBoundry, height: heightBoundry },
      showZoomer: false,
      enableResize: true,
      enableOrientation: true,
      mouseWheelZoom: "ctrl",
    });
    croppie.bind({
      url: imgElement.src,
    });
    editFormContainer.style.display = "none"
    getCroppie(croppie);
  }
};

const cancelCrop = () => {
  croppie.destroy();
  let prevCanvas = canvas;

  let widthPercentageNew = Math.floor((70 / 100) * originalSize.width);
  let heightPercentageNew = Math.floor((70 / 100) * originalSize.height);
  let percentageNew = 70;

  let widthCalcNew = Math.floor(originalSize.width / 100);
  let heightCalcNew = Math.floor(originalSize.height / 100);

  setOnCanvas(percentageNew);

  canvasContainer.innerHTML = ``;
  const lowerCanvas = document.createElement("canvas");
  lowerCanvas.id = "canvas";
  lowerCanvas.style.boxShadow = "0 0 10px 4px rgba(0, 0, 0, 0.20)";
  canvasContainer.append(lowerCanvas);

  canvas = new fabric.Canvas("canvas", {
    width: widthPercentageNew,
    height: heightPercentageNew,
  });

  if (typeof prevCanvas.backgroundColor === "string") {
    canvas.backgroundColor = prevCanvas.backgroundColor;
  } else {
    let src = "/canvas-bg.png";
    canvas.setBackgroundColor({ source: src, repeat: "repeat" }, function () {
      canvas.renderAll();
    });
  }

  prevCanvas.getObjects().forEach(function (object) {
    var clonedObject = fabric.util.object.clone(object);
    canvas.add(clonedObject);
  });

  canvas.renderAll();
  canvas.on('selection:created', onObjectSelected);
  canvas.on('selection:updated', onObjectSelected);

  const elements = layersContent(canvasObjects);
  if (typeof elements === "string") {
    mainContainer.innerHTML = elements;
  } else if (Array.isArray(elements)) {
    mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
      canvasObjects
    ).join(" ")}</div>`;
    const children = Array.from(mainContainer.children[0].children);
    setEventListenerOnLayers(children);
  }

  cropButtonContainer.style.display = "none";
  editFormContainer.style.display = "none"


  checkCroppie = undefined;

  localStorage.setItem(
    "prt",
    JSON.stringify({
      widthPercentage: widthPercentageNew,
      heightPercentage: heightPercentageNew,
      widthCalc: widthCalcNew,
      heightCalc: heightCalcNew,
      percentage: percentageNew,
    })
  );
  window.dispatchEvent(new Event("storage"));
};

const croppingCanvas = async () => {
  try {
    let prevCanvas = canvas;
    const blob = await croppie.result({ type: "blob", format: "jpeg" });

    croppie.destroy();

    let widthPercentageNew = Math.floor((70 / 100) * originalSize.width);
    let heightPercentageNew = Math.floor((70 / 100) * originalSize.height);
    let percentageNew = 70;

    let widthCalcNew = Math.floor(originalSize.width / 100);
    let heightCalcNew = Math.floor(originalSize.height / 100);

    setOnCanvas(percentageNew);

    canvasContainer.innerHTML = ``;
    const lowerCanvas = document.createElement("canvas");
    lowerCanvas.id = "canvas";
    lowerCanvas.style.boxShadow = "0 0 10px 4px rgba(0, 0, 0, 0.20)";
    canvasContainer.append(lowerCanvas);

    canvas = new fabric.Canvas("canvas", {
      width: widthPercentageNew,
      height: heightPercentageNew,
    });

    if (typeof prevCanvas.backgroundColor === "string") {
      canvas.backgroundColor = prevCanvas.backgroundColor;
    } else {
      let src = "/canvas-bg.png";
      canvas.setBackgroundColor({ source: src, repeat: "repeat" }, function () {
        canvas.renderAll();
      });
    }

    fabric.Image.fromURL(URL.createObjectURL(blob), function (Img) {
      Img.set({
        left: 0,
        top: 0,
        visible: true,
        selectable: true,
      });

      canvas.add(Img);
      canvas.renderAll();
      canvas.on('selection:created', onObjectSelected);
      canvas.on('selection:updated', onObjectSelected);
      var items = canvas.getObjects();
      canvasObjects = [];
      canvasObjects.push({ object: items[0], objectName: "Crop Image" });
      mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
        canvasObjects
      ).join(" ")}</div>`;
      let objectIndex =
        mainContainer.children[0].children[0].children[3].children[0]
          .textContent;
      let eye = mainContainer.children[0].children[0].children[0].children[0];
      eye.addEventListener("click", (e) => objectVisibility(e, objectIndex));
      let lock = mainContainer.children[0].children[0].children[2].children[0];
      lock.addEventListener("click", (e) => objectLock(e, objectIndex));
      let deleteEle =
        mainContainer.children[0].children[0].children[1].children[0];
      deleteEle.addEventListener("click", (e) => objectDelete(e, objectIndex));
    });

    cropButtonContainer.style.display = "none";
    editFormContainer.style.display = "none"


    localStorage.setItem(
      "prt",
      JSON.stringify({
        widthPercentage: widthPercentageNew,
        heightPercentage: heightPercentageNew,
        widthCalc: widthCalcNew,
        heightCalc: heightCalcNew,
        percentage: percentageNew,
      })
    );

    checkCroppie = undefined;
    window.dispatchEvent(new Event("storage"));
  } catch (error) {
  }
};

const applyFilter = (filterName) => {
  if(canvas){
    const activeObject = canvas.getActiveObject()
    if(activeObject?.filters){
      const object = canvasObjects.findIndex(e => e.object === activeObject)
    const layerName = canvasObjects[object].objectName;
      if(activeObject?.filters.length !== 0){
      const present = activeObject.filters.every(e => e.type !== filterName)
      if(present){
        let filter = new fabric.Image.filters[filterName]
        activeObject.filters.push(filter)
        activeObject.applyFilters()
        canvas.renderAll()    
        canvasObjects.splice(object, 1, {
          object: activeObject,
          objectName: layerName,
        });
      }else{
        let arrayFilter = activeObject.filters.filter(e => e.type !== filterName) 
        activeObject.filters = arrayFilter
        activeObject.applyFilters()
        canvas.renderAll()    
        canvasObjects.splice(object, 1, {
          object: activeObject,
          objectName: layerName,
        });
      }      
    }else {
      let filter = new fabric.Image.filters[filterName]
      activeObject.filters.push(filter)
       activeObject.applyFilters()
      canvas.renderAll() 
      canvasObjects.splice(object, 1, {
        object: activeObject,
        objectName: layerName,
      });
    }
  }
  }
}


let textContainerStyled
const changeFontSize = (size) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && textContainerStyled.styles){
      textContainerStyled.set({fontSize: size})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: "Text",
      });
      canvas.renderAll()
    } 
  }
}

const changeOpacityText = (opacity) => {
  if(canvas){
    let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && textContainerStyled.styles){
      textContainerStyled.set({opacity: opacity})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: "Text",
      });
      canvas.renderAll()
    } 
  }
} 

const changeTextColor = (color) => {
  if(canvas){
    let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && textContainerStyled.styles){
      textContainerStyled.set({fill: color})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: "Text",
      });
      canvas.renderAll()
    } 
  }
}

const changeOutlineColor = (apply,color) => {
  if(canvas){
    let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && textContainerStyled.styles){
      if(apply){
        textContainerStyled.set({stroke: color, strokeWidth: 2})
      }else{
        textContainerStyled.set({stroke: "transparent"})
      }
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: "Text",
      });
      canvas.renderAll()
    } 
  }
}

const changeBgColorText = (apply,color) => {
  if(canvas){
    let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && textContainerStyled.styles){
      if(apply){
        textContainerStyled.set({backgroundColor: color})
      }else{
        textContainerStyled.set({backgroundColor: "transparent"})
      }
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: "Text",
      });
      canvas.renderAll()
    } 
  }
}

const changeTextAlign = (align) => {
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && textContainerStyled.styles){
      textContainerStyled.set({textAlign: align})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: "Text",
      });
      canvas.renderAll()
    } 
}

const changeTextStyle = (style) => {
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && textContainerStyled.styles){
      if(style === "underline"){
        let stylePresent = textContainerStyled[style]
        textContainerStyled.set({ underline: !stylePresent})
      }else if(style === "overline"){
        let stylePresent = textContainerStyled[style]
        textContainerStyled.set({ overline: !stylePresent})
      }else if(style === "line-through"){
        let stylePresent = textContainerStyled.linethrough
        textContainerStyled.set({ linethrough: !stylePresent})
      }else{
        let fontStyling = textContainerStyled.fontStyle 
        if(fontStyling === "normal"){
        textContainerStyled.set({ fontStyle: style})
        }else{
        textContainerStyled.set({ fontStyle: "normal"})
        }
      }
      canvas.renderAll()
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: "Text",
      });
    } 
}

const cancelTextStyle = (opacity, fontSize, align, underline, overline, linethrough, fontStyle, color, bgColor, outline, top, left, width, height, fontFamily, strokeWidth, textContent) => {
  if(canvas){
   let text = new fabric.Textbox(textContent, {
      top: top,
      left: left,
      width: width,
      height: height,
      fontSize: fontSize,
      fill: color,
      fontFamily: fontFamily,
      textAlign: align,
      backgroundColor: bgColor,
      stroke: outline,
      strokeWidth: strokeWidth,
      hasControls: true,
      visible: true,
      selectable: true,
      underline: underline,
      overline: overline,
      linethrough: linethrough,
      fontStyle: fontStyle,
      opacity: opacity,
    });
    const items = canvas.getObjects();
    const obj = items[indexText];
    canvas.remove(obj);
    canvas.add(text)
    canvas.moveTo(text, indexText);
    canvas.renderAll()
    canvasObjects.splice(indexText, 1, {
      object: text,
      objectName: "Text",
    });
    mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
      canvasObjects
    ).join(" ")}</div>`;
    const children = Array.from(mainContainer.children[0].children);
    setEventListenerOnLayers(children);
  }
}

const changeShapeOpacity = (opacity) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      textContainerStyled.set({opacity: opacity})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const changeShapeBgColor = (color) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      textContainerStyled.set({fill: color})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const shapeShadowToggle = (apply, blur, offsetX, offsetY, color) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      if(apply){
        textContainerStyled.set({shadow: {
          color: color, blur: blur, offsetX, offsetX, offsetY, offsetY
        }})
      }else{
        textContainerStyled.set({shadow: null})       
      }
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const changeShadowBlur = (blur) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      const obj = {...textContainerStyled.shadow, blur: blur}
        textContainerStyled.set({shadow: obj})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const changeShadowColor = (color) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      const obj = {...textContainerStyled.shadow, color: color}
      textContainerStyled.set({shadow: obj})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const changeShadowOffX = (offsetX) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      const obj = {...textContainerStyled.shadow, offsetX: offsetX}
      textContainerStyled.set({shadow: obj})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const changeShadowOffY = (offsetY) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      const obj = {...textContainerStyled.shadow, offsetY: offsetY}
        textContainerStyled.set({shadow: obj})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const shapeBorderToggle = (apply, width, stroke) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      if(apply){
        textContainerStyled.set({stroke: stroke, strokeWidth: width})
      }else{
        textContainerStyled.set({stroke: "transparent", strokeWidth: 0})       
      }
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const changeBorderColor = (color) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      textContainerStyled.set({stroke: color})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const changeBorderWidth = (width) => {
  if(canvas){
  let object = canvas.getActiveObject()
  textContainerStyled = object
    if(textContainerStyled && !textContainerStyled.styles){
      textContainerStyled.set({strokeWidth: width})
      canvasObjects.splice(indexText, 1, {
        object: textContainerStyled,
        objectName: layerShapeName,
      });
      canvas.renderAll()
    } 
  }
}

const cancelShapeButton = (opacity, outline, strokeWidth, color, shadow, top, left, width, height, radius, x1, y1, x2, y2, x3, y3, rx, ry) => {
  let shape
  if (layerShapeName === "Circle") {
    shape = new fabric.Circle({
      top: top,
      left: left,
      radius: radius,
      fill: color,
      stroke: outline,
      strokeWidth: strokeWidth,
      shadow: shadow,
      opacity: opacity,
      visible: true,
      selectable: true,
    });
  } else if (layerShapeName === "Rectangle") {
    shape = new fabric.Rect({
      top: top,
      left: left,
      width: width,
      height: height,
      fill: color,
      stroke: outline,
      strokeWidth: strokeWidth,
      opacity: opacity,
      shadow: shadow,
      visible: true,
      selectable: true,
    });
  } else if (layerShapeName === "Triangle") {
    shape = new fabric.Triangle({
      top: top,
      left: left,
      fill: color,
      stroke: outline,
      strokeWidth: strokeWidth,
      opacity: opacity,
      shadow: shadow,
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      x3: x3,
      y3: y3,
      visible: true,
      selectable: true,
    });
  } else if (layerShapeName === "Ellipse") {
    shape = new fabric.Ellipse({
      top: top,
      left: left,
      fill: color,
      stroke: outline,
      strokeWidth: strokeWidth,
      opacity: opacity,
      shadow: shadow,
      rx: rx,
      ry: ry,
      visible: true,
      selectable: true,
    });
  }
  const items = canvas.getObjects();
  const obj = items[indexText];
  canvas.remove(obj);
  canvas.add(shape)
  canvas.moveTo(shape, indexText);
  canvas.renderAll()
  canvasObjects.splice(indexText, 1, {
    object: shape,
    objectName: layerShapeName,
  });
  mainContainer.innerHTML = `<div class="layers-Box">${layersContent(
    canvasObjects
  ).join(" ")}</div>`;
  const children = Array.from(mainContainer.children[0].children);
  setEventListenerOnLayers(children);
  editFormContainer.style.display = "none"
}

const saveImage = (e, format, fileName, quality) =>  {
  if(canvas){
    let dataURL
    if(format === "PNG"){
    dataURL = canvas.toDataURL({format: "png"});
    if(fileName === ''){
      e.target.download = `Image`
      e.target.href = dataURL
    }else{
      e.target.download = `${fileName}`
      e.target.href = dataURL
    }
    }else if(format !== "PNG"){
    dataURL = canvas.toDataURL({format: 'jpeg',quality: quality});
    if(fileName === ''){
      e.target.download = `Image`
      e.target.href = dataURL
    }else{
      e.target.download = `${fileName}`
      e.target.href = dataURL
    }
    }
    
  }
}

export default canvas;
export {
  createCanvas,
  setOriginalSize,
  canvasSize,
  createCanvasWithImage,
  addImage,
  addShapes,
  objectVisibility,
  objectLock,
  addTextContainer,
  addFreeDrawing,
  cancelChangeColor,
  canvasColorChange,
  applyColorChange,
  canvasResize,
  rotateObject,
  applyRotateObject,
  cancelRotate,
  getDimensionsCrop,
  canvasCrop,
  cancelCrop,
  croppingCanvas,
  applyFilter,
  changeFontSize,
  changeOpacityText,
  changeTextColor,
  changeOutlineColor,
  changeBgColorText,
  changeTextAlign,
  changeTextStyle,
  cancelTextStyle,
  brushSelect,
  changeShapeOpacity,
  changeShapeBgColor,
  shapeShadowToggle,
  shapeBorderToggle,
  changeShadowBlur,
  changeShadowOffX,
  changeShadowOffY,
  changeShadowColor,
  changeBorderColor,
  changeBorderWidth,
  cancelShapeButton,
  saveImage,
  canvasObjects,
};

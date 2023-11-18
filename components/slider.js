const slider = document.querySelector(".slider")
const sliderValue = document.querySelector(".sliderValue") 
import { canvasSize, setOriginalSize } from "./canvas"

const initialValue = () => {
    sliderValue.textContent = `${slider.value}%`
}

var prevValue, data
window.addEventListener("storage", () => {
  data = JSON.parse(window.localStorage.getItem("prt"))
  prevValue = data.percentage
})
const changeValue = (e) => {
  if(prevValue){
    sliderValue.textContent = `${e.target.value}%`
    const value = Number(e.target.value) - prevValue      
    canvasSize(value, data?.widthCalc, data?.heightCalc)
  }
    prevValue = Number(e.target.value)
}

const sizeIcon = () => {
  setOriginalSize()
}


const setOnCanvas = (prt) => {
slider.value = prt
sliderValue.textContent = `${prt}%`
}

export { initialValue , changeValue, sizeIcon, setOnCanvas }
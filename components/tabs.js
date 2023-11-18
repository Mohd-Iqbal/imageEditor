import { Icons } from "../utils/constant"
import { createObjects } from "./objects"

const element = document.querySelector(".iconsContainer")

const iconContainerHtml = () => {
    element.innerHTML = Icons.map((e,i) => {
        return  `<div class="mini-iconsContainer" id=${"ele" + i}>
        <div class="icon">
          <i class="${e.icon}"></i>
        </div>
        <span>${e.text}</span>
      </div>`
    })
}


const changeStyle = (ele,text) => {
  if(ele.classList.contains("mini-iconsContainer")){
    ele.classList.remove("mini-iconsContainer")
    ele.classList.add("change-iconContainer")
    createObjects(text)
}}


const tabsEvent = (ele,firstElement) => {
    ele.addEventListener("click", (e) => {
            const children = element.children
            for(let i = 0; i < children.length; i++){
                if(children[i] === e.target){
                    const text = e.target.children[1].textContent
                    changeStyle(children[i],text)
                }else if(children[i] === e.target.parentElement){
                    const text = e.target.parentElement.children[1].textContent
                    changeStyle(children[i],text)
                }else if(children[i] === e.target.parentElement.parentElement){
                    const text = e.target.parentElement.parentElement.children[1].textContent
                    changeStyle(children[i],text)
                }else {
                        firstElement.removeAttribute("id")
                        children[i].classList.remove("change-iconContainer")
                        children[i].classList.add("mini-iconsContainer")
                    }
            }
        }
        )
}

export {iconContainerHtml, changeStyle, tabsEvent }
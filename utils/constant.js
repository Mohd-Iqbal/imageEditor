const Icons = [
    {icon: "fa-solid fa-image", text: "BASICS"},
    {icon: "fa-sharp fa-solid fa-b", text: "TEXT"},
    {icon: "fa-sharp fa-solid fa-pencil", text: "DRAWING"},
    {icon: "fa-sharp fa-solid fa-circle-half-stroke", text: "FILTERS"},
    {icon: "fa-solid fa-shapes", text: "SHAPES"},
]

const iconsBasics= [
    {icon: "fa-solid fa-crop-simple", text: "Crop"},
    {icon: "fa-solid fa-rotate", text: "Rotate"},
    {icon: "fa-solid fa-up-down-left-right", text: "Resize"},
    {icon: "fa-sharp fa-solid fa-palette", text: "Color"},
]

const brushes = [
    {src: "/pencil.png", name:'pencil'},
    {src: "/circle.png", name:'circle'},
    {src: "/spray.png", name:'spray'},
]

const filters = [
    {src: "/grayscale.png", text: "Grayscale"},
    {src: "/invert.png", text: "Invert"},
    {src: "/sepia.png", text: "Sepia"},
    {src: "/blackandwhite.png", text: "BlackWhite"},
    {src: "/brownie.png", text: "Brownie"},
    {src: "/vintage.png", text: "Vintage"},
    {src: "/kodachrome.png", text: "Kodachrome"},
    {src: "/technicolor.png", text: "Technicolor"},
    {src: "/polaroid.png", text: "Polaroid"},
]

const shapes = [
    { text: "Circle"},
    { text: "Rectangle"},
    { text: "Triangle"},
    { text: "Ellipse"},
]

const menu = [
    { text: "OPEN" },
    { text: "LAYERS" },
    { text: "SAVE" }
]

const fonts = [
    { fontName: "Arial"},
    { fontName: "Times New Roman"},
    { fontName: "Georgia"},
    { fontName: "Courier New"},
     { fontName: "Comic Sans MS"},
    { fontName: "Trebuchet MS"},
    { fontName: "Impact"},
    { fontName: "Quicksand"},
    { fontName: "Handlee"},
    { fontName: "Shadows Into Light"},
    { fontName: "Sacramento"},
    { fontName: "Lobster"},
    { fontName: "Pacifico"},
    { fontName: "Dancing Script"},
]

const layers = [
    {icon: "fa-solid fa-eye", class: "visibility-container"}, 
    {icon: "fa-sharp fa-solid fa-trash", class: "delete-container"}, 
    {icon: "fa-solid fa-lock", class: "look-container"}
]

export {Icons, iconsBasics, brushes, filters, shapes, menu, fonts, layers} 
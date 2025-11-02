
console.log("JS is loaded!");

const userCanvas = document.getElementById("sketchCanvas");

const context = userCanvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const sizeChange = document.getElementById("brushSize");
const wipeCanvas = document.getElementById("clear");

const startGame = document.getElementById("startGame");

let activeDrawing = false;
let brushSize = sizeChange.value;
let brushColor = colorPicker.value;

console.log("Canvas get:", userCanvas);
console.log("Context get:", context);

function startDrawing(mouse) {
    console.log("Mouse down")
    activeDrawing = true;
    currentlyDrawing(mouse);
}

function currentlyDrawing(mouse) {
    console.log("Mouse moving")
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.strokeStyle = brushColor;
    if (activeDrawing == true) {
        console.log("Drawing!")
        context.lineTo(mouse.offsetX, mouse.offsetY);
        context.stroke();
        context.beginPath();
        context.moveTo(mouse.offsetX, mouse.offsetY);

    }
}
function endDraw() {
    console.log("Mouse out or up")
    activeDrawing = false;
    context.beginPath();
}

function changeColor(change) {
    brushColor = change.target.value;
}

function changeSize(brush){
    brushSize = brush.target.value;
    console.log("Changed brush size");
    currentlyDrawing(brush);
}

function clearCanvas(){
    console.log("Cleared canvas");
    context.clearRect(0,0, userCanvas.width, userCanvas.height);
}

function switchToGame(){
    console.log("Switching to game");
    window.location.href = "main.html";
}

userCanvas.addEventListener("mousedown", startDrawing);
userCanvas.addEventListener("mouseout", endDraw);
userCanvas.addEventListener("mouseup", endDraw);
userCanvas.addEventListener("mousemove", currentlyDrawing);
colorPicker.addEventListener("input", changeColor);
sizeChange.addEventListener("input", changeSize);
wipeCanvas.addEventListener("click", clearCanvas);
startGame.addEventListener("click", switchToGame);
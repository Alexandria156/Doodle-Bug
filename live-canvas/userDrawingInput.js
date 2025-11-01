
console.log("JS is loaded!");

const userCanvas = document.getElementById("sketchCanvas");
const context = userCanvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");

let activeDrawing = false;
let brushSize = 15;
let brushColor = colorPicker.value;

console.log("Canvas get:", userCanvas);
console.log("Context get:", context);

function startDrawing(mouse){
    console.log("Mouse down")
    activeDrawing = true;
    currentlyDrawing(mouse);
}

function currentlyDrawing(mouse){
    console.log("Mouse moving")
    context.lineWidth = brushSize;
    context.lineCap = "round";
    context.fillStyle = brushColor;
    if(activeDrawing == true)
    {
        console.log("Drawing!")
        context.lineTo(mouse.offsetX, mouse.offsetY);
        context.stroke();
        context.beginPath();
        context.moveTo(mouse.offsetX, mouse.offsetY);

    }
}
function endDraw()
{
    console.log("Mouse out or up")
    activeDrawing = false;
    context.beginPath();
}

function changeColor(change)
{
    brushColor = change.target.value;
    console.log("Changed color ", value)
}

userCanvas.addEventListener("mousedown", startDrawing);
userCanvas.addEventListener("mouseout", endDraw);
userCanvas.addEventListener("mouseup",endDraw);
userCanvas.addEventListener("mousemove",currentlyDrawing);
colorPicker.addEventListener("input", changeColor);


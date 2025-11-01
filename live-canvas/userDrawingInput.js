
console.log("JS is loaded!");

const userCanvas = document.getElementById("sketchCanvas");
const context = userCanvas.getContext("2d");

context.fillStyle = "blue";
context.fillRect(10, 10, 150, 100);

context.strokeStyle = "green";
context.lineWidth = 50;
context.beginPath();
context.moveTo(20, 40)
context.lineTo(100, 160);
context.stroke();


let coordX = 0;
let coordY = 0;

let activeDrawing = false;
console.log("Canvas get:", userCanvas);
console.log("Context get:", context);

function startDrawing(mouse){
    console.log("Mouse down")
    activeDrawing = true;
    currentlyDrawing(mouse);
}

function currentlyDrawing(mouse){
    console.log("Mouse moving")
    context.lineWidth = 20;
    context.lineCap = "butt";
    context.fillStyle = "red";
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

userCanvas.addEventListener("mousedown", startDrawing);
userCanvas.addEventListener("mouseout", endDraw);
userCanvas.addEventListener("mouseup",endDraw);
userCanvas.addEventListener("mousemove",currentlyDrawing);
/*
userCanvas.onmousedown = function (mouse) {
    console.log("Mouse down");
    activeDrawing = true;


}
userCanvas.onmousemove = function (mouse) {
    if (activeDrawing = true) {
        console.log("Mouse moving");
        context.fillStyle = "red";
        context.lineWidth = 50;
        context.beginPath();
        //context.moveTo(100, 40);
        //context.lineTo(12, 23);
        
        context.stroke();
    }
}
userCanvas.onmouseout = function (mouse) {
    console.log("No drawing; mouse off")
    activeDrawing = false;
}
userCanvas.onmouseup = function (mouse) {
    console.log("No drawing; mouse up")
    activeDrawing = false;
}*/
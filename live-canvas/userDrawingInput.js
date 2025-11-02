
console.log("JS is loaded!");

const userCanvas = document.getElementById("sketchCanvas");

const context = userCanvas.getContext("2d");
const colorPicker = document.getElementById("colorPicker");
const sizeChange = document.getElementById("brushSize");
const undoStroke = document.getElementById("undo");
const redoStroke = document.getElementById("redo");
const wipeCanvas = document.getElementById("clear");

const startGame = document.getElementById("startGame");

var canvasHistory = new Array();
var canvasPushes = -1;

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

function currentCanvas(){
    console.log("Stored current canvas");
    canvasPushes++;
    if(canvasPushes < canvasHistory)
    {
        canvasHistory.length = canvasPushes;
    }
    canvasHistory.push(userCanvas.toDataURL());
}

function clearCanvas(){
    console.log("Cleared canvas");
    context.clearRect(0,0, userCanvas.width, userCanvas.height);
}

function undoWork(){
    if(canvasPushes > 0)
    {
        canvasPushes--;
        var canvasSnap = new Image();
        canvasSnap.src=canvasHistory[canvasPushes];
        canvasSnap.onload=function() {context.drawImage(canvasSnap, 0, 0);}
    }
}
function redoWork(){
    if(canvasPushes < canvasHistory.length-1)
    {
        canvasPushes++;
        var canvasSnap = new Image();
        canvasSnap.src = canvasHistory[canvasPushes];
        canvasSnap.onload = function() {context.drawImage(canvasSnap, 0, 0);}
    }
}

userCanvas.addEventListener("mousedown", startDrawing);
userCanvas.addEventListener("mouseout", endDraw);
userCanvas.addEventListener("mouseup", endDraw);
userCanvas.addEventListener("mousemove", currentlyDrawing);
colorPicker.addEventListener("input", changeColor);
sizeChange.addEventListener("input", changeSize);
wipeCanvas.addEventListener("click", clearCanvas);
undoStroke.addEventListener("click", undoWork);
redoStroke.addEventListener("click",redoWork);

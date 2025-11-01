
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

userCanvas.onmousedown = function () {
    console.log("Mouse down");
    activeDrawing = true;

}
userCanvas.onmousemove = function () {
    if (activeDrawing = true) {
        console.log("Mouse moving");
        context.fillStyle = "red";
        context.lineWidth = 50;
        context.beginPath();

        context.moveTo(100, 40);
        context.lineTo(300, 87);

        context.stroke();
    }
}
userCanvas.onmouseout = function () {
    console.log("No drawing; mouse off")
    activeDrawing = false;
}
userCanvas.onmouseup = function () {
    console.log("No drawing; mouse up")
    activeDrawing = false;
}
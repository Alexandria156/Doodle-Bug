
var userCanvas = document.getElementById("sketchCanvas");
var context = userCanvas.getContext("2d");

let activeDrawing = false;


userCanvas.addEventListener('mouseDown', (md) => {
    activeDrawing = true;
    [coordX, coordY] = [md.offsetX, md.offsetY];
});

userCanvas.addEventListener('mouseMove)', (mm) =>{
    if(activeDrawing == true)
    {
        context.beginPath();
        context.moveTo(coordX, coordY);
        context.lineTo(md.offsetX, md,offsetY)
        context.lineWidth = 20;
        context.strokeStyle = "blue";
        context.lineCap = "butt";
        context.stroke();
        [coordX, coordY] = [mm.offsetX, mm.offsetY]
    }
});

userCanvas.addEventListener('mouseUp', () =>{
    activeDrawing = false;
})


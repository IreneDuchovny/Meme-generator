'use strict'
let gElCanvas
let gCtx


//creates a new canvas
function onMemeInit() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')

    //TODO: resizeCanvas()
    // window.addEventListener('resize', () => {
    // resizeCanvas()

    renderMeme()
}

//renders currState of canvas
function renderMeme() {
    var img = new Image()

    img.src = gMeme.selectedImgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        gMeme.lines.forEach(line => {
            gCtx.lineWidth = '2';
            // gCtx.strokeStyle = line.strokeColor;
            gCtx.fillStyle = line.color;
            gCtx.font = `${line.size}px ${line.font}`;
            gCtx.textAlign = line.align;
            gCtx.fillText(line.txt, line.x, line.y);
            gCtx.strokeText(line.txt, line.x, line.y);
        })
    }
}
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
    onSetListeners()
}

//renders currState of canvas
function renderMeme() {
    var img = new Image()
    var currMeme = getMeme()

    img.src = currMeme.selectedImgUrl
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        currMeme.lines.forEach(line => {
            gCtx.lineWidth = '2';
            gCtx.strokeStyle = line.strokeColor;
            gCtx.fillStyle = line.color;
            gCtx.font = `${line.size}px ${line.font}`;
            gCtx.textAlign = line.align;
            gCtx.fillText(line.txt, line.x, line.y);
            gCtx.strokeText(line.txt, line.x, line.y);
        })
    }
}

function onSetListeners() {
    
    //add text line
    const input = document.querySelector('.text-line');
    input.addEventListener('input', onUpdateText);

    //choose font color
    const elColor = document.querySelector('.font-color-input');
    elColor.addEventListener('input', onColorChange);

    //choose font family
    const elFont = document.querySelector('.choose-font-btn');
    elFont.addEventListener('click', onFontChange);

    //stroke color
    const elColorStroke = document.querySelector('.stroke-color-btn');
    elColorStroke.addEventListener('input', onStrokeColorChange);

    //delete line
    const elDeleteLine = document.querySelector('.delete-btn');
    elDeleteLine.addEventListener('click', onDeleteLine);

}

function onUpdateText(ev) {
    setLineTxt(ev.target.value)
    renderMeme()
}

function onColorChange(ev) {
    const color = ev.target.value
    setLineColor(color);
    console.log('color', ev)
    renderMeme()
}

function onFontChange(ev) {
    const font = ev.target.value
    setLineFont(font);
    console.log('font', ev)
    renderMeme()
}

function onStrokeColorChange(ev) {
    const color = ev.target.value
    setTextStrokeColor(color);
    console.log('color', ev)
    renderMeme()
}

function onAddLine() {
    document.querySelector('.text-line').value = ''
    addLine()
    renderMeme()
}

function onDeleteLine() {
    deleteLine()
    renderMeme()
}


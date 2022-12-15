'use strict'
let gElCanvas
let gCtx

//creates a new canvas
function onMemeInit() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    addLine()
    addLine()
    gMeme.selectedLineIdx = 0
    renderMeme()
    onSetListeners()

}

//renders currState of canvas
function renderMeme() {
    var img = new Image()
    var currMeme = getMeme()
    // resizeCanvas()

    img.src = currMeme.selectedImgUrl
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    currMeme.lines.forEach(line => {
        gCtx.lineWidth = '2';
        gCtx.strokeStyle = line.strokeColor;
        gCtx.fillStyle = line.color;
        gCtx.font = `${line.size}px ${line.font}`;
        gCtx.textAlign = line.align;
        gCtx.fillText(line.txt, line.x, line.y);
        gCtx.strokeText(line.txt, line.x, line.y);
        onSetFocus(line)

    })
}

function onSetListeners() {
    //resize canvas
    window.addEventListener('resize', resizeCanvas)
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

    //add line
    const elAddLine = document.querySelector('.add-line-btn');

    //switch lines
    const elSwitchLine = document.querySelector('.switch-btn');
    elSwitchLine.addEventListener('click', onSwitchLine);

    // canvas click to change focus
    gElCanvas.addEventListener('click', onCanvasClicked)
}

function resizeCanvas() {
    gCtx.canvas.width = document.documentElement.clientWidth * 0.3
    gCtx.canvas.height = document.documentElement.clientWidth * 0.3
    renderMeme()
}

//Changes the text of the selected line
function onUpdateText(ev) {
    setLineTxt(ev.target.value)
    renderMeme()
}

//Changes the text color of the selected line
function onColorChange(ev) {
    const color = ev.target.value
    setLineColor(color);
    console.log('color', ev)
    renderMeme()
}

//Changes the font of the selected line
function onFontChange(ev) {
    const font = ev.target.value
    setLineFont(font);
    console.log('font', ev)
    renderMeme()
}

//Changes the stroke color of the selected line
function onStrokeColorChange(ev) {
    const color = ev.target.value
    setTextStrokeColor(color);
    console.log('color', ev)
    renderMeme()
}

//Adds a new line
function onAddLine() {
    document.querySelector('.text-line').value = ''
    addLine()

    renderMeme()
}
//Deletes the selected line
function onDeleteLine() {
    deleteLine()
    renderMeme()
}

//Moves the selected line up or down
function onPosChange(diff) {
    setLinePos(diff)
    renderMeme()
}

//Switches between lines (for editing)
function onSwitchLine() {
    switchLine()
    renderMeme()
}

//Sets a rectengle on the selected line
function onSetFocus(line) {
    if (gMeme.selectedLineIdx === line.id && line.txt) {
        gCtx.lineWidth = 1;
        gCtx.strokeStyle = "gray";
        gCtx.strokeRect(3, line.y - line.size + 5, gElCanvas.width - 6, line.size);
        document.querySelector('.text-line').value = line.txt
        document.querySelector('.font-color-input').value = line.color
        document.querySelector('.stroke-color-btn').value = line.strokeColor
        document.querySelector('.choose-font-btn').value = line.font

    }

}

//Changes the font size of the selected line
function onsetFontSize(diff) {
    setFontSize(diff)
    renderMeme()
}

//Changes the font align of the selected line
function onSetFontAlign(align) {
    setFontAlign(align)
    renderMeme()
}

//Canvas click to change focus
function onCanvasClicked(ev) {
    ev.stopPropagation()
    const { offsetX, offsetY } = ev
    const clickedLine = gMeme.lines.find(line => {
        return (
            offsetX >= 3 && offsetX <= line.x + gElCanvas.width &&
            offsetY >= line.y - line.size && offsetY <= line.y
        )
    })

    if (clickedLine) {
        gMeme.selectedLineIdx = clickedLine.id
        onSetFocus(clickedLine)
        renderMeme()
    }
}

//downloads the meme
function onDownloadMeme(link) {
    downloadMeme(link)

}
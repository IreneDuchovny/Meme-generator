'use strict'
let gElCanvas
let gCtx

//creates a new canvas
function onMemeInit() {
    gElCanvas = document.querySelector('#canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    addLine()
    addLine()
    gMeme.selectedLineIdx = 0
    renderMeme() 
    onSetListeners()
    onGetStickers()
}

//Renders currState of lines
function renderMeme(clearFocus) {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
    var img = new Image()
    var currMeme = getMeme()
    img.src = currMeme.selectedImgUrl
    // if (img.width != img.height) adjustCanvas(img.width, img.height)

        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        currMeme.lines.forEach(line => {
            gCtx.lineWidth = '2'
            gCtx.strokeStyle = line.strokeColor
            gCtx.fillStyle = line.color
            gCtx.font = `${line.size}px ${line.font}`
            gCtx.textAlign = line.align
            gCtx.fillText(line.txt, line.x, line.y)
            gCtx.strokeText(line.txt, line.x, line.y)
            if(!clearFocus) onSetFocus(line)

   })
    // var stickers = getStickers()
    // stickers.forEach(sticker => {
    //     var img = new Image()
    //     img.src = sticker.url
    //     gCtx.drawImage(img, gElCanvas.width/2,  gElCanvas.height/2, 100, 100)
    // })
}

function centerLines() {
    var currMeme = getMeme()
    currMeme.lines.forEach(line => {
        line.x = gElCanvas.width / 2
    })
}   

function onSetListeners() {
    //resize canvas
    window.addEventListener('resize', resizeCanvas)
    //add text line
    const input = document.querySelector('.text-line')
    input.addEventListener('input', onUpdateText)

    //choose font color
    const elColor = document.querySelector('.font-color-input')
    elColor.addEventListener('input', onColorChange)

    //choose font family
    const elFont = document.querySelector('.choose-font-btn')
    elFont.addEventListener('click', onFontChange)

    //stroke color
    const elColorStroke = document.querySelector('.stroke-color-input')
    elColorStroke.addEventListener('input', onStrokeColorChange)

    //delete line
    const elDeleteLine = document.querySelector('.delete-btn')
    elDeleteLine.addEventListener('click', onDeleteLine)

    //add line
    const elAddLine = document.querySelector('.add-line-btn')

    //switch lines
    const elSwitchLine = document.querySelector('.switch-btn')
    elSwitchLine.addEventListener('click', onSwitchLine)

    //canvas click to change focus
    gElCanvas.addEventListener('click', onCanvasClicked)

    //mouse down to drag
    gElCanvas.addEventListener('mousedown', onDown)

    //mouse up to stop drag
    gElCanvas.addEventListener('mouseup', onUp)

    //mouse move to drag
    gElCanvas.addEventListener('mousemove', onMove)

    //touch move to drag
    gElCanvas.addEventListener('touchmove', onMove)

    //touch start to drag
    gElCanvas.addEventListener('touchstart', onDown)

    //touch end to stop drag
    gElCanvas.addEventListener('touchend', onUp)
}

function onColorClick()
{
    document.querySelector('.font-color-input').click()
}

function onstrokeClick()
{
    document.querySelector('.stroke-color-input').click()
}

// function  adjustCanvas(imgWidth, imgHeight) {
//     const elContainer = document.querySelector('.canvas-container')
//     const containerWidth = elContainer.offsetWidth
//     const containerHeight = elContainer.offsetHeight
//     if (imgWidth > imgHeight) {
//         gElCanvas.width = containerWidth
//         gElCanvas.height = (imgHeight * containerWidth) / imgWidth
//     } else {
//         gElCanvas.height = containerHeight
//         gElCanvas.width = (imgWidth * containerHeight) / imgHeight
//     }
    
// }

//resizes canvas
function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gCtx.canvas.width = elContainer.offsetWidth
    gCtx.canvas.height = elContainer.offsetWidth
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
    setLineColor(color)
    renderMeme()
}

//Changes the font of the selected line
function onFontChange(ev) {
    const font = ev.target.value
    setLineFont(font)
    renderMeme()
}

//Changes the stroke color of the selected line
function onStrokeColorChange(ev) {
    const color = ev.target.value
    setTextStrokeColor(color)
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
        gCtx.lineWidth = 1
        gCtx.strokeStyle = "gray"
        gCtx.strokeRect(3, line.y - line.size + 5, gElCanvas.width - 6, line.size)
        document.querySelector('.text-line').value = line.txt
        document.querySelector('.font-color-input').value = line.color
        document.querySelector('.stroke-color-input').value = line.strokeColor
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
    const clickedLine =getClickedLine(offsetX, offsetY)

    if (clickedLine) {
        gMeme.selectedLineIdx = clickedLine.id
        onSetFocus(clickedLine)
        document.body.style.cursor = 'grabbing'
        renderMeme()
    }
    else {
        renderMeme(true)
    }
}

//downloads the meme
function onDownloadMeme(link) {
   renderMeme(true)
    downloadMeme(link)
}

function onGetStickers() {
    var stickers = getStickers()
    var strHtmls = stickers.map(function (sticker) {
        return `<img src="${sticker.url}"  onclick="onStickerSelect('${sticker.id}')">`
    })
    document.querySelector('.stickers-container').innerHTML = strHtmls.join('')
}

function onStickerSelect(id) {
    var sticker = getStickerById(id)
    var currSticker = new Image()
    currSticker.src = sticker.url
    gCtx.drawImage(currSticker, gElCanvas.width/2,  gElCanvas.height/2, 100, 100)
}

//saves meme to storage
function onSaveMeme() {
    renderMeme(true)
    saveMeme()
    onMemeNav()
}

//load meme from storage
function onLoadMeme(id) {
    var elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hide')
    var elEditor = document.querySelector('.meme-main-editor')
    elEditor.classList.remove('hide')
    var elSaveMemes= document.querySelector('.saved-memes')
    elSaveMemes.classList.add('hide')
    onMemeInit()
    loadMeme(id)
    renderMeme()
}

// share meme on facebook
function onUploadImg() {
    renderMeme(true)
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg') 
    function onSuccess(uploadedImgUrl) {
        const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

//Drag and drop functions
function onDown(ev) {
    const pos = getEvPos(ev)
    if (!getClickedLine(pos.x, pos.y)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    const { isDrag, selectedLineIdx } = getMeme()
    if (!isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveLine(dx, dy, selectedLineIdx)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'default'
}
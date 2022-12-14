'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedImgUrl: 'img/5.jpg',
    selectedLineIdx: 0,

    lines: [
        {
            txt: '',
            size: 40,
            align: 'center',
            color: '#ffffff',
            font: 'Impact',
            strokeColor: 'black',
            x: 250,
            y: 50
            //TODO: CENTER X,Y
        }
    ]
}

function getMeme() {
    return gMeme
}

//updates a line's text (for the selected/edited line)
function setLineTxt(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

//updates a line's color (for the selected/edited line)
function setLineColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

//updates a line's font (for the selected/edited line)
function setLineFont(font) {
    gMeme.lines[gMeme.selectedLineIdx].font = font
}
//updates text stroke color (for the selected/edited text)
function setTextStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = color
}

function deleteLine() {
    var delLine = gMeme.lines
    delLine.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
}

function addLine() {
    gMeme.lines.push({
        txt: '',
        size: 40,
        align: 'center',
        color: '#ffffff',
        font: 'Impact',
        strokeColor: 'black',
        x: 250,
        y: gMeme.lines[gMeme.selectedLineIdx].y + 100
    })
    changeLine()
    
}

function changeLine() {
    var newlineIdx = gMeme.selectedLineIdx + 1
    gMeme.selectedLineIdx = newlineIdx
   
}




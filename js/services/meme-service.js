'use strict'


var gMeme = {
    selectedImgId: 5,
    selectedImgUrl: 'img/5.jpg',
    selectedLineIdx: 0,

    lines: [
        {
            txt: 'I am a meme',
            size: 40,
            align: 'center',
            color: 'white',
            font: 'Impact',
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
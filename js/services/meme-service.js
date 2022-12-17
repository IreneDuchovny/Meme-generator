'use strict'

var gMeme = {
    selectedImgId: 5,
    selectedImgUrl: 'img/5.jpg',
    selectedLineIdx: 0,

    lines: [
    ]
}

var gSavedNames = []


const gStickers = [
    { id: "cactus", url: 'img/stickers/cactus.png' },
    { id: "cool", url: 'img/stickers/cool.png' },
    { id: "crown", url: 'img/stickers/crown.png' },
    { id: "donut", url: 'img/stickers/donut.png' },
    // {id:"drunk", url:'img/stickers/drunk.png'},
    // {id:"hearts", url:'img/stickers/hearts.png'},
    // {id:"mouse", url:'img/stickers/mouse.png'},
    // {id:"pizza", url:'img/stickers/pizza.png'},
    // {id:"silly", url:'img/stickers/silly.png'},
    // {id:"sweet", url:'img/stickers/sweet.png'},
    // {id:"unicorn", url:'img/stickers/unicorn.png'},
]



//returns the meme
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

//deletes a line
function deleteLine() {
    console.log('gMeme.selectedLineIdx', gMeme.selectedLineIdx)
    var delLine = gMeme.lines
    delLine.splice(gMeme.selectedLineIdx, 1)
    if (gMeme.selectedLineIdx === 0 && gMeme.lines.length === 0) {
        addLine()
        gMeme.selectedLineIdx = 0
        return
    }

    if (gMeme.lines.length > 0) {
        gMeme.selectedLineIdx--
        switchLine()
    }
}

//sets image in meme area
function setImg(imgId) {
    gMeme = {
        selectedImgId: imgId,
        selectedImgUrl: `img/${imgId}.jpg`,
        selectedLineIdx: 0,
    
        lines: [
        ]
    }
    
}

//Adds a new line to the meme(top,bottom and meddle)
function addLine() {
    var line = {
        id: gMeme.lines.length,
        txt: `line ${gMeme.lines.length + 1}`,
        size: 40,
        align: 'center',
        color: '#ffffff',
        font: 'Impact',
        strokeColor: 'black',
        x: gElCanvas.width / 2
    }

    if (gMeme.lines.length === 0) {
        line.y = 50
    } else if (gMeme.lines.length === 1) {
        line.y = gElCanvas.height - 25
    } else {
        line.y = gElCanvas.height / 2 + 20
    }
    gMeme.lines.push(line)
    changeLine()

}

//changes the selected line (idx)
function changeLine() {
    var newlineIdx = gMeme.selectedLineIdx + 1
    gMeme.selectedLineIdx = newlineIdx
}

//updates a line's position (for the selected/edited line)
function setLinePos(diff) {
    if (gMeme.lines.length === 0 || gMeme.lines[gMeme.selectedLineIdx].y === 30) return
    gMeme.lines[gMeme.selectedLineIdx].y += diff

}

//switches between lines
function switchLine() {
    if (gMeme.lines.length === 0) return
    if (gMeme.selectedLineIdx === gMeme.lines.length - 1) {
        gMeme.selectedLineIdx = 0
    } else {
        gMeme.selectedLineIdx++
    }
}

//sets a new font size
function setFontSize(diff) {
    if (gMeme.lines[gMeme.selectedLineIdx].size + diff < 16) return
    gMeme.lines[gMeme.selectedLineIdx].size += diff
    console.log('font size', gMeme.lines[gMeme.selectedLineIdx].size)
}

//sets a new font align
function setFontAlign(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

//downloads the meme
function downloadMeme(elLink) {
    const data = gElCanvas.toDataURL();
    elLink.href = data;
    elLink.download = 'my-meme.jpg';
}

//gets stickers for gallery
function getStickers() {
    return gStickers
}

//gets sticker by id
function getStickerById(stickerId) {
    var stickers = getStickers()
    console.log('stickers', stickers)
    var sticker = stickers.find(function (sticker) {
        return sticker.id === stickerId
    })
    return sticker
}


//save meme to local storage
function saveMeme() {
    var memePrompt = prompt("Please enter a name to save")
    const data = gElCanvas.toDataURL();
    gMeme.data =data;
    gMeme.id=memePrompt;
    saveToStorage(memePrompt, gMeme)
    gSavedNames.push(memePrompt)
    saveToStorage('memeNames', gSavedNames)

}

//load memes from local storage
function loadMeme(id) {
    gMeme = loadFromStorage(id)

}
//saves the meme name from the user
function saveMemeNames() {
    saveToStorage(prompt("Please enter a name to save"), gMeme)
}


//loades and shows the saved memes in the webpage
function loadSavedNames() {
    return gSavedNames = loadFromStorage('memeNames')
}
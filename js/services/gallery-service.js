'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics', 'funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppies', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['funny', 'cute'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cute'] },

]

function getImgs() {
    return gImgs
}


function setImg(imgId) {
    gMeme.selectedImgId = imgId
    gMeme.selectedImgUrl = `img/${imgId}.jpg`
    console.log(' gMeme.selectedImgUrl',  gMeme.selectedImgUrl)
    console.log('imgId',imgId )
}


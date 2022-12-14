'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics', 'funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppies', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'puppies'] },
    { id: 4, url: 'img/4.jpg', keywords: ['funny', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['funny', 'cute'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'cute'] },
    { id: 7, url: 'img/7.jpg', keywords: ['funny', 'cute'] },
    { id: 8, url: 'img/8.jpg', keywords: ['funny', 'cute'] },
    { id: 9, url: 'img/9.jpg', keywords: ['funny', 'cute'] },
    { id: 10, url: 'img/10.jpg', keywords: ['funny', 'cute'] },
    { id: 11, url: 'img/11.jpg', keywords: ['funny', 'cute'] },
    { id: 12, url: 'img/12.jpg', keywords: ['funny', 'cute'] },
    { id: 13, url: 'img/13.jpg', keywords: ['funny', 'cute'] },
    { id: 14, url: 'img/14.jpg', keywords: ['funny', 'cute'] },
    { id: 15, url: 'img/15.jpg', keywords: ['funny', 'cute'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'cute'] },
    { id: 17, url: 'img/17.jpg', keywords: ['funny', 'cute'] },
    { id: 18, url: 'img/18.jpg', keywords: ['funny', 'cute'] },


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


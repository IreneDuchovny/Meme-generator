'use strict'

function onGalleryInit() {
    onMemeInit()
    renderGallery()
}

function renderGallery() {
    var imgs = getImgs()
    var strHtmls = imgs.map(function (img) {
        return `<img src="${img.url}"  onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.gallery-area').innerHTML = strHtmls.join('')
}

function onImgSelect(imgId) {
    var elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hide')
    var elEditor = document.querySelector('.meme-main-editor')
    elEditor.classList.remove('hide')
    setImg(imgId)
    renderGallery()
    renderMeme()
}
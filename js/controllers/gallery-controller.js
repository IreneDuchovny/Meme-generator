'use strict'

function onGalleryInit() {
    loadSavedNames()
    renderGallery()
}

function renderGallery() {
    var imgs = getImgs()
    var strHtmls = imgs.map(function (img) {
        return `<img src="${img.url}"  onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.grid-container').innerHTML = strHtmls.join('')
}

//hides irelevant pages from meme editor
function onImgSelect(imgId) {
    var elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hide')
    var elEditor = document.querySelector('.meme-main-editor')
    elEditor.classList.remove('hide')
    var elSaveMemes = document.querySelector('.saved-memes')
    elSaveMemes.classList.add('hide')
    setImg(imgId)
    onMemeInit()
}

//Hides gallery, editor and shows saved memes
function onMemeNav() {
    var elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hide')
    var elEditor = document.querySelector('.meme-main-editor')
    elEditor.classList.add('hide')
    var elSaveMemes = document.querySelector('.saved-memes')
    elSaveMemes.classList.remove('hide')

    loadSavedNames()
    renderSavedMemes()

}

function renderSavedMemes() {
    var savedMemes = getSavedMemes()
    var strHtmls = savedMemes.map(function (meme) {
        return `<img src="${meme.data}"  onclick="onLoadMeme('${meme.id}')">`
    })
    if (!strHtmls) {
        document.querySelector('.saved-memes-grid').innerHTML = `<a>There are no saved memes</a>`
    } else {
        document.querySelector('.saved-memes-grid').innerHTML = strHtmls.join('')
    }
}

//Hides editor, meme page and shows gallery
function onGalleryNav() {
    var elGallery = document.querySelector('.main-gallery')
    elGallery.classList.remove('hide')
    var elEditor = document.querySelector('.meme-main-editor')
    elEditor.classList.add('hide')
    var elSaveMemes = document.querySelector('.saved-memes')
    elSaveMemes.classList.add('hide')
    renderGallery()
    document.querySelector('.search-bar-input').value = ''
}

//searches for images by keywords
function onSearchByKeywords(keyword) {
    if (keyword === '') return renderGallery()
    var imgs = searchByKeywords(keyword)
    var strHtmls = imgs.map(function (img) {
        return `<img src="${img.url}"  onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.grid-container').innerHTML = strHtmls.join('')
}




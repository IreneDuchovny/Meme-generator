'use strict'

function onGalleryInit() {
    // onMemeInit()
    loadSavedNames()
    renderGallery()
}

function renderGallery() {
    var imgs = getImgs()
    // var searchBarHtml = `<input type="text" class="search-bar" placeholder="search">`
    var strHtmls = imgs.map(function (img) {
        return `<img src="${img.url}"  onclick="onImgSelect(${img.id})">`
    })
    // document.querySelector('.gallery-area').innerHTML = searchBarHtml + strHtmls.join('')
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
    //renderGallery()
    onMemeInit()
}

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
    console.log('savedMemes', savedMemes)
    var strHtmls = savedMemes.map(function (meme) {
        console.log('meme.id', meme.id)
        return `<img src="${meme.data}"  onclick="onLoadMeme('${meme.id}')">`

    })
    document.querySelector('.saved-memes-grid').innerHTML = strHtmls.join('')
}

function onGalleryNav() {
    var elGallery = document.querySelector('.main-gallery')
    elGallery.classList.remove('hide')
    var elEditor = document.querySelector('.meme-main-editor')
    elEditor.classList.add('hide')
    renderGallery()
    document.querySelector('.search-bar-input').value = ''
}

function onSearchByKeywords(keyword) {
    if (keyword === '') return renderGallery()
    var imgs = searchByKeywords(keyword)

    var strHtmls = imgs.map(function (img) {
        return `<img src="${img.url}"  onclick="onImgSelect(${img.id})">`
    })
    document.querySelector('.grid-container').innerHTML = strHtmls.join('')
}




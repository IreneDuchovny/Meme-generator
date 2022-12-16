'use strict'

function onGalleryInit() {
   // onMemeInit()
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

function onImgSelect(imgId) {
    var elGallery = document.querySelector('.main-gallery')
    elGallery.classList.add('hide')
    var elEditor = document.querySelector('.meme-main-editor')
    elEditor.classList.remove('hide')
    setImg(imgId)
    renderGallery()
    onMemeInit()
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




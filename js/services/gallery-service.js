'use strict'

var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['politics', 'funny'] },
    { id: 2, url: 'img/2.jpg', keywords: ['puppies', 'cute'] },
    { id: 3, url: 'img/3.jpg', keywords: ['baby', 'puppies'] },
    { id: 4, url: 'img/4.jpg', keywords: ['cat', 'cute'] },
    { id: 5, url: 'img/5.jpg', keywords: ['baby', 'success'] },
    { id: 6, url: 'img/6.jpg', keywords: ['funny', 'nerd'] },
    { id: 7, url: 'img/7.jpg', keywords: ['baby', 'funny'] },
    { id: 8, url: 'img/8.jpg', keywords: ['musical', 'smile'] },
    { id: 9, url: 'img/9.jpg', keywords: ['baby', 'sneaky'] },
    { id: 10, url: 'img/10.jpg', keywords: ['politics', 'smile'] },
    { id: 11, url: 'img/11.jpg', keywords: ['kiss', 'men'] },
    { id: 12, url: 'img/12.jpg', keywords: ['you', 'focus'] },
    { id: 13, url: 'img/13.jpg', keywords: ['wine', 'success'] },
    { id: 14, url: 'img/14.jpg', keywords: ['metrix', 'men'] },
    { id: 15, url: 'img/15.jpg', keywords: ['zero', 'movies'] },
    { id: 16, url: 'img/16.jpg', keywords: ['funny', 'movies'] },
    { id: 17, url: 'img/17.jpg', keywords: ['politics', 'scary'] },
    { id: 18, url: 'img/18.jpg', keywords: ['all over', 'toys'] },

]

//gets images for gallery
function getImgs() {
    return gImgs
}

//search by keywords
function searchByKeywords(keyword) {
    var imgs = getImgs()
    var imgsByKeywords = imgs.filter(function (img) {
        return img.keywords.includes(keyword.toLowerCase())
    })
    return imgsByKeywords
}

function getSavedMemes(){
    var memeNames= loadFromStorage('memeNames')  || []
    var retMemes = memeNames.map(function(memeName){
        return loadFromStorage(memeName)
    })
    return retMemes
    }

// upload image from user
function uploadImg(elForm, ev) {
    ev.preventDefault()
    document.getElementById('imgData').value = gElCanvas.toDataURL("image/jpeg")
    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        console.log(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `<a href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" target="_blank">Share on Facebook</a>`
    }
    doUploadImg(elForm, onSuccess);
}



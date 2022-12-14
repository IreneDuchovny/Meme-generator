
// loads to storage
function saveToStorage(key, val) {
    const str = JSON.stringify(val)
    localStorage.setItem(key, str)
}

//loads from storage
function loadFromStorage(key) {
    const str = localStorage.getItem(key)
    const val = JSON.parse(str)
    return val
}

// clears storage
function clearLocalStorage(){
    localStorage.clear()
}
const display = document.getElementsByClassName("notes")[0] //id in html
const delete_btn = document.getElementById('delete-btn')
const add_btn = document.getElementsByClassName("add-btn")[0] //id
const title = document.getElementById('title')
const note_text = document.getElementById('note-text')
const counter = document.getElementById('counter')
let header = document.getElementById('header')
const search = document.getElementById('search-input')
let notes = []
let was_searched = false
let temp = []
let selected = null
title.value = ''
title.disabled = true
note_text.value = ''
note_text.disabled = true
search.value = ''

window.onload = function() {
    const storage = localStorage.getItem('notes')
    if (storage === null) {
        notes = []
    } else {
        notes = JSON.parse(storage)
        for (let i = 0; i < notes.length; i++) {
            notes[i].__proto__ = Note.prototype
        }
        render(notes)
    }
    console.log(storage)
    const id = getParameter('id')
    console.log(id)
    if (id) {
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                selected = notes[i]
                notes[i].selected = true
                
            } else {
                notes[i].selected = false
            }
        }
        console.log(notes)
        render(notes)    
    }
    
}

window.onunload = function() {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].selected === true)
            notes[i].selected = false
    }
    selected = null
    localStorage.setItem('notes', JSON.stringify(notes)) 
}

window.onclick = function(event) {
    if (event.target.classList.contains('select-btn')) {
        let id = event.target.parentNode.id
        console.log(id)
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                selected = notes[i]
                notes[i].selected = true
                window.history.replaceState(null, null, `?id=${notes[i].id}`)
            } else {
                
                notes[i].selected = false
            }
        }
        if (was_searched) {
            render(temp)
        } else {
            render(notes)
        }
        
    }
}

add_btn.onclick = function() {
    let note = new Note()
    notes.push(note)
    header.innerText = 'All Notes'
    search.value = ''
    render(notes)
}

delete_btn.onclick = function() {
    let copy = []
    for (let i = 0; i < notes.length; i++) {
        if (!notes[i].selected) {
            copy.push(notes[i])
        }
    }
    was_searched = false
    search.value = ''
    header.innerText = 'All Notes'
    selected = null
    notes = copy
    render(notes)
} 


title.oninput = function() {
    selected.title = title.value
    render(notes)
}
note_text.oninput = function() {
    selected.text = note_text.value
    render(notes)
}

search.oninput = function() {
    let value = search.value
    if (value == '') {
        header.innerText = 'All Notes'
        render(notes)
        was_searched = false
        return   
    }
    let pattern = new RegExp(value, 'i') 
    temp = []
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].title.search(pattern) != -1 || notes[i].text.search(pattern) != -1) {
            temp.push(notes[i])
        }
    }
    header.innerText =  search.value.toString()
    was_searched = true
    render(temp)
}


function getParameter(param) {
    const location = window.location.search
    let params = location.split('?')[1]
    if (!params) {
        return null
    }
    params = params.split('&')
    for (let i = 0; i < params.length; i++){
        let temp = params[i].split('=')
        if (temp[0] === param) {
            return temp[1]
        }
    }
    return null
}

function render(array) {
    display.innerHTML = ''
    for (let i = 0; i < array.length; i++) {
        display.prepend(array[i].createNote())
    }
    if (array.length == 1) {
        counter.innerText = '1 note'    
    } else {
        counter.innerText = `${array.length} notes`       
    }
    if (selected !== null) {
        title.disabled = false
        title.value = selected.title
        note_text.disabled = false
        note_text.value = selected.text   
        if (selected.title === '') {
            selected.title = 'Untitled'
        }
    } else {
        title.disabled = true
        title.value = ''
        note_text.disabled = true
        note_text.value = ''
    }

}

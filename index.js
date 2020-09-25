class Note {
    constructor() {
        this.text = ''
        this.title = 'Untitled'
        this.selected = false
        this.id = Date.now()
        this.date = this.set_date()
    }
    createNote() {
        let note = document.createElement("div")
        note.classList.add("note")
        if (this.selected) {
            note.classList.add("selected")
        }
        note.setAttribute('id', this.id.toString())
        note.innerHTML = `<p class="title-name">${this.title}</p><button class="select-btn"></button>`
        note.innerHTML += `<p class="date">${this.date}</p>`
        return note    
    }
    set_date() {
        const current_date = new Date()
        const monthes = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const day = current_date.getDate().toString()
        const month = monthes[current_date.getMonth()].toString()
        const hours = zerofill(current_date.getHours().toString())
        const minutes = zerofill(current_date.getMinutes().toString())
        const seconds = zerofill(current_date.getSeconds().toString())
        const date  = `${month} ${day}, ${hours}:${minutes}:${seconds}`
        return date
    }
}
const display = document.getElementsByClassName("notes")[0] //id in html

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
    
}
let notes = []
window.onunload = function() {
    for (let i = 0; i < notes.length; i++) {
        if (notes[i].selected === true)
            notes[i].selected = false
    }
    selected = null
    localStorage.setItem('notes', JSON.stringify(notes)) 
}
const add_btn = document.getElementsByClassName("add-btn")[0] //id
add_btn.onclick = function() {
    let note = new Note()
    notes.push(note)
    header.innerText = 'All Notes'
    search.value = ''
    render(notes)
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
    } else {
        title.disabled = true
        title.value = ''
        note_text.disabled = true
        note_text.value = ''
    }

}
let selected = null
window.onclick = function(event) {
    if (event.target.classList.contains('select-btn')) {
        let id = event.target.parentNode.id
        console.log(id)
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id == id) {
                selected = notes[i]
                notes[i].selected = true
            } else {
                if (notes[i].title === '') {
                    notes[i].title = 'Untitled'
                }
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

const delete_btn = document.getElementById('delete-btn')
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

const title = document.getElementById('title')
const note_text = document.getElementById('note-text')
title.value = ''
title.disabled = true
note_text.value = ''
note_text.disabled = true

title.oninput = function() {
    selected.title = title.value
    render(notes)
}
note_text.oninput = function() {
    selected.text = note_text.value
    render(notes)
}

const counter = document.getElementById('counter')

let header = document.getElementById('header')
const search = document.getElementById('search-input')
search.value = ''
let was_searched = false
let temp = []
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

function zerofill(str) {
    let copy = ''
    if (str.length === 1) {
        copy += '0' + str;
    } else {
       copy += str
    }
    return copy
}
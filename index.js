class Note {
    constructor() {
        this.text = ''
        this.title = 'Untitled'
        this.selected = false
        this.id = Date.now()
    }
    createNote() {
        let note = document.createElement("div")
        note.classList.add("note")
        if (this.selected) {
            note.classList.add("selected")
        }
        note.setAttribute('id', this.id.toString())
        note.innerHTML = `<p class="title-name">${this.title}</p><button class="select-btn"></button>`
        return note    
    }
}
const display = document.getElementsByClassName("notes")[0] //id in html
let notes = []
const add_btn = document.getElementsByClassName("add-btn")[0] //id
add_btn.onclick = function() {
    let note = new Note()
    notes.push(note)
    render()
}

function render() {
    display.innerHTML = ''
    for (let i = 0; i < notes.length; i++) {
        display.appendChild(notes[i].createNote())
    }
    if (notes.length == 1) {
        counter.innerText = '1 note'    
    } else {
        counter.innerText = `${notes.length} notes`       
    }
    if (selected) {
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
                notes[i].selected = false
            }
        }
        render()
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
    notes = copy
    render()
} 

const title = document.getElementById('title')
const note_text = document.getElementById('note-text')
title.disabled = true
note_text.disabled = true

title.oninput = function() {
    selected.title = title.value
    render()
}
note_text.oninput = function() {
    selected.text = note_text.value
    render()
}

const counter = document.getElementById('counter')
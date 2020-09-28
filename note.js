class Note {
    constructor() {
        this.text = ''
        this.title = 'Untitled'
        this.selected = false
        this.id = Date.now()
        this.date = this.setDate()
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
    setDate() {
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

function zerofill(str) {
    let copy = ''
    if (str.length === 1) {
        copy += '0' + str;
    } else {
       copy += str
    }
    return copy
}
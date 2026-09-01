import Id from '../helpers/id_system.js'
import { generateTimestamp } from '../helpers/dates.js'

export default class Note {
    constructor(title) {
        this.id = Id.generateNoteId()
        this.title = title.trim()
        this.proId = null
        this.createdAt = generateTimestamp()
        this.proKeyword = null
    }
    static fromJSON(obj) {
        const note = Object.create(Note.prototype)
        Object.assign(note, obj)

        return note
    }

    getPath() {
        return this.id
    }
}
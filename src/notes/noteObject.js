import Id from '../helpers/id_system.js'
import { generateTimestamp } from '../helpers/dates.js'

export default class Note {
    constructor(title) {
        this.id = Id.generateNoteId()
        this.title = title.trim()
        this.proId = null
        this.createdAt = generateTimestamp()
    }

    getPath() {
        return this.id
    }

    isValidId() {
        return this.id && this.id.startsWith('nte-') && this.id.length === 40
    } 
}
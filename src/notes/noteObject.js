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
        const id = this.id

        const dirName = id.slice(0, 6)
        const filename = id.slice(6)

        return {dirName, filename}
    }

    isValidId() {
        return this.id && this.id.startsWith('nte-') && this.id.length === 40
    } 
}
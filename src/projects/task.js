import Id from '../helpers/id_system.js'

export default class Task {
    constructor(title) {
        this.id = Id.generateTaskId()
        this.title = title.trim()
        this.proId = null
        this.proKeyword = null
        this.createdAt = new Date().toLocaleDateString()
        this.completed = false
        this.dueDate = null
    }

    markAsCompleted() {
        this.completed = true
    }
}



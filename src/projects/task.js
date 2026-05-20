import crypto from 'crypto'

export default class Task {
    constructor(title) {
        this.id = `tsk-${crypto.randomUUID()}`
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



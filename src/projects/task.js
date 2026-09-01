import Id from '../helpers/id_system.js'
import { generateTimestamp } from '../helpers/dates.js'

export default class Task {
    constructor(title) {
        this.id = Id.generateTaskId()
        this.title = title.trim()
        this.proId = null
        this.proKeyword = null
        this.createdAt = generateTimestamp()
        this.completed = false
        this.dueDate = null
    }

    static fromJSON(obj) {
        const task = Object.create(Task.prototype)
        Object.assign(task, obj)

        return task
    }

    markAsCompleted() {
        this.completed = true
    }
}



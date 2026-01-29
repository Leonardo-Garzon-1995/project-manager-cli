import Task from './task.js'
class Project {
    constructor(title, description) {
        this.title = title
        this.description = description
        this.createdAt = new Date().toLocaleDateString()
        this.tags = []
        this.tasks = []
        this.dueDate = null
    }

    addTag(tag) {
        if (typeof tag !== 'string') return
        if (this.tags.includes(tag)) return
        this.tags.push(tag)
    }

    addTask(title) {
        const newTask = new Task(title)
        this.tasks.push(newTask)
    }


}
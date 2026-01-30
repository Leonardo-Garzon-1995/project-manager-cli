import Task from './task.js'
import {colors} from '../utils.js'

export default class Project {
    constructor(title, description) {
        this.title = title
        this.description = description
        this.createdAt = new Date().toLocaleDateString()
        this.tags = []
        this.tasks = []
        this.dueDate = null
        this.highImportance = true
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

    listTasks() {
        
        this.tasks.forEach((t, index) => {
            let taskStatus = ""
            if (t.completed) {
                taskStatus = `${colors.brightgreen}\u2713${colors.reset}`
            } else {
                taskStatus =  `${colors.brightred}\u2717${colors.reset}`
            }
            console.log(`[${colors.cyan}${index + 1}${colors.reset}] - ${t.title} (${taskStatus})`)
        })
    }

    setTaskAsCompletedByIndex(index) {
        this.tasks[index - 1].markAsCompleted()
    }

    viewTaskByIndex(index) {
        const task = this.tasks[index - 1]
        console.log(task)
    }

}


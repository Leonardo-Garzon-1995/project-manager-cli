import Task from './task.js'
import {colors} from '../utils.js'

import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'


export default class Project {
    constructor(title, description) {
        this.title = title
        this.description = description
        this.createdAt = new Date().toLocaleDateString()
        this.dueDate = null
        this.highImportance = false
        this.tags = []
        this.tasks = []
        
    }
    
    // Project affected-directly methods
    addTag(tag) {
        if (typeof tag !== 'string') return
        if (this.tags.includes(tag)) return
        this.tags.push(tag)
    }

    // Tasks-affedted methods

    async addTask() {
        const rl = readline.createInterface({ input, output, terminal: false })

        let title = await rl.question("Enter task title: ")
        while (!title || typeof title !== 'string') {
            console.log("A tile is required and must be a string")
            title = await rl.question("Enter task title: ")
        }
        let dueDate = await rl.question("Enter due date (YYYY-MM-DD): ")
        if (dueDate === "next") {
            dueDate = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()
        }
        while (!dueDate || typeof dueDate !== 'string') {
            console.log("A due date is required and must be a string")
            dueDate = await rl.question("Enter due date (YYYY-MM-DD): ")
        }

        const newTask = new Task(title)
        newTask.dueDate = new Date(dueDate).toLocaleDateString()
        this.tasks.push(newTask)

        rl.close()
    }

    markTaskAsCompletedByIndex(index) {
        this.tasks[index - 1].markAsCompleted()
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

    deleteTaskByIndex(i) {
        const filtered = this.tasks.filter((_, index) => index !== i - 1)
        this.tasks = filtered
        return this.tasks
    }

    setTaskAsCompletedByIndex(index) {
        this.tasks[index - 1].markAsCompleted()
    }

    viewTaskByIndex(index) {
        const task = this.tasks[index - 1]
        console.log("")
        console.log(`________TASK________`.padStart(28, " "))
        console.log(`
        Title: ${colors.cyan}${task.title}${colors.reset}
        Posted: ${colors.cyan}${new Date(task.createdAt).toLocaleDateString()}${colors.reset}
        Due Date: ${colors.cyan}${task.dueDate || "No due date"}${colors.reset}
        Completed: ${task.completed ? `${colors.brightgreen}\u2713${colors.reset}` : `${colors.brightred}\u2717${colors.reset}`}
            `)
    }

}


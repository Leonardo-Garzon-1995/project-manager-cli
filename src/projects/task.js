import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const rl = readline.createInterface({ input, output, terminal: false })
export default class Task {
    constructor(title) {
        this.title = title.trim()
        this.createdAt = new Date().toLocaleString()
        this.completed = false
        this.dueDate = null
    }

    markAsCompleted() {
        this.completed = true
    }

    async updateTitle() {
        const title = await rl.question("Enter task title: ")
        if (!title || typeof title !== 'string') {
            console.log("A tile is required and must be a string")
            title = await rl.question("Enter task title: ")
        }
        this.title = title.trim()
    }

    async updateDueDate() {
        const dueDate = await rl.question("Enter due date (YYYY-MM-DD): ")
        this.dueDate = new Date(dueDate).toLocaleDateString()
        if (!dueDate || this.dueDate !== 'Invalid Date') {
            console.log("A due date is required and must be a string")
            dueDate = await rl.question("Enter due date (YYYY-MM-DD): ")
        }
    }

}



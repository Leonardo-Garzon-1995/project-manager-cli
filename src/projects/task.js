import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export default class Task {
    constructor(title) {
        if (!title || typeof title !== 'string') {
            console.log("A tile is required and must be a string")
            return
        }
        this.title = title.trim()
        this.createdAt = new Date().toLocaleString()
        this.completed = false
        this.dueDate = null
    }

    markAsCompleted() {
        this.completed = true
    }

    async setUpDueDate() {
        const rl = readline.createInterface({ input, output })
        try {
            const answer = await rl.question('Enter due date (YYYY-MM-DD): ')
            if (!answer) {
                console.log('You must enter a due date')
                rl.close()
                return
            }
            const date = new Date(answer).toLocaleString()
            if (date === 'Invalid Date') {
                console.log('You must enter a valid date format (YYYY-MM-DD)')
                rl.close()
                return
            }
            this.dueDate = date

            rl.close()
        } catch (error) {
            console.log(error)
        }
    }
}



let test = new Task(1)
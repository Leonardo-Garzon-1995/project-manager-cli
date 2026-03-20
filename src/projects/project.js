import Task from './task.js'
import {colors} from '../utils.js'

import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'


export default class Project {
    constructor(title, description, keyword) {
        this.id = `pro-${crypto.randomUUID()}`
        this.title = title.trim()
        this.keyword = keyword? keyword.toUpperCase().trim() : title.slice(0, 5).toUpperCase().trim()
        this.description = description.trim()
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

        console.log(`   ${colors.brightyellow}♦ ${colors.cyan}Adding task to: ${this.title}${colors.reset}`)
        console.log("   │")
        let title = await rl.question(`   ${colors.brightyellow}♦ Enter task title: ${colors.reset}`)
        console.log("   │")
        while (!title || typeof title !== 'string') {
            console.log("   A tile is required and must be a string")
            title = await rl.question(`   ${colors.brightyellow}♦ Enter task title: ${colors.reset}`)
            console.log("   │")
        }
        let dueDate = await rl.question(`   ${colors.brightyellow}♦ Set due date (YYYY-MM-DD): ${colors.reset}`)
        console.log("   │")
        if (dueDate === "today") {
            dueDate = new Date().toLocaleDateString()
        }
        if (dueDate === "tomorrow") {
            dueDate = new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleDateString()
        }
        if (dueDate === "week") {
            dueDate = new Date(new Date().setDate(new Date().getDate() + 7)).toLocaleDateString()
        }
        if (dueDate === "month") {
            dueDate = new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString()
        }
        while (!dueDate || typeof dueDate !== 'string') {
            console.log("   A due date is required and must be a string")
            dueDate = await rl.question(`   ${colors.brightyellow}♦ Set due date (YYYY-MM-DD): ${colors.reset}`)
            console.log("   │")
        }

        const newTask = new Task(title)
        newTask.dueDate = new Date(dueDate).toLocaleDateString()
        newTask.proId = this.id
        newTask.proKeyword = this.keyword
        this.tasks.push(newTask)

        rl.close()
    }

    listTasks() {

        if (this.tasks.length === 0) {
            console.log("No tasks found for this project.")
            return
        }

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

    filterTasksByCompleted() {
        const completedTasks = this.tasks.filter(t => t.completed)
        if (completedTasks.length === 0) return console.log("No completed tasks found for this project.")
        return completedTasks.forEach((t, index) => console.log(`[${colors.cyan}${index + 1}${colors.reset}] - ${t.title} (${colors.brightgreen}\u2713${colors.reset})`))
    }

    filterTasksByPending() {
        const pendingTasks = this.tasks.filter(t => !t.completed)
        if (pendingTasks.length === 0) return console.log("No pending tasks found for this project.")
        return pendingTasks.forEach((t, index) => console.log(`[${colors.cyan}${index + 1}${colors.reset}] - ${t.title} (${colors.brightred}\u2717${colors.reset})`))
    }

    deleteTaskByIndex(...indexes) {
        const filtered = this.tasks.filter((_, index) => !indexes.includes(index))
        this.tasks = filtered
        return this.tasks
    }

    setTaskAsCompletedByIndex(index) {
        this.tasks[index - 1].markAsCompleted()
    }

    clearAllTasks() {
        this.tasks = []
        
    }

    toggleHighImportance() {
        this.highImportance = !this.highImportance
    }

    viewTaskByIndex(index) {
        const task = this.tasks[index - 1]
        const dueDate = new Date(task.dueDate).toLocaleDateString()
        console.log("")
        console.log(`________TASK________`)
        console.log(`${colors.cyan}♢ ${task.title}${colors.reset}\n`)
        console.log(`${colors.cyan}⚐ Due Date:${colors.reset} ${dueDate}`)
        console.log(`${colors.cyan}⚐ Completed:${colors.reset} ${task.completed ? `${colors.brightgreen}\u2713${colors.reset}` : `${colors.brightred}\u2717${colors.reset}`}\n`)
    }

}


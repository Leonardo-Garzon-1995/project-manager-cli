import Task from './task.js'
import Note from '../notes/noteObject.js'
import { colors } from '../helpers/format.js'
import { isValidDate, generateTimestamp } from '../helpers/dates.js'
import Id from '../helpers/id_system.js'

export default class Project {
    constructor(title, description, keyword) {
        this.id = Id.generateProId()
        this.title = title.trim()
        this.keyword = keyword? keyword.toUpperCase().trim() : title.slice(0, 5).toUpperCase().trim()
        this.description = description.trim()
        this.createdAt = generateTimestamp()
        this.dueDate = null
        this.highImportance = false
        this.tags = []
        this.tasks = []
        this.notes = []
    }
    
    // Project affected-directly methods
    addTag(tag) {
        if (typeof tag !== 'string') return
        if (this.tags.includes(tag)) return
        this.tags.push(tag)
    }

    // Tasks-affedted methods

    addTask(entries={}) {

        const {
            title,
            dueDate

        } = entries

        const newTask = new Task(title)
        newTask.dueDate = new Date(dueDate).toLocaleDateString()
        newTask.proId = this.id
        newTask.proKeyword = this.keyword
        this.tasks.push(newTask)
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
        return completedTasks.forEach((t, index) => console.log(` (${colors.brightgreen}\u2713${colors.reset}) - ${t.title}`))
    }

    filterTasksByPending() {
        const pendingTasks = this.tasks.filter(t => !t.completed)
        if (pendingTasks.length === 0) return console.log("No pending tasks found for this project.")
        
        return pendingTasks.forEach((t, index) => console.log(` (${colors.brightred}\u2717${colors.reset}) - ${t.title}`))
    }

    deleteTaskByIndex(...indexes) {
        const parsedIndexes = indexes.map(index => parseInt(index))
        const filtered = this.tasks.filter((_, index) => !parsedIndexes.includes(index))
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

    // Note related methods

    addNote(title) {
        const newNote = new Note(title)
        newNote.proId = this.id

        this.notes.push(newNote)
    }

    listNotes() {
        if (this.notes.length === 0) {
            console.log("No notes found for this project.")
            return
        }

        this.notes.forEach((n, index) => {
            console.log(`[${colors.cyan}${index + 1}${colors.reset}] - ${n.title}`)
        })
    }

    deleteNoteByIndex(index) {
        const filtered = this.notes.filter((_, i) => i !== Number(index))
        this.notes = filtered
        return this.notes
    }

}


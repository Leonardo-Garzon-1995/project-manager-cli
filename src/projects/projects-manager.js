import Project from './project.js'
import StorageService from '../storage-service.js'
import {colors} from '../utils.js'

import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export default class ProjectsManager {
    constructor(filePath) {
        this.projects = StorageService.load(filePath)
    }

    clearAllProjects(filePath) {
        this.projects = []
        StorageService.save(filePath, this.projects)
    }

    // Project related methods
    async addProject(filePath) {
        const rl = readline.createInterface({ input, output, terminal: false })

        let title = await rl.question("Enter project title: ")
        while (!title || typeof title !== 'string') {
            console.log("A tile is required and must be a string")
            title = rl.question("Enter project title: ")
        }
        let description = await rl.question("Enter project description: ")
        while (!description || typeof description !== 'string') {
            console.log("A description is required and must be a string")
            description = await rl.question("Enter project description: ")
        }
        const project = new Project(title, description)
        this.projects.push(project)

        StorageService.save(filePath, this.projects)

        rl.close()
    }

    async addTaskToProjectByIndex(filePath, projectIndex) {
        await this.projects[projectIndex - 1].addTask()

        StorageService.save(filePath, this.projects)
    }

    // Tasks related methods
    listTasksByProjectIndex(index) {
        this.projects[index - 1].listTasks()
        console.log("")
        process.exit(0)

    }

    deleteTask(filePath, pIndex, tIndex) {
        const updatedtasks = this.projects[pIndex - 1].deleteTaskByIndex(tIndex)
        this.projects[pIndex -1].tasks = updatedtasks
        
        StorageService.save(filePath, this.projects)
        process.exit(0)
    }

    viewTaskByIndex(projectIndex, taskIndex) {
        this.projects[projectIndex - 1].viewTaskByIndex(taskIndex)
        process.exit(0)
    }

    // manager related methods
    listProjects() {
        this.projects.forEach((p, index) => {
            const indexPlusOne = index + 1
            const highImportance = p.highImportance ? `${colors.brightgreen}\u2191${colors.reset}` : `\u2193`
            const numberOfTasks = p.tasks.length > 0 ? `{${colors.brightyellow}${p.tasks.length}${colors.reset}}` : ``
            console.log(`[${colors.cyan}${indexPlusOne}${colors.reset}] - ${p.title} (${highImportance}) ${numberOfTasks}`)
            
        })
        console.log("")
        process.exit(0)
    }
    

    viewProjectByIndex(index) {
        const project = this.projects[index - 1]

        const description = project.description.length > 25 ? `${project.description.slice(0, 30)}...` : project.description
        console.log("")
        console.log(`_______PROJECT_______`.padStart(29, " "))
        console.log(`
        Title: ${colors.cyan}${project.title}${colors.reset}
        Description: ${colors.cyan}${description}${colors.reset}
        Tasks: ${project.tasks.length}
        Posted: ${colors.cyan}${project.createdAt}${colors.reset}
        Due Date: ${colors.cyan}${project.dueDate || "No due date"}${colors.reset}
        importance: ${project.highImportance ? `${colors.brightgreen}\u2713${colors.reset}` : `${colors.brightred}\u2717${colors.reset}`}
        `)
        process.exit(0)
    }
}


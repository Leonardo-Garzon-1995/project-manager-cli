import Project from './project.js'
import StorageService from '../storage-service.js'
import {colors, displayBanner} from '../utils.js'

import readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

export default class ProjectsManager {
    constructor(filePath) {
        this.projects = StorageService.load(filePath)
    }

    // Project related methods
    async addProject(filePath) {
        const rl = readline.createInterface({ input, output, terminal: false })
        try {
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
            console.log(`\n${colors.green}\u2713 Project added successfully!${colors.reset}`)

        } catch (error) {
            console.log(error, error.message )
        }
        rl.close()
    }

    async addTaskToProjectByIndex(filePath, projectIndex) {
        try {
            await this.projects[projectIndex - 1].addTask()
            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Task added successfully!${colors.reset}`)

        } catch (error) {
            console.log(error, error.message )
        }
        
    }

    // Tasks related methods
    listTasksByProjectIndex(index) {
        const proName = `${index} - ${this.projects[index - 1].title}`
        displayBanner("TASKS FOR:", proName)
        this.projects[index - 1].listTasks()
        console.log("")
        process.exit(0)

    }

    deleteTask(filePath, pIndex, tIndex) {
        try {
            const updatedtasks = this.projects[pIndex - 1].deleteTaskByIndex(tIndex)
            this.projects[pIndex -1].tasks = updatedtasks
            
            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Task deleted successfully!${colors.reset}`)

            process.exit(0)
        } catch (error) {
            console.log(error, error.message )
        }
    }

    viewTaskByIndex(projectIndex, taskIndex) {
        this.projects[projectIndex - 1].viewTaskByIndex(taskIndex)
        process.exit(0)
    }

    // manager direct related methods
    listProjects() {
        displayBanner("YOUR PROJECTS:", "")

        if (this.projects.length === 0) {
            console.log("No projects found.")
            process.exit(0)
        }
        this.projects.forEach((p, index) => {
            const indexPlusOne = index + 1
            const highImportance = p.highImportance ? `${colors.brightgreen}\u2191${colors.reset}` : `\u2193`
            const numberOfTasks = p.tasks.length > 0 ? `{${colors.brightyellow}${p.tasks.length}${colors.reset}}` : ``
            console.log(`[${colors.cyan}${indexPlusOne}${colors.reset}] - ${p.title} (${highImportance}) ${numberOfTasks}`)
            
        })
        console.log("")
        process.exit(0)
    }

    deleteProjectByIndex(filePath, index) {
        try {
            const filtered = this.projects.filter((_, i) => i !== index - 1)
            this.projects = filtered

            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Project deleted successfully!${colors.reset}`)
            process.exit(0)
        } catch (error) {
            console.log(error, error.message )
        }

    }

    clearAllProjects(filePath) {
        try {
            this.projects = []
            StorageService.save(filePath, this.projects)

            console.log(`\n${colors.green}\u2713 AllProjects  have been cleared successfully!${colors.reset}`)
        } catch (error) {
            console.log(error, error.message )
        }
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


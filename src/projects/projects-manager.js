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
        if (!projectIndex || Number.isNaN(parseInt(projectIndex))) {
            console.log('   The project index must be a number')
            return
        }
        if (!this.projects || !this.projects[projectIndex - 1]) {
            console.log("   This project does not exist. Try a different project or create a new project.")
            return
        }
        try {
            await this.projects[projectIndex - 1].addTask()
            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Task added successfully!${colors.reset}`)

        } catch (error) {
            console.log(error, error.message )
        }
    }
    
    toggleProjectImportance(filePath, pIndex) {
        if (!pIndex || Number.isNaN(parseInt(pIndex))) {
            console.log('   The project index must be a number')
            return
        }
        if (!this.projects[pIndex -1]) {
            console.log(`   Project at index ${pIndex} does not exist.`)
            return
        }
        this.projects[pIndex -1].toggleHighImportance()
        StorageService.save(filePath, this.projects)
        
        if (this.projects[pIndex -1].highImportance) {
            console.log(`\n${colors.green}\u2713 Project at index ${pIndex} has been marked as high importance.${colors.reset}`)
        } else {
            console.log(`\n${colors.green}\u2713 Project at index ${pIndex} has been marked as low importance.${colors.reset}`)
        }
    }

    // Tasks related methods
    listTasksByProjectIndex(index) {
        if (!index || Number.isNaN(parseInt(index))) {
            console.log('   The project index must be a number.')
            return
        }

        if (!this.projects[index - 1]) {
            console.log(`   There is not a project at index ${index}`)
            return 
        }

        try{
            const proName = `${index} - ${this.projects[index - 1].title}`
            displayBanner("TASKS FOR:", proName)

            if (this.projects[index - 1].tasks.length === 0) {
                console.log(`This project has no tasks.`)
                console.log("")
                console.log("=".repeat(42) + '\n')
                return
            }
            this.projects[index - 1].listTasks()
            console.log("")
            console.log("=".repeat(42) + '\n')
        } catch (error) {
            console.log(error, error.message)
        }

    }

    deleteTask(filePath, pIndex, tIndex) {
        if (!pIndex || Number.isNaN(parseInt(pIndex))) {
            console.log('   The project index must be a number')
            return
        }

        if (!this.projects[pIndex -1]) {
            console.log(`   Project at index ${pIndex} does not exist.`)
            return
        }

        if (!tIndex || Number.isNaN(parseInt(tIndex))) {
            console.log('   The task index must be a number')
            return
        }
        

        if (!this.projects[pIndex -1].tasks[tIndex -1]) {
            console.log(`   Task at index ${tIndex} does not exist.`)
            return
        }
        try {
            const updatedtasks = this.projects[pIndex - 1].deleteTaskByIndex(tIndex)
            this.projects[pIndex -1].tasks = updatedtasks
            
            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Task deleted successfully!${colors.reset}`)

        } catch (error) {
            console.log(error, error.message )
        }
    }

    markTaskAsCompleted(filePath, pIndex, tIndex) {
        if (!pIndex || Number.isNaN(parseInt(pIndex))) {
            console.log('   The project index must be a number')
            return
        }

        if (!this.projects[pIndex -1]) {
            console.log(`   Project at index ${pIndex} does not exist.`)
            return
        }

        if (!tIndex || Number.isNaN(parseInt(tIndex))) {
            console.log('   The task index must be a number')
            return
        }
        
        if (!this.projects[pIndex -1].tasks[tIndex -1]) {
            console.log(`   Task at index ${tIndex} does not exist.`)
            return
        }

        if (this.projects[pIndex -1].tasks[tIndex -1].completed) {
            console.log(`   Task at index ${tIndex} is already completed.`)
            return
        }

        try {
            this.projects[pIndex - 1].setTaskAsCompletedByIndex(tIndex)
            StorageService.save(filePath, this.projects)

            console.log("")
            console.log(`${colors.brightgreen}\u2713 Task ${tIndex} has been marked as completed!${colors.reset}`)
        } catch (error) {
            console.log(error)
        }
        
    }

    clearTasksByProjectIndex(filePath, pIndex) {
        if (!pIndex || Number.isNaN(parseInt(pIndex))) {
            console.log('   The project index must be a number')
            return
        }
        if (!this.projects[pIndex -1]) {
            console.log(`   Project at index ${pIndex} does not exist.`)
            return
        }

        if (this.projects[pIndex -1].tasks.length === 0) {
            console.log(`   Project at index ${pIndex} has no tasks.`)
            return
        }

        try {
            this.projects[pIndex - 1].clearAllTasks()
            StorageService.save(filePath, this.projects)

            console.log("")
            console.log(`${colors.brightgreen}\u2713 Tasks for project ${pIndex} have been cleared successfully!${colors.reset}`)
        } catch (error) {
            console.log(error, error.message)
        }
        
    }

    viewTaskByIndex(pIndex, tIndex) {
        if (!pIndex || Number.isNaN(parseInt(pIndex))) {
            console.log('   The project index must be a number')
            return
        }

        if (!this.projects[pIndex -1]) {
            console.log(`   Project at index ${pIndex} does not exist.`)
            return
        }

        if (!tIndex || Number.isNaN(parseInt(tIndex))) {
            console.log('   The task index must be a number')
            return
        }  

        if (!this.projects[pIndex -1].tasks[tIndex -1]) {
            console.log(`   Task at index ${tIndex} does not exist.`)
            return
        }

        try {
            this.projects[pIndex - 1].viewTaskByIndex(tIndex)
        } catch (error) {
            console.log(error, error.message)
        }
    }

    // manager direct related methods
    listProjects() {
        displayBanner("YOUR PROJECTS:", "")

        if (this.projects.length === 0) {
            console.log("No projects found.\n")
            console.log("")
            console.log("=".repeat(42) + '\n')
            return
        }
        this.projects.forEach((p, index) => {
            const indexPlusOne = index + 1
            const highImportance = p.highImportance ? `${colors.brightgreen}\u2191${colors.reset}` : `\u2193`
            const numberOfTasks = p.tasks.length > 0 ? `{${colors.brightyellow}${p.tasks.length}${colors.reset}}` : ``
            console.log(`[${colors.cyan}${indexPlusOne}${colors.reset}] - ${p.title} (${highImportance}) ${numberOfTasks}`)
            
        })
        console.log("")
        console.log("=".repeat(42) + '\n')
    }

    deleteProjectByIndex(filePath, index) {
        if (!index || Number.isNaN(parseInt(index))) {
            console.log('   The project index must be a number')
            return
        }
        if (!this.projects[index - 1]) {
            console.log(`   There is not a project at index ${index}`)
            return
        }
        try {
            const filtered = this.projects.filter((_, i) => i !== index - 1)
            this.projects = filtered

            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Project "${index}" deleted successfully!${colors.reset}`)
        } catch (error) {
            console.log(error, error.message )
        }

    }

    clearAllProjects(filePath) {
        try {
            this.projects = []
            StorageService.save(filePath, this.projects)

            console.log(`\n${colors.green}\u2713 AllProjects have been cleared successfully!${colors.reset}`)
        } catch (error) {
            console.log(error, error.message )
        }
    }
    
    viewProjectByIndex(index) {
        if (!index || Number.isNaN(parseInt(index))) {
            console.log('   The project index must be a number')
            return
        }

        if (!this.projects[index - 1]) {
            console.log(`   There is not a project at index ${index}`)
            return
        }

        try {
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
            importance: ${project.highImportance ? `${colors.brightgreen}\u2191${colors.reset}` : `${colors.brightred}\u2193${colors.reset}`}
            `)

        } catch (error) {
            console.log(error, error.message )
        }
        
    }
}


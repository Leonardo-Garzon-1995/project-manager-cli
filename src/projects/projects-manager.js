import Project from './project.js'
import StorageService from '../storage-service.js'
import {colors, displayBanner, filterTasksByDate, displayBannerThin} from '../utils.js'

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
            let title = await rl.question(`   ${colors.cyan}♦ Enter project title: ${colors.reset}`)
            console.log("   │")
            while (!title || typeof title !== 'string') {
                console.log("   A tile is required and must be a string")
                title = await rl.question(`   ${colors.cyan}♦ Enter project title: ${colors.reset}`)
                console.log("   │")
            }
            let description = await rl.question(`   ${colors.cyan}♦ Enter project description: ${colors.reset}`)
            console.log("   │")
            while (!description || typeof description !== 'string') {
                console.log("   A description is required and must be a string")
                description = await rl.question(`   ${colors.cyan}♦ Enter project description: ${colors.reset}`)
                console.log("   │")
            }
            let keyword = (await rl.question(`   ${colors.cyan}♦ Give the project a keyword: ${colors.reset}`)).trim()
            console.log("   │")
            while (!keyword || typeof keyword !== 'string') {
                console.log("   A keyword is required and must be a string")
                keyword = (await rl.question(`   ${colors.cyan}♦ Give the project a keyword: ${colors.reset}`)).trim()
                console.log("   │")
            }
            const project = new Project(title, description, keyword)
            this.projects.push(project)

            StorageService.save(filePath, this.projects)
            console.log(`   ${colors.green}\u2713 Project added successfully!${colors.reset}`)

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
            console.log(`   ${colors.green}\u2713 Task added successfully!${colors.reset}`)

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

    listCompletedTasksByIndex(pIndex) {
        if (!pIndex || Number.isNaN(parseInt(pIndex))) {
            console.log('   The project index must be a number')
            return
        }
        if (!this.projects[pIndex -1]) {
            console.log(`   Project at index ${pIndex} does not exist.`)
            return
        }

        try {
            displayBanner("COMPLETED TASKS FOR:", `${pIndex} - ${this.projects[pIndex - 1].title}`, colors.brightgreen)
            this.projects[pIndex -1].filterTasksByCompleted()
            console.log("=".repeat(42) + '\n')
        } catch (error) {
            console.log(error)
        }
    }

    listPendingTasksByIndex(pIndex) {
        if (!pIndex || Number.isNaN(parseInt(pIndex))) {
            console.log('   The project index must be a number')
            return
        }
        if (!this.projects[pIndex -1]) {
            console.log(`   Project at index ${pIndex} does not exist.`)
            return
        }
        try {
            displayBanner("PENDING TASKS FOR:", `${pIndex} - ${this.projects[pIndex - 1].title}`, colors.yellow)
            this.projects[pIndex -1].filterTasksByPending()
            console.log("=".repeat(42) + '\n')
        } catch (error) {
            console.log(error)
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
            const importance = project.highImportance ? `${colors.brightgreen}High${colors.reset}` : `Low`
            console.log("")
            console.log(`_______PROJECT_______`)
            console.log(`${colors.cyan}♢ ${project.title}${colors.reset}\n`)
            
            console.log(`${colors.cyan}⚐ Keyword:${colors.reset} ${project.keyword}`)
            console.log(`${colors.cyan}⚐ Tasks:${colors.reset} ${project.tasks.length}`)
            console.log(`${colors.cyan}⚐ Posted:${colors.reset} ${project.createdAt}`)
            console.log(`${colors.cyan}⚐ Due Date:${colors.reset} ${project.dueDate || "No due date"}`)
            console.log(`${colors.cyan}⚐ Importance:${colors.reset} ${importance}`)
            if (project.tags.length > 0) { console.log(`${colors.cyan}⚐ Tags:${colors.reset} ${project.tags.join(", ")}`)}
            console.log(`${colors.cyan}⚐ Description:${colors.reset} ${project.description}\n`)

        } catch (error) {
            console.log(error, error.message )
        }
        
    }

    displayDailyTasks() {
        const todayTasks = filterTasksByDate(this.projects)
        const date = new Date().toLocaleDateString()

        displayBannerThin(date, "YOUR TASKS FOR TODAY:")
        todayTasks.forEach((t, index) => {
            let taskStatus = ""
            if (t.completed) {
                taskStatus = `${colors.brightgreen}\u2713${colors.reset}`
            } else {
                taskStatus =  `${colors.brightred}\u2717${colors.reset}`
            }
            console.log(`[${colors.cyan}${index + 1}${colors.reset}] - ${t.title} (${taskStatus})`)
        })
        
    }
}


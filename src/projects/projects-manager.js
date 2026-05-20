import Project from './project.js'
import StorageService from '../storage-service.js'
import {colors, displayBanner, displayBannerThin, buildMiniBar, divider} from '../helpers/format.js'
import { isValidDate } from '../helpers/dates.js'
import { filterTasksByDate } from '../helpers/filters.js'

import * as logger from '../helpers/logger.js'

import Prompt from '../promptSys.js'

// const prompt = new Prompt()

export default class ProjectsManager {
    constructor(filePath) {
        this.projects = StorageService.load(filePath)
    }

    // Project related methods
    async addProject(filePath) {
        try {
            console.log("")
            let title = await Prompt.ask(`   ${colors.cyan}♦ Enter project title: ${colors.reset}`)
            console.log("   │")
            while (!title || typeof title !== 'string') {
                console.log("   A tile is required and must be a string")
                title = await Prompt.ask(`   ${colors.cyan}♦ Enter project title: ${colors.reset}`)
                console.log("   │")
            }
            let description = await Prompt.ask(`   ${colors.cyan}♦ Enter project description: ${colors.reset}`)
            console.log("   │")
            while (!description || typeof description !== 'string') {
                console.log("   A description is required and must be a string")
                description = await Prompt.ask(`   ${colors.cyan}♦ Enter project description: ${colors.reset}`)
                console.log("   │")
            }
            let keyword = (await Prompt.ask(`   ${colors.cyan}♦ Give the project a keyword: ${colors.reset}`)).trim()
            console.log("   │")
            if (keyword.length > 7) keyword = keyword.substring(0, 7)
            const project = new Project(title, description, keyword)
            this.projects.push(project)

            StorageService.save(filePath, this.projects)
            console.log(`   ${colors.green}\u2713 Project added successfully!${colors.reset}`)
            logger.info(`New Project: ${title}`)
            console.log('')

        } catch (error) {
            logger.error(error.stack)
            console.log(error, error.message )
        }
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
            const project = this.projects[projectIndex - 1]
            console.log("")
            console.log(`   ${colors.brightyellow}♦ ${colors.cyan}Adding task to: ${project.title}${colors.reset}`)
            console.log("   │")
            let title = await Prompt.ask(`   ${colors.brightyellow}♦ Enter task title: ${colors.reset}`)
            while (!title || typeof title !== 'string') {
                console.log(`   ${colors.red}♦${colors.reset} A title is required and must be a string.`)
                console.log("   │")
                title = await Prompt.ask(`   ${colors.brightyellow}♦ Enter task title: ${colors.reset}`)
            }
            console.log("   │")

            let dueDate = await Prompt.ask(`   ${colors.brightyellow}♦ Set due date (YYYY-MM-DD): ${colors.reset}`)
            console.log("   │")
            if (!dueDate) dueDate = "tomorrow"
        
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
            while (!isValidDate(dueDate)) {
                console.log("   │")
                console.log(`   ${colors.red}♦${colors.reset} Invalid date format. Please enter a valid date in the format YYYY-MM-DD.`)
                console.log("   │")
                dueDate = await Prompt.ask(`   ${colors.brightyellow}♦ Set due date (YYYY-MM-DD): ${colors.reset}`)
            }

            project.addTask({title, dueDate})

            StorageService.save(filePath, this.projects)
            console.log(`   ${colors.green}\u2713 Task added successfully!${colors.reset}`)
            console.log('')

        } catch (error) {
            logger.error(error.stack)
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
            const updatedtasks = this.projects[pIndex - 1].deleteTaskByIndex(tIndex - 1)
            
            this.projects[pIndex -1].tasks = updatedtasks
            
            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Task deleted successfully!${colors.reset}`)

        } catch (error) {
            console.log(`   ${colors.red}Something went wrong. Try again.${colors.reset}`)
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

    async clearTasksByProjectIndex(filePath, pIndex) {
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
            let approval = await Prompt.ask("Are you sure you want to clear all tasks (Y/n): ")

            if (approval.trim() === 'y' || approval.trim() === 'Y' || approval.trim() === 'yes') {
                this.projects[pIndex - 1].clearAllTasks()
                StorageService.save(filePath, this.projects)

                console.log("")
                console.log(`${colors.brightgreen}\u2713 Tasks for project ${pIndex} have been cleared successfully!${colors.reset}`)
            }
            
        } catch (error) {
            logger.error(error.stack)
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
            logger.info(`Project #${index} was deleted succesfully.`)
            console.log(`\n${colors.green}\u2713 Project "${index}" deleted successfully!${colors.reset}`)
        } catch (error) {
            logger.error(error.stack)
            console.log(error.message )
        }

    }

    async clearAllProjects(filePath) {
        let approval = await Prompt.ask("Are you sure you want to clear all projects (Y/n): ")

        if (approval.trim() === 'y' || approval.trim() === 'Y' || approval.trim() === 'yes') {
            try {
            this.projects = []
            StorageService.save(filePath, this.projects)

            console.log(`\n${colors.green}\u2713 AllProjects have been cleared successfully!${colors.reset}`)
            } catch (error) {
                console.log(error, error.message )
            }
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
            const doneTasks = project.tasks.filter(t => t.completed).length
            const totalTasks = project.tasks.length
            const dueDate = project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "No due date"
            const cratedAt = new Date(project.createdAt).toLocaleDateString()

            console.log("")
            console.log(`_______PROJECT_______`)
            console.log(`${colors.cyan}♢ ${project.title}${colors.reset}\n`)
            
            console.log(`${colors.cyan}⚐ Keyword:${colors.reset} ${project.keyword}`)
            console.log(`${colors.cyan}⚐ Posted:${colors.reset} ${cratedAt}`)
            console.log(`${colors.cyan}⚐ Due Date:${colors.reset} ${dueDate}`)
            console.log(`${colors.cyan}⚐ Importance:${colors.reset} ${importance}`)
            console.log(`${colors.cyan}⚐ Tasks: ${buildMiniBar(doneTasks, totalTasks, totalTasks)} ${colors.green}${doneTasks}${colors.reset}/${totalTasks}`)
            if (project.tags.length > 0) { console.log(`${colors.cyan}⚐ Tags:${colors.reset} ${project.tags.join(", ")}`)}
            console.log(`${colors.cyan}⚐ Description:${colors.reset} ${project.description}\n`)

        } catch (error) {
            console.log(error, error.message )
        }
        
    }

    displayDailyTasks() {
        const currentDate = new Date().toLocaleDateString()
        const todayTasks = filterTasksByDate(this.projects, currentDate)
        
        displayBannerThin(currentDate, "YOUR TASKS FOR TODAY:")
        console.log(`PRO-REF`.padEnd(10) + `STATUS`.padEnd(8) + `TASK`)
        divider(50)
        if (todayTasks.length < 1) {
            console.log("\tNo tasks for today yet")
            divider(50)
            console.log('')
            return
        }
        todayTasks.forEach((t) => {
            const keyword = t.proKeyword ? t.proKeyword : "-------"
            let taskStatus = ""
            if (t.completed) {
                taskStatus = `${colors.brightgreen}\u2713${colors.reset}`
            } else {
                taskStatus =  `${colors.brightred}\u2717${colors.reset}`
            }
            console.log(`${colors.cyan}${keyword}${colors.reset}`.padEnd(22) + taskStatus.padEnd(14) + `${t.title}`)
        })
        console.log("")
        divider(50)
        console.log('')
        
    }

    displayTasksByDate(date) {
        const parsedDate = new Date(date).toLocaleDateString()
        if (!isValidDate(parsedDate)) {
            console.error('error: invalid date format')
            console.log('Try YYYY-MM-DD')
            return
        }
        const tasks = filterTasksByDate(this.projects, parsedDate)

        displayBannerThin('YOUR TASKS FOR:', parsedDate)
        console.log(`PRO-REF`.padEnd(10) + `STATUS`.padEnd(8) + `TASK`)
        divider(50)
        if (tasks.length < 1) {
            console.log(`\tNo tasks for ${parsedDate}`)
            divider(50)
            console.log('')
            return
        }

        tasks.forEach(t => {
            const keyword = t.proKeyword ? t.proKeyword : "-------"
            let taskStatus = ''

            if (t.completed) {
                taskStatus = `${colors.brightgreen}\u2713${colors.reset}`
            } else {
                taskStatus = `${colors.brightred}\u2717${colors.reset}`
            }

            console.log(`${colors.cyan}${keyword}${colors.reset}`.padEnd(22) + taskStatus.padEnd(14) + `${t.title}`)
        })
        console.log('')
        divider(50)
        console.log('')
    }
}
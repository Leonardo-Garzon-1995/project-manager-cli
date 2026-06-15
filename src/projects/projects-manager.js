import Project from './project.js'
import StorageService from '../storage-service.js'
import {colors, displayBanner, displayBannerThin, buildMiniBar, divider} from '../helpers/format.js'
import { isValidDate } from '../helpers/dates.js'
import { filterTasksByDate, filterNotes } from '../helpers/filters.js'
import { createNoteFile, readNoteFile, deleteNoteFile, appendToNoteFile } from '../notes/noteFile.js'
import  * as prompter from '../prompt/prompter.js'
import { validateProjectIndex, validateTaskIndex, validateNoteIndex } from '../helpers/validation.js'
import * as logger from '../helpers/logger.js'


export default class ProjectsManager {
    constructor(filePath) {
        this.projects = StorageService.load(filePath)
    }

    // Project related methods
    async addProject(filePath) {
        try {
            const { title, description, keyword } = await prompter.addProjectPrompt()

            const project = new Project(title, description, keyword)
            this.projects.push(project)

            StorageService.save(filePath, this.projects)
            console.log(`   ${colors.green}\u2713 Project added successfully!${colors.reset}`)
            console.log('')

            logger.info(`New Project: ${title}`)

        } catch (error) {
            logger.error(error.stack)
            console.error(error.message )
        }
    }

    async addTaskToProjectByIndex(filePath, projectIndex) {
        try {
            validateProjectIndex(projectIndex, this.projects)

            const project = this.projects[projectIndex - 1]
            
            const { title, dueDate } = await prompter.addTaskPrompt(project)

            project.addTask({title, dueDate})

            StorageService.save(filePath, this.projects)
            console.log(`   ${colors.green}\u2713 Task added successfully!${colors.reset}`)
            console.log('')
            logger.info(`New task added: ${title}`)

        } catch (error) {
            logger.error(error.stack)
            console.error(error.message )
        }

    }
    
    toggleProjectImportance(filePath, projectIndex) {
        try {
            validateProjectIndex(projectIndex, this.projects)

            this.projects[projectIndex -1].toggleHighImportance()
            StorageService.save(filePath, this.projects)
            
            if (this.projects[projectIndex -1].highImportance) {
                console.log(`\n${colors.green}\u2713 Project at index ${projectIndex} has been marked as high importance.${colors.reset}`)
            } else {
                console.log(`\n${colors.green}\u2713 Project at index ${projectIndex} has been marked as low importance.${colors.reset}`)
            }
        } catch (error) {
            logger.error(error.stack);
            console.error(error.message)
        }
    }

    listCompletedTasksByIndex(projectIndex) {

        try {
            validateProjectIndex(projectIndex, this.projects)

            displayBanner("COMPLETED TASKS FOR:", `${projectIndex} - ${this.projects[projectIndex - 1].title}`, colors.brightgreen)
            this.projects[projectIndex -1].filterTasksByCompleted()
            console.log("=".repeat(42) + '\n')
        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
    }

    listPendingTasksByIndex(projectIndex) {
        try {
            validateProjectIndex(projectIndex, this.projects)

            displayBanner("PENDING TASKS FOR:", `${projectIndex} - ${this.projects[projectIndex - 1].title}`, colors.yellow)
            this.projects[projectIndex -1].filterTasksByPending()
            console.log("=".repeat(42) + '\n')
        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
    }

    // Tasks related methods
    listTasksByProjectIndex(projectIndex) {

        try{
            validateProjectIndex(projectIndex, this.projects)

            const proName = `${projectIndex} - ${this.projects[projectIndex - 1].title}`
            displayBanner("TASKS FOR:", proName)

            if (this.projects[projectIndex - 1].tasks.length === 0) {
                console.log(`This project has no tasks.`)
                console.log("")
                console.log("=".repeat(42) + '\n')
                return
            }
            this.projects[projectIndex - 1].listTasks()
            console.log("")
            console.log("=".repeat(42) + '\n')
        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
    }

    deleteTask(filePath, projectIndex, taskIndex) {

        try {
            validateTaskIndex(taskIndex, projectIndex, this.projects)

            const updatedtasks = this.projects[projectIndex - 1].deleteTaskByIndex(taskIndex - 1)
            
            this.projects[projectIndex -1].tasks = updatedtasks
            
            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Task deleted successfully!${colors.reset}`)

        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
    }

    markTaskAsCompleted(filePath, projectIndex, taskIndex) {
        try {
            validateTaskIndex(taskIndex, projectIndex, this.projects)
            if (this.projects[projectIndex -1].tasks[taskIndex -1].completed) {
                throw new Error(`   Task at index ${taskIndex} is already completed.`)
            }
            this.projects[projectIndex - 1].setTaskAsCompletedByIndex(taskIndex)
            StorageService.save(filePath, this.projects)

            console.log("")
            console.log(`${colors.brightgreen}\u2713 Task ${taskIndex} has been marked as completed!${colors.reset}`)
        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
    }

    async clearTasksByProjectIndex(filePath, projectIndex) {

        try {
            validateProjectIndex(projectIndex, this.projects)

            if (this.projects[projectIndex -1].tasks.length === 0) {
                throw new Error(`   Project at index ${projectIndex} has no tasks.`)
            }
            let approval = await prompter.individualPrompt({
                message: "Are you sure you wnat to clear all the tasks for this project? (Y/n): ",
                type: 'string'
            })

            if (approval.trim() === 'y' || approval.trim() === 'Y' || approval.trim() === 'yes') {
                this.projects[projectIndex - 1].clearAllTasks()
                StorageService.save(filePath, this.projects)

                console.log("")
                console.log(`${colors.brightgreen}\u2713 Tasks for project ${projectIndex} have been cleared successfully!${colors.reset}`)
            }
            
        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
        
    }

    viewTaskByIndex(projectIndex, taskIndex) {
        try {
            validateTaskIndex(taskIndex, projectIndex, this.projects)

            this.projects[projectIndex - 1].viewTaskByIndex(taskIndex)
        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
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
            const hasNotes = p.notes.length > 0 ? `${colors.brightblue}\u270E${colors.reset}` : ``
            const indexPlusOne = index + 1
            const highImportance = p.highImportance ? `${colors.brightgreen + colors.bold}\u0021${colors.reset}` : ''
            const numberOfTasks = p.tasks.length > 0 ? `{${colors.brightyellow}${p.tasks.length}${colors.reset}}` : ``
            console.log(`[${colors.cyan}${indexPlusOne}${colors.reset}] - ${p.title} ${numberOfTasks} ${highImportance}${hasNotes}`)
            
        })
        console.log("")
        console.log("=".repeat(42) + '\n')
    }

    deleteProjectByIndex(filePath, projectIndex) {
        try {
            validateProjectIndex(projectIndex, this.projects)

            const filtered = this.projects.filter((_, i) => i !== projectIndex - 1)
            this.projects = filtered

            StorageService.save(filePath, this.projects)
            console.log(`\n${colors.green}\u2713 Project "${projectIndex}" deleted successfully!${colors.reset}`)
        
        } catch (error) {
            logger.error(error.stack)
            console.log(error.message)
        }

    }

    async clearAllProjects(filePath) {
        let approval = await prompter.individualPrompt({
            message: "Are you sure you want to clear all projects (Y/n): ",
            type: 'string'
        })

        if (approval.trim() === 'y' || approval.trim() === 'Y' || approval.trim() === 'yes') {
            try {
            this.projects = []
            StorageService.save(filePath, this.projects)

            console.log(`\n${colors.green}\u2713 AllProjects have been cleared successfully!${colors.reset}`)
            } catch (error) {
                console.log(error.message )
            }
        }
    }
    
    viewProjectByIndex(projectIndex) {

        try {
            validateProjectIndex(projectIndex, this.projects)

            const project = this.projects[projectIndex - 1]
            const importance = project.highImportance ? `${colors.brightgreen}High${colors.reset}` : `Low`
            const doneTasks = project.tasks.filter(t => t.completed).length
            const totalTasks = project.tasks.length
            const dueDate = project.dueDate ? new Date(project.dueDate).toLocaleDateString() : "No due date"
            const cratedAt = new Date(project.createdAt).toLocaleDateString()
            const notesCount = project.notes.length

            console.log("")
            console.log(`_______PROJECT_______`)
            console.log(`${colors.cyan}♢ ${project.title}${colors.reset}\n`)
            
            console.log(`${colors.cyan}⚐ Keyword:${colors.reset} ${project.keyword}`)
            console.log(`${colors.cyan}⚐ Posted:${colors.reset} ${cratedAt}`)
            console.log(`${colors.cyan}⚐ Due Date:${colors.reset} ${dueDate}`)
            console.log(`${colors.cyan}⚐ Importance:${colors.reset} ${importance}`)
            console.log(`${colors.cyan}⚐ Tasks: ${buildMiniBar(doneTasks, totalTasks, totalTasks)} ${colors.green}${doneTasks}${colors.reset}/${totalTasks}`)
            console.log(`${colors.cyan}⚐ Notes:${colors.reset} ${notesCount}`)
            if (project.tags.length > 0) { console.log(`${colors.cyan}⚐ Tags:${colors.reset} ${project.tags.join(", ")}`)}
            console.log(`${colors.cyan}⚐ Description:${colors.reset} ${project.description}\n`)

        } catch (error) {
            logger.error(error.stack)
            console.error(error.message )
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

    async createNoteToProject(filePath, projectIndex) {

        try {
            validateProjectIndex(projectIndex, this.projects)

            const project = this.projects[projectIndex - 1]

            const { title, text } = await prompter.addNotePrompt(project)

            project.addNote(title) 
            const newNote = project.notes[project.notes.length - 1]
            newNote.proKeyword = project.keyword

            createNoteFile(newNote, text)

            StorageService.save(filePath, this.projects)

            console.log(`   ${colors.green}\u2713 A new note has been added successfully!${colors.reset}`)
        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
    }

    async appendToNoteByProject(projectIndex, noteIndex) {

        try {
            validateNoteIndex(noteIndex, projectIndex, this.projects)

            const project = this.projects[projectIndex - 1]
            const note = project.notes[noteIndex - 1]

            console.log("")
            console.log(`   ${colors.cyan}♦ Appending note to:${colors.reset} ${colors.underline + colors.bold}${note.title}${colors.reset}`)
            console.log("   │")

            let text = await prompter.individualPrompt({message:`  ${colors.cyan} ♦ Entry text: ${colors.reset}`, type: 'string'})
            console.log("   │")
            while (!text || typeof text !== 'string') {
                console.log(`   ${colors.red}♦${colors.reset}A text entry is required`)
                console.log("   │")
                text = await prompter.individualPrompt({message:`  ${colors.cyan} ♦ Entry text: ${colors.reset}`, type: 'string'})
                console.log("   │")
            }


            appendToNoteFile(note.id, text)

            console.log(`   ${colors.green}\u2713 New note has been appended successfully!${colors.reset}`)

        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
        
    }

    listNotesByProject(projectIndex) {
        try{
            validateProjectIndex(projectIndex, this.projects)

            const proName = `${projectIndex} - ${this.projects[projectIndex - 1].title}`
            displayBanner("NOTES FOR:", proName)

            if (this.projects[projectIndex - 1].notes.length === 0) {
                console.log(`This project has no notes.`)
                console.log("")
                console.log("=".repeat(42) + '\n')
                return
            }
            this.projects[projectIndex - 1].listNotes()
            console.log("")
            console.log("=".repeat(42) + '\n')
        } catch (error) {
            logger.error(error.stack)
            console.log(error.message)
        }
    }

    readNoteFromProject(projectIndex, noteIndex) {
        try {
            validateNoteIndex(noteIndex, projectIndex, this.projects)

            const project = this.projects[projectIndex - 1]
            const note = project.notes[noteIndex - 1]
            const content = readNoteFile(note.id)

            console.log(`\n${colors.cyan}---[ ${note.title} ]---${colors.reset}\n`)

            console.log(content)
        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
    }

    deleteNoteFromProject(filePath, projectIndex, noteIndex) {
        try {
            validateNoteIndex(noteIndex, projectIndex, this.projects)

            const noteId = this.projects[projectIndex - 1].notes[noteIndex - 1].id
            const filteredNotes = this.projects[projectIndex - 1].deleteNoteByIndex(noteIndex - 1)

            deleteNoteFile(noteId)

            this.projects[projectIndex - 1].notes = filteredNotes

            StorageService.save(filePath, this.projects)

            console.log(`   ${colors.green}\u2713 Note has been deleted successfully!${colors.reset}`)
        } catch(error) {
            logger.error(error.stack) 
            console.error(error.message)
        }
    }

    async clearAllNotesFromProject(filePath, projectIndex) {
        try {
            validateProjectIndex(projectIndex, this.projects)

            let notes = this.projects[projectIndex - 1].notes

            if (notes.length === 0) {
                throw new Error(`No notes for this project`)
            }

            let approval = await prompter.individualPrompt({
                message: "Are you sure you want to clear all notes for this project? (Y/n): ",
                type: 'string'
            })

            if (approval.trim() === 'y' || approval.trim() === 'Y' || approval.trim() === 'yes' || approval.trim() === 'YES') {
                notes.forEach(note => {
                    deleteNoteFile(note.id)
                })

                this.projects[projectIndex - 1].notes = []

                StorageService.save(filePath, this.projects)
                console.log(`   ${colors.green}\u2713 All notes have been deleted successfully!${colors.reset}`)
            } else {
                return
            }

        } catch (error) {
            logger.error(error.stack)
            console.error(error.message)
        }
    }

    filterAllNotes() {
        const notes = filterNotes(this.projects)

        displayBannerThin('ALL YOUR NOTES:', '')
        console.log(`PRO_KEY`.padEnd(11) + `NOTE_ID`.padEnd(12) + `TITLE`)
        divider(50)

        if (notes.length === 0) {
            console.log('\n     No notes found')
        }

        for (const note of notes) {
            console.log(`${note.proKeyword}`.padEnd(11) + `${note.id.slice(0, 8)}`.padEnd(12) + `${colors.cyan}${note.title}${colors.reset}`)
        }

        console.log('')
        divider(50)
    }
}
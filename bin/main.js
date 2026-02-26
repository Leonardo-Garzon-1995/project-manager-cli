#!/usr/bin/env node

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { displayHelp} from '../src/utils.js'
import { displayDeafultHeader } from '../src/defaultUI.js'

import ProjectsManager from '../src/projects/projects-manager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FILE = path.join(__dirname, '../data/projects.json')

const [, , command, ...args] = process.argv

const manager = new ProjectsManager(FILE)

function main(cmd) {    
    if (!cmd) {
        displayDeafultHeader()
        manager.displayDailyTasks()
        console.log("")
        console.log("=".repeat(42) + '\n')
        return
    }
        
    switch(cmd) {
        case "add-project":
        case "-ap":
            manager.addProject(FILE)
            break;
        case "list-projects":
        case "-lp":
            manager.listProjects()
            break;
        case "delete-project":
        case "-dp":
            manager.deleteProjectByIndex(FILE, args[0])
            break;
        case "view-project":
        case "-vp":
            manager.viewProjectByIndex(args[0])
            break;
        case "toggle-importance":
        case "-ti":
            manager.toggleProjectImportance(FILE,args[0])
            break;
        case "clear-projects":
            manager.clearAllProjects(FILE)
            break;
        case "add-task":
        case "-at":
            manager.addTaskToProjectByIndex(FILE, args[0])
            break;
        case "list-tasks":
        case "-lt":
            manager.listTasksByProjectIndex(args[0])
            break;
        case "list-completed-tasks":
        case "-lct":
            manager.listCompletedTasksByIndex(args[0])
            break;
        case "list-pending-tasks":
        case "-lpt":
            manager.listPendingTasksByIndex(args[0])
            break;
        case "task-completed":
        case "-tc":
            manager.markTaskAsCompleted(FILE, args[0], args[1])
            break;
        case "clear-tasks":
            manager.clearTasksByProjectIndex(FILE, args[0])
            break;
        case "view-task":
        case "-vt":
            manager.viewTaskByIndex(args[0], args[1])
            break;
        case "delete-task":
        case "-dt":
            manager.deleteTask(FILE, args[0], args[1])
            break;
        case "help":
        case "-h":
            displayHelp()
            break;
        default:
            console.log(`   Invalid command: <${cmd}>\n`)
            displayHelp()
            break;
    }
}

main(command)

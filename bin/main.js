#!/usr/bin/env node

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { displayHelp, colors } from '../src/utils.js'

import ProjectsManager from '../src/projects/projects-manager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FILE = path.join(__dirname, '../data/projects.json')

const [, , command, ...args] = process.argv

const manager = new ProjectsManager(FILE)

function main() {
    switch(command) {
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
        case "clear-projects":
        case "-cp":
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
        case "mark-task":
        case "-mt":
            manager.markTaskAsCompleted(FILE, args[0], args[1])
            break;
        case "clear-tasks":
        case "-ct":
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
        default:
            console.log(`${colors.red}Unknown command${colors.reset} <${command}>\n`)
            displayHelp()
            break;
    }
}

main()

#!/usr/bin/env node

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import ProjectsManager from '../src/projects/projects-manager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FILE = path.join(__dirname, '../data/projects.json')

const [, , command, ...args] = process.argv
console.log(process.argv)

const manager = new ProjectsManager(FILE)

switch(command) {
    case "add-project":
        manager.addProject(FILE)
        break;
    case "ls-projects":
        manager.listProjects()
        break;
    case "add-task":
        manager.addTaskToProjectByIndex(FILE, args[0])
        break;
    case "ls-tasks":
        manager.listTasksByProjectIndex(args[0])
        break;
    case "view-project":
        manager.viewProjectByIndex(args[0])
        break;
    case "view-task":
        manager.viewTaskByIndex(args[0], args[1])
        break;
    default:
        console.log("Not a valid argument")
        break;
}

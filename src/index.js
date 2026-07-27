// Import all the dispatch logic to this file

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import displayHelp  from './helpers/displayHelp.js'
import { displayDeafultHeader } from './helpers/defaultUI.js'
import projectCommand from './commands/projectCommand.js'
import taskCommand from './commands/taskCommand.js'
import NoteCommand from './commands/noteCommand.js'
import { colors } from './helpers/format.js'

import * as logger from './helpers/logger.js'

import ProjectsManager from './projects/projects-manager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FILE = path.join(__dirname, '..','data', 'projects.json')


const manager = new ProjectsManager(FILE)

export default function dispatch(cmd, args) {
    try {
        if (!cmd) {
            displayDeafultHeader()
            manager.displayDailyTasks()
            return
        }
        
        switch(cmd) {
            case 'automatedTaskReminder':
                manager.taskAutomatedReminder()
                break
            case 'noteAutomatedReminder':
                manager.noteAutomatedReminder(args[0], args[1])
                break
            case 'project':
            case 'pro':
                projectCommand(args, manager, FILE)
                break;
            case 'task':
                taskCommand(args, manager, FILE)
                break
            case 'note':
                NoteCommand(args, manager, FILE)
                break;
            case "help":
            case "-h":
                displayHelp()
                break;
            default:
                console.error(`   ${colors.red}Invalid command: <${cmd}>${colors.reset}\n`)
                displayHelp()
                break;
        }
    } catch (error) {
        logger.error(error.stack)
        console.error(error.message)
    } 
}
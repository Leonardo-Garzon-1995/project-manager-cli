#!/usr/bin/env node

import path from 'node:path'
import { fileURLToPath } from 'node:url'
import displayHelp  from '../src/helpers/displayHelp.js'
import { displayDeafultHeader } from '../src/helpers/defaultUI.js'
import projectCommand from '../src/commands/projectCommand.js'
import taskCommand from '../src/commands/taskCommand.js'
import NoteCommand from '../src/commands/noteCommand.js'
import { colors } from '../src/helpers/format.js'

import * as logger from '../src/helpers/logger.js'

import ProjectsManager from '../src/projects/projects-manager.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const FILE = path.join(__dirname, '..', 'data', 'projects.json')

const [, , command, ...args] = process.argv

const manager = new ProjectsManager(FILE)

function main(cmd) {
    try {
        if (!cmd) {
            displayDeafultHeader()
            manager.displayDailyTasks()
            return
        }
        
        switch(cmd) {
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

main(command)

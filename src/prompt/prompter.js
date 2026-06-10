import Prompt from "./promptSys.js";
import { colors } from '../helpers/format.js'
import { isValidDate } from '../helpers/dates.js'

async function addProjectPrompt() {
    try {
        console.log('')
        console.log(`   ${colors.cyan + colors.bold}♦ Adding a new project${colors.reset}`)
        console.log("   │")

        let title = await Prompt.ask(`   ${colors.cyan}♦ Enter project title: ${colors.reset}`)
        console.log("   │")
        while (!title || typeof title !== 'string') {
            console.log(`   ${colors.red}♦${colors.reset} A title is required`)
            title = await Prompt.ask(`   ${colors.cyan}♦ Enter project title: ${colors.reset}`)
            console.log("   │")
        }

        let description = await Prompt.ask(`   ${colors.cyan}♦ Enter project description: ${colors.reset}`)
        console.log("   │")
        while (!description || typeof description !== 'string') {
            console.log(`   ${colors.red}♦${colors.reset} A description is required`)
            description = await Prompt.ask(`   ${colors.cyan}♦ Enter project description: ${colors.reset}`)
            console.log("   │")
        }

        let keyword = (await Prompt.ask(`   ${colors.cyan}♦ Give the project a keyword: ${colors.reset}`)).trim()
        if (keyword.length > 7) keyword = keyword.substring(0, 7)
        console.log("   │")

        return {title, description, keyword}
    } catch(error) {
        throw new Error(error)
    }
}

async function addTaskPrompt(project) {
    try {
        console.log("")
        console.log(`   ${colors.brightyellow}♦ ${colors.cyan}Adding task to: ${project.title}${colors.reset}`)
        console.log("   │")
        let title = await Prompt.ask(`   ${colors.brightyellow}♦ Enter task title: ${colors.reset}`)
        while (!title || typeof title !== 'string') {
            console.log(`   ${colors.red}♦${colors.reset} A title is required`)
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

        return { title, dueDate }
    } catch (error) {
        throw new Error(error)
    }
}

async function addNotePrompt(project) {
    try {
        console.log('')
        console.log(`   ${colors.cyan}♦ Adding note to:${colors.reset} ${colors.underline + colors.bold}${project.title}${colors.reset}`)
        console.log("   │")
        let title = await Prompt.ask(`   ${colors.cyan}♦ Enter note title: ${colors.reset}`)
        console.log("   │")
        while (!title || typeof title !== 'string') {
            console.log(`   ${colors.red}♦${colors.reset} A tile is required`)
            console.log("   │")
            title = await Prompt.ask(`   ${colors.cyan}♦ Enter note title: ${colors.reset}`)
            console.log("   │")
        }
        let text = await Prompt.ask(`   ${colors.cyan}♦ Note entry: ${colors.reset}`)
        console.log("   │")
        while (!text || typeof text !== 'string') {
            console.log(`   ${colors.red}♦${colors.reset}A text entry is required`)
            console.log("   │")
            text = await Prompt.ask(`   ${colors.cyan}♦ Note entry: ${colors.reset}`)
            console.log("   │")
        }

        return { title, text }
    } catch (error) {
        throw new Error(error)
    }
}

async function individualPrompt({message="", type="string"}) {

    const result = await Prompt.ask(message)

    if (type === 'number') {
        if (Number.isNaN(Number(result))) {
            console.error('The entry is not of type number')
            return 
        }

        return Number(result)
    } else if (type === 'string') {
        if (typeof result !== 'string') {
            console.error('The entry is not of type string')
            return
        }

        return result
    } else if (type === 'boolean') {
        if (typeof (result === 'true' || result === 'false') !== 'boolean') {
            console.error('The entry is not of type boolean')
            return
        }

        return JSON.parse(result)
    }

    return result
}

export {
    addProjectPrompt,
    addTaskPrompt,
    addNotePrompt,
    individualPrompt
}
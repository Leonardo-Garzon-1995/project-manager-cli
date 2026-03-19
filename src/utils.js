// FORMATTING
const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    brightred: "\x1b[91m",
    brightgreen: "\x1b[92m",
    brightyellow: "\x1b[93m",
    brightblue: "\x1b[94m",
    brightmagenta: "\x1b[95m",
    brightcyan: "\x1b[96m",
    brightgray: "\x1b[97m",
    reset: "\x1b[0m",
};

function displayBanner(title, text, color = colors.cyan) {
    console.log(color)
    console.log("╔" + "═".repeat(40) + "╗");
    console.log("║ " + colors.reset + title.padEnd(39) + color + "║");
    console.log("║ " + colors.reset + text.padEnd(39) + color + "║");
    console.log("╚" + "═".repeat(40) + "╝" + colors.reset);
    console.log("")

}

function displayBannerThin(text, secondText, color = colors.cyan) {
    console.log(color)
    console.log("╭" + "─".repeat(40) + "╮");
    console.log("│ " + colors.reset + text.padEnd(39) + color + "│");
    console.log("│ " + colors.reset + secondText.padEnd(39) + color + "│");
    console.log("╰" + "─".repeat(40) + "┘" + colors.reset);
    console.log("")
}

/** 
 * 
 * @param {number} value - value for the filled portion of the bar 
 * @param {number} max - max value accepted 
 * @param {number} width - width of the bar 
 * @param {object} options
 *  */ 
function buildMiniBar(value, max, width=16, options={}) {
    const {
        fillColor='\x1b[32m',
        emptyColor='\x1b[0m',
        fillChar='\u25AA',
        emptyChar='\u25AB'
    } = options

    if (value === 0) {
        return emptyColor + emptyChar.repeat(width)
    }
    const filled = Math.round((value / max) * width)
    const empty = width - filled

    return `${fillColor}${fillChar}`.repeat(Math.max(filled, 1)) + `${emptyColor}${emptyChar}`.repeat(Math.max(empty, 0))
}

// HELP DISPLAY
function displayHelp() {
    console.log(`   ${colors.green}USAGE:${colors.reset}`)
    console.log(`       ${colors.brightyellow}pro${colors.reset} <command> [options]\n`);
    console.log(`   ${colors.green}COMMANDS:${colors.reset}`);
    console.log(`       ${colors.gray}Project Commands:`)
    console.log(`       ${colors.cyan}add-project, -ap${colors.reset}`.padEnd(65, " ") + `Add a project`);
    console.log(`       ${colors.cyan}list-projects, -lp${colors.reset}`.padEnd(65, " ") + `List projects`);
    console.log(`       ${colors.cyan}view-project, -vp${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `View a project by index`);
    console.log(`       ${colors.cyan}toggle-importance, -ti${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `Toggle importance of projects by index`);
    console.log(`       ${colors.cyan}delete-project, -dp${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `Delete a project by index`);
    console.log(`       ${colors.cyan}clear-projects${colors.reset}`.padEnd(65, " ") + `Clear all projects`);
    console.log("")
    console.log(`       ${colors.gray}Task Commands:`)
    console.log(`       ${colors.cyan}add-task, -at${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `Add a task to a project by index`);
    console.log(`       ${colors.cyan}list-tasks, -lt${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `List tasks in a project by index`);    
    console.log(`       ${colors.cyan}view-task, -vt${colors.gray} <project-index> <task-index>${colors.reset}`.padEnd(70, " ") + `View a task by index`);
    console.log(`       ${colors.cyan}task-completed, -tc${colors.gray} <project-index> <task-index>${colors.reset}`.padEnd(70, " ") + `Mark a task as completed by index`);
    console.log(`       ${colors.cyan}list-completed-tasks, -lct${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `List completed tasks by project index`);
    console.log(`       ${colors.cyan}list-pending-tasks, -lpt${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `List pending tasks by project index`);
    console.log(`       ${colors.cyan}delete-task, -dt${colors.gray} <project-index> <task-index>${colors.reset}`.padEnd(70, " ") + `Delete a task by index`);
    console.log(`       ${colors.cyan}clear-tasks${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `Clear all tasks by project index`);
    console.log('')
    console.log(`       ${colors.cyan}help, -h${colors.reset}`.padEnd(65, " ") + `Display this help message`);
    console.log("")
}

// OTHER UTILITIES
function filterTasksByDate(input) {
    const projectsWithTasks = input.filter(p => p.tasks.length > 0)
    const dailyTasks = []

    for (let i = 0; i < projectsWithTasks.length; i++) {
        if (projectsWithTasks[i].tasks.length > 0) {
            for (let j = 0; j < projectsWithTasks[i].tasks.length; j++) {
                if (projectsWithTasks[i].tasks[j].dueDate === new Date().toLocaleDateString()) {
                    dailyTasks.push(projectsWithTasks[i].tasks[j])
                }
            }
        }
    }

    return dailyTasks
}

export {
    colors,
    displayHelp,
    displayBanner,
    displayBannerThin,
    filterTasksByDate,
    buildMiniBar
}
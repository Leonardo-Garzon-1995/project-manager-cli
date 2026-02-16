
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


// Formatting
function displayBanner(title, text) {
    console.log(colors.cyan)
    console.log("╔" + "═".repeat(40) + "╗");
    console.log("║ " + colors.reset + title.padEnd(39) + colors.cyan + "║");
    console.log("║ " + colors.reset + text.padEnd(39) + colors.cyan + "║");
    console.log("╚" + "═".repeat(40) + "╝" + colors.reset);
    console.log("")

}
// Help messages
function displayHelp() {
    console.log(`   ${colors.green}USAGE:${colors.reset}`)
    console.log(`       ${colors.brightyellow}pro${colors.reset} <command> [options]\n`);
    console.log(`   ${colors.green}COMMANDS:${colors.reset}`);
    console.log(`       ${colors.cyan}add-project, -ap${colors.reset}`.padEnd(65, " ") + `Add a project`);
    console.log(`       ${colors.cyan}list-projects, -lp${colors.reset}`.padEnd(65, " ") + `List projects`);
    console.log(`       ${colors.cyan}add-task, -at${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `Add a task to a project by index`);
    console.log(`       ${colors.cyan}list-tasks, -lt${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `List tasks in a project by index`);    
    console.log(`       ${colors.cyan}view-project, -vp${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `View a project by index`);
    console.log(`       ${colors.cyan}view-task, -vt${colors.gray} <project-index> <task-index>${colors.reset}`.padEnd(70, " ") + `View a task by index`);
    console.log(`       ${colors.cyan}clear-projects${colors.reset}`.padEnd(65, " ") + `Clear all projects`);
    console.log(`       ${colors.cyan}delete-task, -dt${colors.gray} <project-index> <task-index>${colors.reset}`.padEnd(70, " ") + `Delete a task by index`);
    console.log(`       ${colors.cyan}delete-project, -dp${colors.gray} <project-index>${colors.reset}`.padEnd(70, " ") + `Delete a project by index`);
    console.log(`       ${colors.cyan}task-completed, -tc${colors.gray} <project-index> <task-index>${colors.reset}`.padEnd(70, " ") + `Mark a task as completed by index`);
    console.log('')
    console.log(`       ${colors.cyan}help, -h${colors.reset}`.padEnd(65, " ") + `Display this help message`);
    console.log("")

}

export {
    colors,
    displayHelp,
    displayBanner
}
import { colors } from "./format.js"


export default function displayHelp() {
    console.log(`   ${colors.green}USAGE:${colors.reset}`)
    console.log(`       ${colors.brightyellow}pro${colors.reset} <command> [options]\n`);
    console.log(`   ${colors.green}COMMANDS:${colors.reset}`);
    console.log(`       ${colors.gray}Project Commands:`)
    console.log(`       ${colors.cyan}add-project, -ap${colors.reset}`.padEnd(62, " ") + `Add a project`);
    console.log(`       ${colors.cyan}list-projects, -lp${colors.reset}`.padEnd(62, " ") + `List projects`);
    console.log(`       ${colors.cyan}view-project, -vp${colors.gray} <pro-index>${colors.reset}`.padEnd(67, " ") + `View a project by index`);
    console.log(`       ${colors.cyan}toggle-importance, -ti${colors.gray} <pro-index>${colors.reset}`.padEnd(67, " ") + `Toggle importance of projects by index`);
    console.log(`       ${colors.cyan}delete-project, -dp${colors.gray} <pro-index>${colors.reset}`.padEnd(67, " ") + `Delete a project by index`);
    console.log(`       ${colors.cyan}clear-projects${colors.reset}`.padEnd(62, " ") + `Clear all projects`);
    console.log("")
    console.log(`       ${colors.gray}Task Commands:`)
    console.log(`       ${colors.cyan}add-task, -at${colors.gray} <pro-index>${colors.reset}`.padEnd(67, " ") + `Add a task to a project by index`);
    console.log(`       ${colors.cyan}list-tasks, -lt${colors.gray} <pro-index>${colors.reset}`.padEnd(67, " ") + `List tasks in a project by index`);    
    console.log(`       ${colors.cyan}view-task, -vt${colors.gray} <pro-index> <task-index>${colors.reset}`.padEnd(67, " ") + `View a task by index`);
    console.log(`       ${colors.cyan}task-completed, -tc${colors.gray} <pro-index> <task-index>${colors.reset}`.padEnd(67, " ") + `Mark a task as completed by index`);
    console.log(`       ${colors.cyan}list-completed-tasks, -lct${colors.gray} <pro-index>${colors.reset}`.padEnd(67, " ") + `List completed tasks by project index`);
    console.log(`       ${colors.cyan}list-pending-tasks, -lpt${colors.gray} <pro-index>${colors.reset}`.padEnd(67, " ") + `List pending tasks by project index`);
    console.log(`       ${colors.cyan}tasks-bydate, -tbd${colors.gray} <YYYY-MM-DD>${colors.reset}`.padEnd(67, " ") + 'List tasks by specific date')
    console.log(`       ${colors.cyan}delete-task, -dt${colors.gray} <pro-index> <task-index>${colors.reset}`.padEnd(67, " ") + `Delete a task by index`);
    console.log(`       ${colors.cyan}clear-tasks${colors.gray} <pro-index>${colors.reset}`.padEnd(67, " ") + `Clear all tasks by project index`);
    console.log('')
    console.log(`       ${colors.cyan}help, -h${colors.reset}`.padEnd(62, " ") + `Display this help message`);
    console.log("")
}
import { colors } from "./format.js"


export default function displayHelp() {
    console.log(`   ${colors.green}USAGE:${colors.reset}`)
    console.log(`       ${colors.brightyellow}pro${colors.reset} <command> [options]\n`);
    console.log(`   ${colors.green}COMMANDS:${colors.reset}`);
    console.log(`       Project Commands:`)
    console.log(`       ${colors.brightyellow}project, pro ${colors.gray}[flags/options] ${colors.reset}`)
    console.log(`           ${colors.cyan}add, -a${colors.reset}`.padEnd(50, " ") + `Add a new project`);
    console.log(`           ${colors.cyan}list, -l${colors.reset}`.padEnd(50, " ") + `List all projects`);
    console.log(`           ${colors.cyan}view, -v ${colors.gray}<pro-index>${colors.reset}`.padEnd(55, " ") + `View a project by index`);
    console.log(`           ${colors.cyan}important, -i ${colors.gray}<pro-index>${colors.reset}`.padEnd(55, " ") + `Toggle importance of projects by index`);
    console.log(`           ${colors.cyan}delete, -d ${colors.gray}<pro-index>${colors.reset}`.padEnd(55, " ") + `Delete a project by index`);
    console.log(`           ${colors.cyan}clear${colors.reset}`.padEnd(50, " ") + `Clear all projects`);
    console.log("")
    console.log(`       Task Commands:`)
    console.log(`       ${colors.brightyellow}task ${colors.gray}[flags/options] ${colors.reset}`)
    console.log(`           ${colors.cyan}add, -a ${colors.gray}<pro-index>${colors.reset}`.padEnd(67, " ") + `Add a task to a project by index`);
    console.log(`           ${colors.cyan}list, -l ${colors.gray}[options] <pro-index>${colors.reset}`.padEnd(67, " ") + `List tasks in a project by index`);
    console.log(`               ${colors.cyan}complete, -c ${colors.gray}<pro-index>${colors.reset}`.padEnd(67, " ") + `List completed tasks by project index`);
    console.log(`               ${colors.cyan}pending, -p ${colors.gray}<pro-index>${colors.reset}`.padEnd(67, " ") + `List pending tasks by project index`);
    console.log(`               ${colors.cyan}date -D ${colors.gray}<YYYY-MM-DD>${colors.reset}`.padEnd(67, " ") + 'List tasks by specific date')    
    console.log(`           ${colors.cyan}view, -v ${colors.gray}<pro-index> <task-index>${colors.reset}`.padEnd(67, " ") + `View a task by index`);
    console.log(`           ${colors.cyan}complete, -c ${colors.gray}<pro-index> <task-index>${colors.reset}`.padEnd(67, " ") + `Mark a task as completed by index`);
    console.log(`           ${colors.cyan}delete, -d ${colors.gray}<pro-index> <task-index>${colors.reset}`.padEnd(67, " ") + `Delete a task by index`);
    console.log(`           ${colors.cyan}clear ${colors.gray}<pro-index>${colors.reset}`.padEnd(67, " ") + `Clear all tasks by project index`);
    console.log("")
    console.log(`       Note Commands:`)
    console.log(`       ${colors.brightyellow}note ${colors.gray}[flags/options] ${colors.reset}`)
    console.log(`           ${colors.cyan}add, -a ${colors.gray}<pro-index>${colors.reset}`.padEnd(67, " ") + `Add a note to a project by index`);
    console.log(`           ${colors.cyan}list, -l ${colors.gray}[options] <pro-index>${colors.reset}`.padEnd(67, " ") + `List notes in a project by index`);
    console.log(`           ${colors.cyan}append, -ap ${colors.gray}<pro-index> <note-index>${colors.reset}`.padEnd(67, " ") + `Append a new line to an existing note`);   
    console.log(`           ${colors.cyan}view, -v ${colors.gray}<pro-index> <note-index>${colors.reset}`.padEnd(67, " ") + `View a note by index`);
    console.log(`           ${colors.cyan}delete, -d ${colors.gray}<pro-index> <note-index>${colors.reset}`.padEnd(67, " ") + `Delete a note by index`);
    console.log(`           ${colors.cyan}file ${colors.gray}<pro-index> <file-path>${colors.reset}`.padEnd(67, " ") + `Copy an existing file as a new note`);
    console.log(`           ${colors.cyan}all${colors.reset}`.padEnd(62, " ") + `Show all notes in all projects`)
    console.log(`           ${colors.cyan}clear ${colors.gray}<pro-index>${colors.reset}`.padEnd(67, " ") + `Clear all notes by project index`);
    console.log("")
    console.log(`       ${colors.cyan}help, -h${colors.reset}`.padEnd(62, " ") + `Display this help message`);
    console.log("")
}
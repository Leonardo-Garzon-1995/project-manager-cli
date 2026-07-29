/**
 * @file general.js
 * @description Help definition for the CLI itself.
 */

export default {
    name: "pro",

    description: "Project management CLI for managing projects, tasks, notes, and reminders.",

    usage: "pro <command> [options]",

    commands: [
        {
            name: "project",
            alias: "pro",
            description: "Manage projects"
        },
        {
            name: "task",
            description: "Manage tasks"
        },
        {
            name: "note",
            description: "Manage notes"
        },
        {
            name: "automatedTaskReminder",
            description: "Send today's task reminders by email"
        },
        {
            name: "noteAutomatedReminder",
            description: "Send a project note by email"
        },
        {
            name: "help",
            alias: "-h",
            description: "Display help information"
        }
    ],

    examples: [
        "pro project add",
        "pro task list 1",
        "pro note add 2",
        "pro help task",
        "pro task add --help"
    ]
};
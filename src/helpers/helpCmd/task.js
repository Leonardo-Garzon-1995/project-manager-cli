/**
 * @file task.js
 * @description Help definition for the task command.
 */

export default {
    name: "task",

    description: "Create, manage, and organize tasks within projects.",

    usage: "pro task <subcommand> [options]",

    examples: [
        "pro task add 1",
        "pro task list 2",
        "pro task complete 1 3",
        "pro task delete 1 2",
        "pro task all"
    ],

    subcommands: {
        add: {
            name: "add",
            aliases: ["-a"],

            description: "Add a new task to a project.",

            usage: "pro task add <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            examples: [
                "pro task add 1"
            ]
        },

        list: {
            name: "list",
            aliases: ["-l"],

            description: "List tasks within a project.",

            usage: "pro task list [option] <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            options: {
                complete: {
                    name: "complete",
                    aliases: ["-c"],
                    description: "Display only completed tasks."
                },

                pending: {
                    name: "pending",
                    aliases: ["-p"],
                    description: "Display only pending tasks."
                },

                date: {
                    name: "date",
                    aliases: ["-D"],
                    description: "Display tasks scheduled for a specific date.",

                    usage: "pro task list date <YYYY-MM-DD> <project-index>"
                }
            },

            examples: [
                "pro task list 1",
                "pro task list complete 1",
                "pro task list pending 1",
                "pro task list date 2026-08-15 1"
            ]
        },

        view: {
            name: "view",
            aliases: ["-v"],

            description: "Display a task.",

            usage: "pro task view <project-index> <task-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                },
                {
                    name: "task-index",
                    description: "Index of the task."
                }
            ],

            examples: [
                "pro task view 1 3"
            ]
        },

        complete: {
            name: "complete",
            aliases: ["-c"],

            description: "Mark a task as completed.",

            usage: "pro task complete <project-index> <task-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                },
                {
                    name: "task-index",
                    description: "Index of the task."
                }
            ],

            examples: [
                "pro task complete 2 5"
            ]
        },

        all: {
            name: "all",

            aliases: [],

            description: "Display every task from every project.",

            usage: "pro task all",

            arguments: [],

            examples: [
                "pro task all"
            ]
        },

        delete: {
            name: "delete",
            aliases: ["-d"],

            description: "Delete a task.",

            usage: "pro task delete <project-index> <task-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                },
                {
                    name: "task-index",
                    description: "Index of the task."
                }
            ],

            examples: [
                "pro task delete 1 4"
            ]
        },

        clear: {
            name: "clear",

            aliases: [],

            description: "Delete every task from a project.",

            usage: "pro task clear <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            examples: [
                "pro task clear 2"
            ]
        }
    }
};
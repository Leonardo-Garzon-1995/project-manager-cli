/**
 * @file project.js
 * @description Help definition for the project command.
 */

export default {
    name: "project",

    aliases: ["pro"],

    description: "Create, manage, and organize projects.",

    usage: "pro project <subcommand> [options]",

    examples: [
        "pro project add",
        "pro project list",
        "pro project view 1",
        "pro project update name 2",
        "pro project delete 3"
    ],

    subcommands: {
        add: {
            name: "add",
            aliases: ["-a"],

            description: "Create a new project.",

            usage: "pro project add",

            arguments: [],

            examples: [
                "pro project add"
            ]
        },

        list: {
            name: "list",
            aliases: ["-l"],

            description: "Display all existing projects.",

            usage: "pro project list",

            arguments: [],

            examples: [
                "pro project list"
            ]
        },

        view: {
            name: "view",
            aliases: ["-v"],

            description: "Display detailed information about a project.",

            usage: "pro project view <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project to display."
                }
            ],

            examples: [
                "pro project view 2"
            ]
        },

        important: {
            name: "important",
            aliases: ["-i"],

            description: "Toggle the importance status of a project.",

            usage: "pro project important <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            examples: [
                "pro project important 1"
            ]
        },

        update: {
            name: "update",
            aliases: ["-u"],

            description: "Update a property of an existing project.",

            usage: "pro project update <property> <project-index>",

            arguments: [
                {
                    name: "property",
                    description: "Property to modify."
                },
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            examples: [
                "pro project update name 1",
                "pro project update owner 2",
                "pro project update deadline 3"
            ]
        },

        delete: {
            name: "delete",
            aliases: ["-d"],

            description: "Delete a project.",

            usage: "pro project delete <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            examples: [
                "pro project delete 4"
            ]
        },

        clear: {
            name: "clear",

            aliases: [],

            description: "Delete every project.",

            usage: "pro project clear",

            arguments: [],

            examples: [
                "pro project clear"
            ]
        }
    }
};
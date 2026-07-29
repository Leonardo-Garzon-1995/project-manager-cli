/**
 * @file note.js
 * @description Help definition for the note command.
 */

export default {
    name: "note",

    description: "Create, manage, and organize notes within projects.",

    usage: "pro note <subcommand> [options]",

    examples: [
        "pro note add 1",
        "pro note list 1",
        "pro note view 1 2",
        "pro note edit 1 2",
        "pro note file 1 ./meeting-notes.md",
        "pro note all"
    ],

    subcommands: {
        add: {
            name: "add",
            aliases: ["-a"],

            description: "Create a new note for a project.",

            usage: "pro note add <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            examples: [
                "pro note add 1"
            ]
        },

        list: {
            name: "list",
            aliases: ["-l"],

            description: "Display all notes belonging to a project.",

            usage: "pro note list <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            examples: [
                "pro note list 1"
            ]
        },

        append: {
            name: "append",
            aliases: ["-ap"],

            description: "Append a new line to an existing note.",

            usage: "pro note append <project-index> <note-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                },
                {
                    name: "note-index",
                    description: "Index of the note."
                }
            ],

            examples: [
                "pro note append 1 2"
            ]
        },

        view: {
            name: "view",
            aliases: ["-v"],

            description: "Display the contents of a note.",

            usage: "pro note view <project-index> <note-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                },
                {
                    name: "note-index",
                    description: "Index of the note."
                }
            ],

            examples: [
                "pro note view 2 1"
            ]
        },

        edit: {
            name: "edit",
            aliases: ["-e"],

            description: "Open a note in the terminal editor.",

            usage: "pro note edit <project-index> <note-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                },
                {
                    name: "note-index",
                    description: "Index of the note."
                }
            ],

            examples: [
                "pro note edit 1 3"
            ]
        },

        file: {
            name: "file",

            aliases: [],

            description: "Import an existing file as a new note.",

            usage: "pro note file <project-index> <file-path>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                },
                {
                    name: "file-path",
                    description: "Path to the file to import."
                }
            ],

            examples: [
                "pro note file 1 ./README.md",
                "pro note file 2 C:\\notes\\meeting.txt"
            ]
        },

        all: {
            name: "all",

            aliases: [],

            description: "Display every note from every project.",

            usage: "pro note all",

            arguments: [],

            examples: [
                "pro note all"
            ]
        },

        delete: {
            name: "delete",
            aliases: ["-d"],

            description: "Delete a note.",

            usage: "pro note delete <project-index> <note-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                },
                {
                    name: "note-index",
                    description: "Index of the note."
                }
            ],

            examples: [
                "pro note delete 1 2"
            ]
        },

        clear: {
            name: "clear",

            aliases: [],

            description: "Delete every note belonging to a project.",

            usage: "pro note clear <project-index>",

            arguments: [
                {
                    name: "project-index",
                    description: "Index of the project."
                }
            ],

            examples: [
                "pro note clear 3"
            ]
        }
    }
};
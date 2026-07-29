# Project Manager CLI

A terminal-first project and task management tool built with Node.js. It helps you organize projects, track tasks, manage notes, and work from the command line with a lightweight local data store.

---

## Overview

Project Manager CLI is a personal productivity workspace for the terminal. It lets you:

- create and manage projects with titles, descriptions, keywords, due dates, tags, and importance flags
- add and track tasks with completion states and due dates
- attach notes to projects, append content to existing notes, or import notes from files
- view today’s tasks or filter tasks by date
- use a built-in terminal editor for note editing
- optionally send reminders via email using Resend

The app stores data locally in JSON and filesystem-based note files, so it works well as a simple offline CLI planner.

---

## Features

- Project lifecycle management: add, list, view, update, delete, and clear
- Task management: add, list, complete, view, delete, clear, and global task views
- Note management: create, list, append, edit, delete, import from files, and clear
- Daily task overview and date-based task filtering
- Interactive prompts for creating projects, tasks, and notes
- Terminal-based note editor for editing content directly in the CLI
- Environment-based reminder configuration for email notifications

---

## Requirements

- Node.js 18+ recommended
- npm

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Leonardo-Garzon-1995/project-manager-cli.git
cd project-manager-cli
```

2. Install dependencies:

```bash
npm install
```

3. Link the CLI globally so the `pro` command is available anywhere:

```bash
npm link
```

---

## Usage

Run the CLI with:

```bash
pro <command> [options]
```

### Common examples

```bash
pro                                # show today’s tasks
pro project add                    # create a new project interactively
pro project list                   # list all projects
pro project view 2                 # view project #2
pro task add 1                     # add a task to project #1
pro task list 1                    # list tasks for project #1
pro task complete 1 2              # mark task #2 in project #1 as complete
pro note add 1                     # create a note for project #1
pro note list 1                    # list notes for project #1
pro note edit 1 1                  # open editor mode for note #1 in project #1
pro help                           # display the help menu
```

### Project commands

```bash
pro project add
pro project list
pro project view <pro-index>
pro project important <pro-index>
pro project delete <pro-index>
pro project update <property> <pro-index>
pro project clear
```

### Task commands

```bash
pro task add <pro-index>
pro task list <pro-index>
pro task list complete <pro-index>
pro task list pending <pro-index>
pro task list date <YYYY-MM-DD>
pro task view <pro-index> <task-index>
pro task complete <pro-index> <task-index>
pro task all
pro task delete <pro-index> <task-index>
pro task clear <pro-index>
```

### Note commands

```bash
pro note add <pro-index>
pro note list <pro-index>
pro note append <pro-index> <note-index>
pro note view <pro-index> <note-index>
pro note delete <pro-index> <note-index>
pro note file <pro-index> <file-path>
pro note edit <pro-index> <note-index>
pro note all
pro note clear <pro-index>
```

---

## Configuration and reminders

The application can optionally send reminders using Resend.

Create a configuration file in your home directory at:

```bash
~/.project-manager-cli/.env
```

Add the following values:

```env
RESEND_API_KEY=your_api_key
EMAIL=your_email_address
```

If these values are not set, the reminder features will simply remain unavailable.

---

## Project structure

```text
project-manager-cli/
├── bin/
│   └── main.js                     # CLI entry point
├── data/
│   ├── notes_data/                 # Stored note files
│   └── projects.json               # Local project data store
├── src/
│   ├── commands/                   # Command dispatchers for projects, tasks, and notes
│   ├── config/                     # Environment and config helpers
│   ├── editor_mode/                # Terminal editor implementation
│   ├── helpers/                    # Utility functions and formatting
│   ├── notes/                      # Note file handling
│   ├── projects/                   # Project and task domain logic
│   ├── prompt/                     # Prompt helpers
│   └── index.js                    # Main command dispatcher
├── package.json
└── README.md
```

---

## Author

Leonardo Garzon — [lgarzonlc@gmail.com](mailto:lgarzonlc@gmail.com)

---

## License

This project is licensed under the MIT License.
# Project Manager CLI

A command-line tool to manage and track your projects — right from the terminal.

---

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Author](#author)
- [License](#license)

---

## Overview

**Project Manager CLI**  is a lightweight Node.js command-line application that helps you keep track of your projects and ideas without ever leaving the terminal. It uses a simple local data storege system to store and manage your projects.

---

## Requirements

- [Node.js](https://nodejs.org/) v14 or higher

---

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Leonardo-Garzon-1995/project-manager-cli.git
   cd project-manager-cli
   ```

2. **Link the CLI globally** (so you can use the `pro` command anywhere):

   ```bash
   npm link
   ```

---

## Usage

Once installed, use the `pro` command to interact with the tool:

```bash
pro <command> [options]
```

### Examples

```bash
pro add-project      - prompts you to add a new project name, description, and keyword
pro list-projects    - lists all projects 
pro add-task         - prompts you to add a new task to a project
pro list-tasks       - lists all tasks in a project
```

> Run `pro help` to see the full list of available commands and options.

---

## Project Structure

```
project-manager-cli/
├── bin/
│   └── main.js                     # CLI entry point
├── src/                            # Core application logic
│   ├── projects/
│   │   ├── project.js              # Project class with all the methods for managing projects
│   │   ├── projects-manager.js     #  Main orchestrator class for managing projects and tasks
│   │   └── task.js                 # Task class with all the methods for managing tasks
│   ├── storage-service.js          # Manages saving and loiding the projects and tasks 
│   ├── utils.js                    # Utility functions
│   └── defaultUI.js                # Default UI functions
├── data/     
│   └── projects.json               # Local data storage
├── package.json
├── README.md
└── .gitignore

```

---

## Author

**Leonardo Garzon** — [lgarzonlc@gmail.com](mailto:lgarzonlc@gmail.com)

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
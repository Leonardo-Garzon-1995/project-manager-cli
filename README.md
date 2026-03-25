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

**Project Manager CLI**  is a lightweight Node.js command-line application that helps you keep track of your projects and ideas without ever leaving the terminal. It uses a simple local data store to store and manage your projects.

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
# Add a new project or idea
pro add "My awesome project idea"

# List all tracked projects
pro list

# Remove a project by ID
pro remove <id>
```

> **Note:** Run `pro help` to see the full list of available commands and options.

---

## Project Structure

```
project-manager-cli/
├── bin/
│   └── main.js        # CLI entry point
├── src/               # Core application logic
│   ├── projects/
│   │   ├── project.js
│   │   └── projects-manager.js

├── data/              # Local data storage
├── package.json
└── .gitignore
```

---

## Author

**Leonardo Garzon** — [lgarzonlc@gmail.com](mailto:lgarzonlc@gmail.com)

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
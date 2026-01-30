import Project from './project.js'

import {colors} from '../utils.js'
class ProjectsManager {
    constructor() {
        this.projects = []
    }

    addProject(title, description) {
        const project = new Project(title, description)
        this.projects.push(project)
    }

    listProjects() {
        this.projects.forEach((p, index) => {
            if (p.highImportance) {
                console.log(`[${colors.cyan}${index}${colors.reset}] - ${p.title} (${colors.brightgreen}\u2191${colors.reset})`)
            } else {
                console.log(`[${colors.cyan}${index}${colors.reset}] - ${p.title} (\u2193)`)
            }
        })
    }
}

const test = new ProjectsManager()
test.addProject("My first project", "This is my first project")
test.addProject("My second project", "This is my second project")
test.addProject("My third project", "This is my third project")
test.addProject("My fourth project", "This is my fourth project")
test.listProjects()

console.log(test)
import fs from "fs"

import Project from "./projects/project.js"
import Task from "./projects/task.js"


export default class StorageService {
    static save(filePath, data) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    }

    static load(filePath) {
        if (!fs.existsSync(filePath)) return []

        const raw = fs.readFileSync(filePath, 'utf-8')
        if (!raw) return []

        const data = JSON.parse(raw)
        return data.map(p => {
            const project = new Project(p.title, p.description)
            project.id = p.id
            project.keyword = p.keyword
            project.createdAt = p.createdAt
            project.dueDate = p.dueDate
            project.highImportance = p.highImportance
            project.tags = p.tags
            p.tasks.map(t => {
                const task = new Task(t.title)
                task.id = t.id
                task.proId = t.proId
                task.createdAt = t.createdAt
                task.dueDate = t.dueDate
                task.completed = t.completed
                project.tasks.push(task)
            })
            return project
        })
    }
}
import fs from "fs"
import Idea from "./ideas/idea.js"


export default class StorageService {
    static save(filePath, data) {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    }

    static load(filePath) {
        if (!fs.existsSync(filePath)) return []

        const raw = fs.readFileSync(filePath, 'utf-8')
        if (!raw) return []

        const data = JSON.parse(raw)
        return data.map(i => {
            const idea = new Idea(i.title, i.description)
            idea.id = i.id
            idea.createdAt = i.createdAt
            idea.tags = i.tags
            return idea
        })
    }
}
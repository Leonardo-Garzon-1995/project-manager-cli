
export default class Idea {
    constructor(title, description) {
        this.id = crypto.randomUUID()
        this.title = title;
        this.description = description
        this.createdAt = new Date().toLocaleDateString()
        this.tags = []
    }

    addTag(tag) {
        if (typeof tag !== 'string') return
        if (this.tags.includes(tag)) return
        this.tags.push(tag)
    }
}


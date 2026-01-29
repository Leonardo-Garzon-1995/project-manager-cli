import Idea from './idea.js'
import StorageService from '../storage-service.js'
import {colors} from '../utils.js'

const FILE = 'ideas.json' // Test file - remember to set up path in main.js
class IdeasManager {
    constructor() {
        this.ideas = StorageService.load(FILE)
    }

    add(title, description) {
        const newIdea = new Idea(title, description)

        this.ideas.push(newIdea)

        StorageService.save(FILE, this.ideas)
    }

    deleteByIndex(index) {
        if (isNaN(index)) {
            console.log('id must be a number')
            return
        }
        this.ideas.splice(index - 1, 1)
        StorageService.save(FILE, this.ideas)
    }

    addTagByIndex(index, tag) {
        if (isNaN(index)) {
            console.log('Idea index must be a number')
            return
        }
        this.ideas[index - 1].addTag(tag)
        StorageService.save(FILE, this.ideas)
    }

    list() {
        this.ideas.forEach((idea, index) => {
            console.log(`[${colors.brightgreen}${index + 1}${colors.reset}] - ${idea.title}${colors.reset}`)
        })
    }

}

let manager = new IdeasManager()


manager.list()

import crypto from 'crypto'

export default class Id {
    static generateTaskId() {
        return `tsk-${crypto.randomUUID()}`
    }

    static generateProId() {
        return `pro-${crypto.randomUUID()}`
    }

    static generateNoteId() {
        return `nte-${crypto.randomUUID()}`
    }
}

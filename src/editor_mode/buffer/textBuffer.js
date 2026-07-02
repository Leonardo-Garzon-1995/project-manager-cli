
export default class TextBuffer {
    constructor () {
        this.lines = ['']
    }

    getLine(y) {
        return this.lines[y]
    }

    insertChar(x, y, char) {
        const line = this.getLine(y)

        this.lines[y] = line.slice(0, x) + char + line.slice(x)
    }

    deleteChar(x, y) {
        const line = this.getLine(y)
        this.lines[y] = line.slice(0, x - 1) + line.slice(x)
    }

    insertNewLine(x, y) {
        const currentLine = this.getLine(y)

        const left = currentLine.slice(0, x)
        const right = currentLine.slice(x)

        this.lines[y] = left

        this.lines.splice(y + 1, 0, right)
    }
}

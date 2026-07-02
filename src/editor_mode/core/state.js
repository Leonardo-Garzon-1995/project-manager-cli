import TextBuffer from '../buffer/textBuffer.js'

export default class EditorState {
    constructor() {
        this.cursorX = 0
        this.cursorY = 0

        this.screenRows = process.stdout.rows
        this.screenCols = process.stdout.columns

        this.buffer = new TextBuffer()

        // File related state
        this.filename = null
        this.isDirty = false
        this.statusMessage = '' 

        this.rowOffset = 0
        this.colOffset = 0

        // History state
        this.history = []
        this.historyIndex = -1
    }
}
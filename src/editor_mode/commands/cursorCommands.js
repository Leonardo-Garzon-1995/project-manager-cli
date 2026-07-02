import { KEYS } from '../terminal/keyHandler.js'
function moveEditorCursor(key, state) {
    try {
        switch(key) {
            case KEYS.ARROW_UP:
                if (state.cursorY > 0) {
                    state.cursorY--

                    const line = state.buffer.getLine(state.cursorY) || ''

                    state.cursorX = Math.min(state.cursorX, line.length)
                }
                break
            case KEYS.ARROW_DOWN:
                if (state.cursorY < state.buffer.lines.length - 1) {
                    state.cursorY++

                    const line = state.buffer.getLine(state.cursorY) || ''
                
                    state.cursorX = Math.min(state.cursorX, line.length)
                }
                break
            case KEYS.ARROW_RIGHT:

            const line = state.buffer.getLine(state.cursorY) || ''
                if (state.cursorX < line.length) {
                    state.cursorX++
                }
                break
            case KEYS.ARROW_LEFT:
                if (state.cursorX > 0) {
                    state.cursorX--
                }
                break
        }
    } catch (error) {
        throw new Error(error)
    }
}

export {
    moveEditorCursor
}
import {
    moveTerminalCursor,
    clearLine,
    clearScreen,
    clearScreenDown,
    showCursor,
    hideCursor
} from '../terminal/ansi.js'

import * as logger from '../../helpers/logger.js'

function refreshScreen(state) {
    hideCursor()
    moveTerminalCursor(1, 1)
    drawRows(state)
    clearScreenDown()
    const screenX = state.cursorX - state.colOffset
    const screenY = state.cursorY - state.rowOffset
    moveTerminalCursor(screenX + 1, screenY + 1)
    showCursor()
}


function drawRows(state) {
    for (let row = 0; row < state.screenRows - 1; row++) {
        moveTerminalCursor(1, row + 1)

        clearLine()

        const fileRow = row + state.rowOffset
        const line = state.buffer.getLine(fileRow) || ''

        if (row < state.buffer.lines.length) {
            process.stdout.write(
                line.slice(state.colOffset, state.colOffset + state.screenCols)
            )
        } else {
            process.stdout.write('~')
        }
    }
}

export {
    drawRows,
    refreshScreen
}
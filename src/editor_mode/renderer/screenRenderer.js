import {
    moveTerminalCursor,
    clearLine,
    clearScreen,
    clearScreenDown,
    showCursor,
    hideCursor,
    colors
    
} from '../terminal/ansi.js'

import * as logger from '../../helpers/logger.js'

function refreshScreen(state, notetitle) {
    hideCursor()
    moveTerminalCursor(1, 1)
    drawRows(state)
    clearScreenDown()
    drawStatusBar(state, notetitle)
    
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

function drawStatusBar(state, noteTitle) {
    moveTerminalCursor(1, state.screenRows)

    clearLine()
    
    const name = colors.cyan + noteTitle + colors.reset || '[No name]'

    const modified = state.isDirty ? `${colors.yellow}(modified)${colors.reset}` : ''

    const status = `${name} ${modified}`

    process.stdout.write(status.padEnd(state.screenCols).slice(0, state.screenCols))
}

export {
    drawRows,
    refreshScreen
}
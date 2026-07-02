function insertCharacter(char, state) {
    state.buffer.insertChar(
        state.cursorX,
        state.cursorY,
        char
    )

    state.cursorX++
    state.isDirty = true
}

function deleteCharacter(state) {
    if (state.cursorX === 0 && state.cursorY === 0) {
        return
    }

    // Merge lines
    if (state.cursorX === 0) {
        const currentLine = state.buffer.getLine(state.cursorY)
        const previousLine = state.buffer.getLine(state.cursorY - 1)

        const previousLength = previousLine.length
        state.buffer.lines[state.cursorY - 1] = previousLine + currentLine

        state.buffer.lines.splice(state.cursorY, 1)

        state.cursorY--
        state.cursorX = previousLength

        state.isDirty = true

        return
    }

    // Normal delete
    state.buffer.deleteChar(state.cursorX, state.cursorY)
    state.cursorX--
    state.isDirty = true
}

function insertNewLine(state) {
    state.buffer.insertNewLine(state.cursorX, state.cursorY)

    state.cursorY++
    state.cursorX = 0
    state.isDirty = true
}

export {
    insertCharacter,
    deleteCharacter,
    insertNewLine
}
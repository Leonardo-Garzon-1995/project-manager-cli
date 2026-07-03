import * as logger from '../../helpers/logger.js'
import { enableRawMode, onKeyPress } from '../terminal/input.js'
import { clearScreen } from '../terminal/ansi.js'
import { insertCharacter, deleteCharacter, insertNewLine } from '../commands/editingCommands.js'
import { moveEditorCursor } from '../commands/cursorCommands.js'
import { refreshScreen } from '../renderer/screenRenderer.js'
import { openFile, saveFile } from '../commands/fileCommands.js'
import { KEYS } from '../terminal/keyHandler.js'
import EditorState from './state.js'

const state = new EditorState()

process.on('uncaughtException', (error) => {
    logger.error(error)
    
    process.stdin.setRawMode(false)
    process.stdin.pause()

    process.exit(1)
})

function quitEditor() {
    process.stdin.setRawMode(false)
    process.stdin.pause()

    clearScreen()

    logger.info('Exited Editor')

    process.exit(0)
}

function startEditor(file='', noteTitle='') {
    try {
        enableRawMode()
        logger.info('Initialize editor mode')
        
        const filename = file
        if (filename && filename !== '') {
            openFile(state, filename)
        }

        refreshScreen(state, noteTitle)

        onKeyPress(key => {
            if (key === KEYS.CTRL_C) {
                quitEditor()
            } else if (key === KEYS.BACKSPACE) {
                deleteCharacter(state)
            } else if (key === KEYS.ENTER) {
                insertNewLine(state)
            } else if (key === KEYS.CTRL_S) {
                saveFile(state)
            } else if (Object.values(KEYS).includes(key)) {
                moveEditorCursor(key, state)
            } else if (key.length === 1 && key >= ' ' ){
                insertCharacter(key, state)
            }

            refreshScreen(state, noteTitle)
        })

    } catch (error) {
        logger.error(error)
        quitEditor()
    }
}

export {
    startEditor
}
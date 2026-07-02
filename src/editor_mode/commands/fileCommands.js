import fs from 'fs'

function openFile(state, filename) {
    try {
        if (!fs.existsSync(filename)) {
            throw new Error('File does not exist')
        }

        const content = fs.readFileSync(filename, 'utf8')
        const normalize = content.replace(/^\uFEFF/, '').replace(/\r?\n/g, '\n')

        state.buffer.lines = normalize.split('\n')
        state.filename = filename
        state.isDirty = false


    } catch (error) {
        throw new Error(error)
    }
}

function saveFile(state) {
    if (!state.filename) {
        return
    }

    const content = state.buffer.lines.join('\n')

    fs.writeFileSync(state.filename, content, 'utf8')

    state.isDirty = false
    state.statusMessage = 'File Saved'
}

export {
    openFile,
    saveFile
}
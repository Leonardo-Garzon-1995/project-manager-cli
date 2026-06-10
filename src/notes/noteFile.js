import fs from 'fs'
import path from 'path'
import Note from './noteObject.js'
import { fileURLToPath } from 'node:url'
import { dir } from 'node:console'

const __filename  = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const NOTES_DATA_DIR = path.join(__dirname, '..', '..', 'data', 'notes_data')

function ensureDir() {
    if (!fs.existsSync(NOTES_DATA_DIR)) {
        fs.mkdirSync(NOTES_DATA_DIR, {recursive: true})
    }
}

function createNoteFile(noteObj, text) {
    ensureDir()

    const { dirName, filename } = noteObj.getPath()

    const dirPath = path.join(NOTES_DATA_DIR, dirName)
    const fullPath = path.join(dirPath, filename)

    fs.mkdirSync(dirPath, {recursive: true})

    fs.writeFileSync(fullPath, text + '\n') 

}

function readNoteFile(noteId) {
    const dirName = noteId.slice(0, 6)
    const filename = noteId.slice(6)

    const fullPath = path.join(NOTES_DATA_DIR, dirName, filename)

    if (!fs.existsSync(fullPath)) {
        console.error('Note does not exist')
        return
    }

    const content = fs.readFileSync(fullPath, 'utf-8')

    return content
}

function appendToNoteFile(noteId, text) {
    const dirName = noteId.slice(0, 6)
    const filename = noteId.slice(6)

    const fullPath = path.join(NOTES_DATA_DIR, dirName, filename)
    if (!fs.existsSync(fullPath)) {
        console.error('Note does not exist')
        return
    }

    fs.appendFileSync(fullPath, text + '\n')


}

function deleteNoteFile(noteId) {
    const dirName = noteId.slice(0, 6)
    const filename = noteId.slice(6)

    const fullPath = path.join(NOTES_DATA_DIR, dirName, filename)
    if (!fs.existsSync(fullPath)) {
        console.error('Note does not exist')
        return
    }
    const noteDir = path.dirname(fullPath)

    fs.rmSync(noteDir, {recursive: true, force: true})

}

function emptyNotesDir() {
    if (!fs.existsSync(NOTES_DATA_DIR)) {
        console.error('No notes to delete')
        return
    }

    for (const entry of fs.readdirSync(NOTES_DATA_DIR)) {
        const entryPath = path.join(NOTES_DATA_DIR, entry)

        fs.rmSync(entryPath, {recursive: true, force: true})
    }

}

export {
    createNoteFile,
    readNoteFile,
    deleteNoteFile,
    emptyNotesDir,
    appendToNoteFile
}


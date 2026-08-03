import fs from 'fs'
import path from 'path'
import Note from './noteObject.js'
import { validateNoteId } from '../helpers/validation.js'
import { fileURLToPath } from 'node:url'
import { NoteNotFoundError, ValidationError } from '../errors.js'

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

    const noteId = noteObj.getPath()

    const fullPath = getNotePath(noteId)

    fs.writeFileSync(fullPath, text + '\n') 
}

function readNoteFile(noteId) {

    const fullPath = getNotePath(noteId)

    if (!fs.existsSync(fullPath)) {
        throw new NoteNotFoundError(noteId)
    }

    const content = fs.readFileSync(fullPath, 'utf-8')

    return content
}

function getNotePath(noteId) {
    validateNoteId(noteId)

    return path.join(NOTES_DATA_DIR, noteId)
}

function appendToNoteFile(noteId, text) {

    const fullPath = getNotePath(noteId)
    if (!fs.existsSync(fullPath)) {
        throw new NoteNotFoundError(noteId)
    }

    fs.appendFileSync(fullPath, text + '\n')


}

function deleteNoteFile(noteId) {

    const fullPath = getNotePath(noteId)
    if (!fs.existsSync(fullPath)) {
        throw new NoteNotFoundError(noteId)
    }
    
    fs.unlinkSync(fullPath)

}

function emptyNotesDir() {
    if (!fs.existsSync(NOTES_DATA_DIR)) {
        return
    }

    fs.rmSync(NOTES_DATA_DIR, {recursive: true, force: true})
}

function createNoteFromFile(filePath, noteObject) {
    const sourcePath = path.join(process.cwd(), filePath)
    const noteId = noteObject.getPath()
    const noteFilePath = path.join(NOTES_DATA_DIR, noteId)
    fs.copyFileSync(sourcePath, noteFilePath )
}

function resolveNoteId(noteName) {

    if (!noteName || noteName.length < 8 || typeof noteName !== 'string') {
        throw new ValidationError('A note id is required and must be at least 8 characters long.')
    }

    if (!noteName.startsWith('nte-')) {
        throw new ValidationError(`The note id must start with 'nte-'. Received: ${noteName}`)
    }
    const files = fs.readdirSync(NOTES_DATA_DIR)
    
    const matches = files.filter(file => file.startsWith(noteName))

    if (matches.length === 0) {
        throw new NoteNotFoundError(noteName)
    }

    if (matches.length > 1) {
        let numeration = 1
        for (const match of matches) {
            console.log('Candidates:\n')
            console.log(`${numeration}. ${match}`)
            numeration++
        }

        return 
    }

    return matches[0]
}

export {
    createNoteFile,
    readNoteFile,
    getNotePath,
    deleteNoteFile,
    emptyNotesDir,
    appendToNoteFile,
    createNoteFromFile,
    resolveNoteId
}


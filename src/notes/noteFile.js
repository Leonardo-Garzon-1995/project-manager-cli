import fs from 'fs'
import path from 'path'
import Note from './noteObject.js'
import { validateNoteId } from '../helpers/validation.js'
import { fileURLToPath } from 'node:url'
import {NoteNotFoundError} from '../errors.js'

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

    const fullPath = path.join(NOTES_DATA_DIR, noteId)

    fs.writeFileSync(fullPath, text + '\n') 
}

function readNoteFile(noteId) {
    validateNoteId(noteId)

    const fullPath = path.join(NOTES_DATA_DIR, noteId)

    if (!fs.existsSync(fullPath)) {
        throw new NoteNotFoundError(noteId)
    }

    const content = fs.readFileSync(fullPath, 'utf-8')

    return content
}

function appendToNoteFile(noteId, text) {
    validateNoteId(noteId)

    const fullPath = path.join(NOTES_DATA_DIR, noteId)
    if (!fs.existsSync(fullPath)) {
        throw new NoteNotFoundError(noteId)
    }

    fs.appendFileSync(fullPath, text + '\n')


}

function deleteNoteFile(noteId) {
    validateNoteId(noteId)

    const fullPath = path.join(NOTES_DATA_DIR, noteId)
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

export {
    createNoteFile,
    readNoteFile,
    deleteNoteFile,
    emptyNotesDir,
    appendToNoteFile,
    createNoteFromFile
}


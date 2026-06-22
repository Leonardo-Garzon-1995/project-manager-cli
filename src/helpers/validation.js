import { InvalidIndexError, InvalidNoteIdError } from '../errors.js'
function validateProjectIndex(projectIndex, projects) {
    if (!projectIndex || Number.isNaN(parseInt(projectIndex))) {
        throw new InvalidIndexError('   The project index must be a number')
    }

    if (!projects || !projects[projectIndex - 1]) {
        throw new InvalidIndexError(`   Project at index ${projectIndex} does not exist.`)
    }
}

function validateTaskIndex(taskIndex, projectIndex, projects) {
    validateProjectIndex(projectIndex, projects)

    if (!taskIndex || Number.isNaN(parseInt(taskIndex))) {
        throw new InvalidIndexError(' The task index must be a number')
    }
    if (!projects[projectIndex - 1].tasks[taskIndex - 1]) {
        throw  new InvalidIndexError(`  Task at index ${taskIndex} does not exist.`)
    }
}

function validateNoteIndex(noteIndex, projectIndex, projects) {
    validateProjectIndex(projectIndex, projects)

    if (!noteIndex || Number.isNaN(parseInt(noteIndex))) {
        throw new InvalidIndexError('   The note index must be a number')
    }
    
    if (!projects[projectIndex -1].notes[noteIndex -1]) {
        throw new InvalidIndexError(`   Note at index ${noteIndex} does not exist.`)
    }
}
function isValidNoteId(noteId) {
    return noteId && noteId.startsWith('nte-') && noteId.length === 40
}

function validateNoteId(noteId) {
    if (!isValidNoteId(noteId)) {
        throw new InvalidNoteIdError(noteId)
    }
}

export {
    validateProjectIndex,
    validateTaskIndex,
    validateNoteIndex, 
    validateNoteId
}
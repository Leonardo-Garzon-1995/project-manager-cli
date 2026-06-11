
function validateProjectIndex(projectIndex, projects) {
    if (!projectIndex || Number.isNaN(parseInt(projectIndex))) {
        throw new Error('   The project index must be a number')
    }

    if (!projects || !projects[projectIndex - 1]) {
        throw new Error(`   Project at index ${projectIndex} does not exist.`)
    }
}

function validateTaskIndex(taskIndex, projectIndex, projects) {
    validateProjectIndex(projectIndex, projects)

    if (!taskIndex || Number.isNaN(parseInt(taskIndex))) {
        throw new Error(' The task index must be a number')
    }
    if (!projects[projectIndex - 1].tasks[taskIndex - 1]) {
        throw  new Error(`  Task at index ${taskIndex} does not exist.`)
    }
}

function validateNoteIndex(noteIndex, projectIndex, projects) {
    validateProjectIndex(projectIndex, projects)

    if (!noteIndex || Number.isNaN(parseInt(noteIndex))) {
        throw new Error('   The note index must be a number')
    }
    
    if (!projects[projectIndex -1].notes[noteIndex -1]) {
        throw new Error(`   Note at index ${noteIndex} does not exist.`)
    }
}
function isValidNoteId(noteId) {
    return noteId && noteId.startsWith('nte-') && noteId.length === 40
}

function validateNoteId(noteId) {
    if (!isValidNoteId(noteId)) {
        throw new Error('Invalid note id')
    }
}

export {
    validateProjectIndex,
    validateTaskIndex,
    validateNoteIndex, 
    validateNoteId
}
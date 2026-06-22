class AppError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)
    }
}


class NoteNotFoundError extends AppError {
    constructor(noteId) {
        super(`Note not found: '${noteId.slice(0, 8)}...'`)

        this.noteId = noteId
        this.code = 'NOTE_NOT_FOUND'
    }
}

class ValidationError extends AppError{
    constructor(message="Validation Error") {
        super(message)

        this.code = "VALIDATION_ERROR"
    }
}

class InvalidIndexError extends AppError {
    constructor(message="Index is invalid or is out of range") {
        super(message)

        this.code = "INVALID_INDEX"
    }
}

export {
    NoteNotFoundError,
    ValidationError,
    InvalidIndexError
}
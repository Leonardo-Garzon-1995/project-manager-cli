class AppError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name

        Error.captureStackTrace(this, this.constructor)
    }
}


class InvalidNoteIdError extends AppError {
    constructor(noteId) {
        super(`Invalid note id: '${noteId.slice(0, 8)}...'`)

        this.noteId = noteId
        this.code = 'INVALID_NOTE_ID'
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
    InvalidNoteIdError,
    ValidationError,
    InvalidIndexError
}
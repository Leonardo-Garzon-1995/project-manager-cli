class AppError extends Error {
    constructor(message) {
        super(message)

        this.name = this.constructor.name
        this.code = "UNKNOWN_ERROR"
        this.exitCode = 1

        Error.captureStackTrace(this, this.constructor)
    }
}

class InvalidNoteIdError extends AppError {
    constructor(noteId) {
        super(`Invalid or malformed note id: '${noteId.slice(0, 8)}...'`)

        this.noteId = noteId
        this.code = 'INVALID_NOTE_ID'
        this.exitCode = 1
    }
}

class CorruptedNoteError extends AppError {
    constructor(noteId) {
        super(`Corrupted note object or file. Note id: ${noteId}`)

        this.noteId = noteId
        this.code = 'CORRUPTED_NOTE'
        this.exitCode = 128
    }
}

class NoteNotFoundError extends AppError {
    constructor(noteId) {
        super(`Note not found: ${noteId.slice(0, 8)}...`)

        this.noteId = noteId
        this.code = 'NOTE_NOT_FOUND' 
        this.exitCode = 1
    }
}

class ValidationError extends AppError{
    constructor(message="Validation Error") {
        super(message)

        this.code = "VALIDATION_ERROR"
        this.exitCode = 1
    }
}

class InvalidIndexError extends AppError {
    constructor(message="Index is invalid or is out of range") {
        super(message)

        this.code = "INVALID_INDEX"
        this.exitCode = 1
    }
}

class NotificationError extends AppError {
    constructor(message) {
        super(message)

        this.code = 'NOTIFICATION_ERROR'
        this.code = 128
    }
}

export {
    InvalidNoteIdError,
    CorruptedNoteError,
    ValidationError,
    InvalidIndexError,
    NoteNotFoundError,

    NotificationError
}
import { formatNoteFile } from './msgFormatter.js'
import Notify from './notifier.js'
import * as logger from '../helpers/logger.js'

export default async function notifyNote(noteObj, notePath) {
    const formatted = formatNoteFile(noteObj, notePath)

    await Notify.directEmail(formatted.subject, formatted.body)
} 
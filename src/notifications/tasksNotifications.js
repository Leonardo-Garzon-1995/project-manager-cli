import notify from "./notifier.js";
import { formatTaskObject } from "./msgFormatter.js"

export default async function notifyTask(task, schedule='now') {
    const formatted = formatTaskObject(task)

    await notify(formatted.subject, formatted.body, schedule)
}
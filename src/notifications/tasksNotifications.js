import Notify from "./notifier.js";
import { formatTaskObject } from "./msgFormatter.js"

export default async function notifyTask(task) {
    const formatted = formatTaskObject(task)

    await Notify.directEmail(formatted.subject, formatted.body)
}
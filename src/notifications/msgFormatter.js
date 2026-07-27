import fs from 'fs'

function formatTaskObject(task) {
    const result = {
        subject: '',
        body: ''
    }

    result.subject = `[TASK] - Pending task for ${task.proKeyword}`

    result.body = '<h3>You have pending tasks</h3>\n'
    result.body += `<p><strong>Project</strong>: ${task.proKeyword}</p>\n`
    result.body += `<p><strong>Task</strong>: ${task.title}</p>\n`
    result.body += `<p><strong>Due Date</strong>: ${task.dueDate}</p>\n`

    result.body += 'Have a good day Leonardo!'

    return result
}

function formatNoteFile(noteObj, noteFile) {
    const result = {
        subject: '',
        body: ''
    }
    const file = fs.readFileSync(noteFile, 'utf8')
    result.subject = `[NOTE] - ${noteObj.title}`
    result.body = `<h3>You have pending work for this note</h3>\n`
    result.body += `<p><strong>Project:</strong> ${noteObj.proKeyword}</p>`
    result.body += `<p><strong>title:</strong> ${noteObj.title}</p>`
    result.body += `Have a terrific day Leonardo!\n`
    result.body += `<h3> NOTE FILE CONTENT:</h3>`
    result.body += file 

    return result
}

export {
    formatTaskObject,
    formatNoteFile
}
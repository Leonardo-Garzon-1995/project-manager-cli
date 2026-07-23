function formatTaskObject(task) {
    const result = {
        subject: '',
        body: ''
    }

    result.subject = `[TASK] - pending task`

    result.body = '<h3>You have pending tasks</h3>\n'
    result.body += `<p><strong>Project</strong>: ${task.proKeyword}</p>\n`
    result.body += `<p><strong>Title</strong>: ${task.title}</p>\n`
    result.body += `<p><strong>Due Date</strong>: ${task.dueDate}</p>\n`

    result.body += 'Have a good day Leonardo!'

    return result
}

export {
    formatTaskObject
}
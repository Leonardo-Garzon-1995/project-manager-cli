
function filterTasksByDate(projects, date) {
    const projectsWithTasks = projects.filter(p => p.tasks.length > 0)
    const tasks = []

    let parsedDate 

    if (date === 'today') {
        parsedDate = new Date().toLocaleDateString()

    } else {
        parsedDate = new Date(date).toLocaleDateString()
    }

    for (let i = 0; i < projectsWithTasks.length; i++) {
        for (let j = 0; j < projectsWithTasks[i].tasks.length; j++) {
            tasks.push(projectsWithTasks[i].tasks[j])
        }
    }

    const filterdbyDate = tasks.filter(t => t.dueDate === parsedDate)

    return filterdbyDate.length > 0 ? filterdbyDate : []
}

function filterNotes(projects, callback) {
    const projectsWithNotes = projects.filter(p => p.notes.length > 0)

    const result = []

    projectsWithNotes.forEach(p => {
        result.push(...p.notes)
    })

    if (arguments.length < 2) {
        return result 
    } else {
        if (typeof callback !== 'function') {
            throw new Error('the callback argument must be of type function')
        }

        return result.filter(callback)
    }
}

export {
    filterTasksByDate,
    filterNotes
}
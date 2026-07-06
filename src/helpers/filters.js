
function filterTasksByDate(projects, date) {
    const tasks = getAllTasks(projects)

    let parsedDate 

    if (date === 'today') {
        parsedDate = new Date().toLocaleDateString()

    } else {
        parsedDate = new Date(date).toLocaleDateString()
    }

    const filterdbyDate = tasks.filter(t => t.dueDate === parsedDate)

    return filterdbyDate.length > 0 ? filterdbyDate : []
}

function getAllTasks(projects) {
    if (!projects || projects.length === 0) {
        return
    }
    const projectsWithTasks = projects.filter(p => p.tasks.length > 0)
    if (projectsWithTasks.length === 0) {
        return 
    }
    const tasks = []

    for (let i = 0; i < projectsWithTasks.length; i++) {
        for (let j = 0; j < projectsWithTasks[i].tasks.length; j++) {
            tasks.push(projectsWithTasks[i].tasks[j])
        }
    }

    return tasks
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
    filterNotes,
    getAllTasks
}
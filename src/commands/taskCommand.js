export default function taskCommand(argv, mgr, filePath) {
    if (argv.length === 0) {
        console.error('An option is required')
        // Add help later
        return
    }
    switch(argv[0]) {
        case 'add':
        case '-a':
            mgr.addTaskToProjectByIndex(filePath, argv[1])
            break;
        case 'list':
        case '-l': {
            if (argv[1] === '-c' || argv[1] === 'complete') {
                mgr.listCompletedTasksByIndex(argv[2])
            } else if (argv[1] === '-p' || argv[1] === 'pending') {
                mgr.listPendingTasksByIndex(argv[2])
            } else if (argv[1] === '-D' || argv[1] === 'date') {
                mgr.displayTasksByDate(argv[2])
            } else {
                mgr.listTasksByProjectIndex(argv[1])
            }
        }
            break
        case 'complete':
        case '-c':
            mgr.markTaskAsCompleted(filePath, argv[1], argv[2])
            break
        case 'delete':
        case '-d':
            mgr.deleteTask(filePath, argv[1], argv[2])
            break
        case 'view':
        case '-v':
            mgr.viewTaskByIndex(argv[1], argv[2])
            break;
        case 'clear':
            mgr.clearTasksByProjectIndex(filePath, argv[1])
            break
    }
}
export default function projectCommand(argv, mgr, filePath) {
    if (argv.length === 0) {
        mgr.listProjects()
        return 
    }
    switch(argv[0]) {
        case 'add':
        case '-a':
            mgr.addProject(filePath)
            break;
        case 'list':
        case '-l':
            mgr.listProjects()
            break
        case 'delete':
        case '-d':
            mgr.deleteProjectByIndex(filePath, argv[1])
            break
        case 'view':
        case '-v':
            mgr.viewProjectByIndex(argv[1])
            break;
        case 'important':
        case '-i':
            mgr.toggleProjectImportance(filePath, argv[1])
            break
        case 'clear':
            mgr.clearAllProjects(filePath)
            break
    }
}
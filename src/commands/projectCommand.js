import { colors } from '../helpers/format.js'
const validOptions = [
    'add', '-a', 'list', '-l', 'delete',
    '-d', 'view', '-v', 'important', '-i',
    'clear', 'update', '-u'
]

function updateProjectProperties(filePath, property, index, mgr) {
    if (property === 'title') {
        mgr.updateProjectTitle(filePath, index)
    } else if (property === 'description') {
        mgr.updateProjectDescription(filePath, index)
    } else if (property === 'keyword') {
        mgr.updateProjectKeyword(filePath, index)
    } else {
        return
    }
}


export default function projectCommand(argv, mgr, filePath) {
    if (argv.length === 0) {
        mgr.listProjects()
        return 
    }

    if (!validOptions.includes(argv[0])) {
        throw new Error(`   ${colors.red}Invalid command option: <${argv[0]}>${colors.reset}\n`)
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
        case 'update':
        case '-u':
            updateProjectProperties(filePath, argv[1], argv[2], mgr)
            break
    }
}
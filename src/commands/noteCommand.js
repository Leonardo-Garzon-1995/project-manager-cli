import { colors } from '../helpers/format.js'
const validOptions = [
    'add', '-a', 'list', '-l', 'delete',
    '-d', 'view', '-v', 'append', '-ap',
    'clear', 'all', 'file'
]

export default function NoteCommand(argv, mgr, filePath) {
    if (argv.length === 0) {
        throw new Error("An option is required")
    }

    if (!validOptions.includes(argv[0])) {
        throw new Error(`   ${colors.red}Invalid command option: <${argv[0]}>${colors.reset}\n`)
    }
    
    switch(argv[0]) {
        case 'add':
        case '-a':
            mgr.createNoteToProject(filePath, argv[1])
            break;
        case 'append':
        case '-ap':
            mgr.appendToNoteByProject(argv[1], argv[2])
            break
        case 'list':
        case '-l':
            mgr.listNotesByProject(argv[1])
            break
        case 'delete':
        case '-d':
            mgr.deleteNoteFromProject(filePath, argv[1], argv[2])
            break
        case 'view':
        case '-v':
            mgr.readNoteFromProject(argv[1], argv[2])
            break;
        case 'clear':
            mgr.clearAllNotesFromProject(filePath, argv[1])
            break
        case 'all':
            mgr.filterAllNotes()
            break
        case 'file':
            mgr.createNoteFromFileToProject(filePath, argv[1], argv[2])
    }
}
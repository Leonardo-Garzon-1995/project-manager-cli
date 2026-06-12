export default function NoteCommand(argv, mgr, filePath) {
    if (argv.length === 0) {
        console.error("An option is required")
        return
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
    }
}
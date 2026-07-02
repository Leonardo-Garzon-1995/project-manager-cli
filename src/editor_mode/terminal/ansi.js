function clearScreen() {
    process.stdout.write('\x1b[2J\x1b[3J\x1b[H')
}

function moveTerminalCursor(x, y) {
    process.stdout.write(`\x1b[${y};${x}H`)
}

function hideCursor() {
    process.stdout.write('\x1b[?25l')
}
function showCursor() {
    process.stdout.write('\x1b[?25h')
}

function clearLine() {
    process.stdout.write('\x1b[2K')
}

function clearScreenDown() {
    process.stdout.write('\x1b[J')
}

const colors = {
    reset: '\x1b[0m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    gray: '\x1b[90m'
}

export {
    clearScreen,
    moveTerminalCursor,
    hideCursor,
    showCursor,
    clearLine,
    clearScreenDown,
    colors
}
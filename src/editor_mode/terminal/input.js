function enableRawMode() {
    process.stdin.setRawMode(true)
    process.stdin.resume()
    process.stdin.setEncoding('utf8')
}

function onKeyPress(callback) {
    process.stdin.on('data', callback)
}

export {
    enableRawMode,
    onKeyPress
}
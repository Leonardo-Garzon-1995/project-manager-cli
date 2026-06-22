import fs from 'fs'
import path from 'path'
import util from 'util'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const LOG_DIR = path.join(__dirname, '..', '..', 'logs')
const LOG_FILE = path.join(LOG_DIR, 'pro_status.log')


function ensureLogFile() {
    if (!fs.existsSync(LOG_DIR)) {
        fs.mkdirSync(LOG_DIR, {recursive: true})
    }

    if (!fs.existsSync(LOG_FILE)) {
        fs.writeFileSync(LOG_FILE, '')
    }
}

function getTimestamp() {
    return new Date().toISOString()
}

function write(status, msg) {
    ensureLogFile()

    const output = msg instanceof Error ? util.inspect(msg, {
        depth: null,
        showHidden: true
    }) : String(msg)

    const line = `[${getTimestamp()}][${status}] ${output}\n`

    fs.appendFileSync(LOG_FILE, line)
}

function error(message) {
    write('ERROR', message)
}

function info(msg) {
    write('INFO', msg)
}

function debug(message) {
    write('DEBUG', message)
}

function warn(message) {
    write('WARN', message)
}

export {
    error,
    info,
    warn,
    debug
}
#!/usr/bin/node env

import * as logger from '../src/helpers/logger.js'
import dispatch from '../src/index.js'
const [,, command, ...args] = process.argv

function main() {
    try {
        dispatch(command, args)
    } catch (error) {
        logger.error(error)
        console.error(error.message)
        process.exit(error.exitCode ?? 1)
    }
} 

main()




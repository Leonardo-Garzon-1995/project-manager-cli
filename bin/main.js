#!/usr/bin/env node

import * as logger from '../src/helpers/logger.js'
import dispatch from '../src/index.js'
import { initializeEnvironment } from '../src/config/env.js'

const [,, command, ...args] = process.argv

async function main() {
    try {
        await initializeEnvironment()
        await dispatch(command, args)
    } catch (error) {
        logger.error(error)
        console.error(error.message)
        process.exit(error.exitCode ?? 1)
    }
} 

main()




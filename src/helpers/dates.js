function isValidDate(input) {
    const d = new Date(input)

    return !isNaN(d.getTime())
}

/**
 * Generates an ISO 8601 string
 * @returns {string}
 */
function generateTimestamp() {
    return new Date().toISOString()
}

export {
    isValidDate,
    generateTimestamp
}
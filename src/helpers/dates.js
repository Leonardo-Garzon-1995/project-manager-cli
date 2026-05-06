function isValidDate(input) {
    const d = new Date(input)

    return !isNaN(d.getTime())
}

export {
    isValidDate
}
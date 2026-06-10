// FORMATTING
const colors = {
    // Colors
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    gray: "\x1b[90m",
    brightred: "\x1b[91m",
    brightgreen: "\x1b[92m",
    brightyellow: "\x1b[93m",
    brightblue: "\x1b[94m",
    brightmagenta: "\x1b[95m",
    brightcyan: "\x1b[96m",
    brightgray: "\x1b[97m",

    // Styles
    bold: "\x1b[1m",
    dim: "\x1b[2m",
    italic: "\x1b[3m",
    underline: "\x1b[4m",
    blink: "\x1b[5m",
    hidden: "\x1b[8m",
    strikethrough: "\x1b[9m",
    reset: "\x1b[0m",
};

function divider(num) {
    process.stdout.write('-'.repeat(num) + '\n') // '─'
}

function displayBanner(title, text, color = colors.cyan) {
    console.log(color)
    console.log("╔" + "═".repeat(40) + "╗");
    console.log("║ " + colors.reset + title.padEnd(39) + color + "║");
    console.log("║ " + colors.reset + text.padEnd(39) + color + "║");
    console.log("╚" + "═".repeat(40) + "╝" + colors.reset);
    console.log("")

}

function displayBannerThin(text, secondText, color = colors.cyan) {
    console.log(color)
    console.log("╭" + "─".repeat(40) + "╮");
    console.log("│ " + colors.reset + text.padEnd(39) + color + "│");
    console.log("│ " + colors.reset + secondText.padEnd(39) + color + "│");
    console.log("╰" + "─".repeat(40) + "┘" + colors.reset);
    console.log("")
}

/** 
 * 
 * @param {number} value - value for the filled portion of the bar 
 * @param {number} max - max value accepted 
 * @param {number} width - width of the bar 
 * @param {object} options
 *  */ 
function buildMiniBar(value, max, width=16, options={}) {
    const {
        fillColor='\x1b[32m',
        emptyColor='\x1b[0m',
        fillChar='\u25AA',
        emptyChar='\u25AB'
    } = options

    if (value === 0) {
        return emptyColor + emptyChar.repeat(width)
    }
    const filled = Math.round((value / max) * width)
    const empty = width - filled

    return `${fillColor}${fillChar}`.repeat(Math.max(filled, 1)) + `${emptyColor}${emptyChar}`.repeat(Math.max(empty, 0))
}


export {
    colors,
    displayBanner,
    displayBannerThin,
    buildMiniBar,
    divider,
}
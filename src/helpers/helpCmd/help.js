/**
 * @file help.js
 * @description Resolves and displays help information.
 */

import registry from "./registry.js";
import HelpPrinter from "./printer.js";

/**
 * Displays help information.
 *
 * @param {string[]} args
 * Examples:
 * []
 * ["project"]
 * ["project", "add"]
 */
export default function displayHelp(args = []) {

    // pro help
    if (args.length === 0) {
        return HelpPrinter.print(registry.general);
    }

    const [commandName, subcommandName] = args;

    const command = registry.getCommand(commandName);

    if (!command) {
        console.error(`Unknown command "${commandName}".`);
        return;
    }

    // pro help project
    if (!subcommandName) {
        return HelpPrinter.print(command);
    }

    const subcommand = getSubcommand(command, subcommandName);

    if (!subcommand) {
        console.error(
            `Unknown subcommand "${subcommandName}" for command "${command.name}".`
        );

        return HelpPrinter.print(command);
    }

    HelpPrinter.print(subcommand);

}


/**
 * Finds a subcommand by name or alias.
 *
 * @param {object} command
 * @param {string} name
 * @returns {object|null}
 */
function getSubcommand(command, name) {

    if (!command.subcommands) {
        return null;
    }

    // Exact name
    if (command.subcommands[name]) {
        return command.subcommands[name];
    }

    // Search aliases
    for (const subcommand of Object.values(command.subcommands)) {

        if (subcommand.aliases?.includes(name)) {
            return subcommand;
        }

    }

    return null;

}
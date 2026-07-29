/**
 * @file printer.js
 * @description Renders help definitions to the terminal.
 */

import { colors } from "../format.js";

export default class HelpPrinter {

    static print(help) {

        console.log();

        this.printTitle(help.name);

        if (help.description) {
            console.log(help.description);
            console.log();
        }

        if (help.usage) {
            this.printUsage(help.usage);
        }

        if (help.commands) {
            this.printCommands(help.commands);
        }

        if (help.subcommands) {
            this.printSubcommands(help.subcommands);
        }

        if (help.arguments?.length) {
            this.printArguments(help.arguments);
        }

        if (help.options) {
            this.printOptions(help.options);
        }

        if (help.examples?.length) {
            this.printExamples(help.examples);
        }
    }

    static printTitle(title) {

        console.log(
            `${colors.green}${title.toUpperCase()}${colors.reset}`
        );

        console.log();
    }

    static printUsage(usage) {

        console.log(`${colors.green}USAGE${colors.reset}`);
        console.log(`    ${usage}`);
        console.log();
    }

    static printCommands(commands) {

        console.log(`${colors.green}COMMANDS${colors.reset}`);

        for (const command of commands) {

            const aliases = command.alias
                ? ` (${command.alias})`
                : "";

            console.log(
                `    ${colors.cyan}${command.name}${aliases}${colors.reset}`.padEnd(35)
                + command.description
            );
        }

        console.log();
    }

    static printSubcommands(subcommands) {

        console.log(`${colors.green}SUBCOMMANDS${colors.reset}`);

        for (const command of Object.values(subcommands)) {

            const aliases = command.aliases?.length
                ? ` (${command.aliases.join(", ")})`
                : "";

            console.log(
                `    ${colors.cyan}${command.name}${aliases}${colors.reset}`.padEnd(35)
                + command.description
            );
        }

        console.log();
    }

    static printArguments(argumentsList) {

        console.log(`${colors.green}ARGUMENTS${colors.reset}`);

        for (const arg of argumentsList) {

            console.log(
                `    ${colors.brightyellow}<${arg.name}>${colors.reset}`.padEnd(35)
                + arg.description
            );

        }

        console.log();
    }

    static printOptions(options) {

        console.log(`${colors.green}OPTIONS${colors.reset}`);

        for (const option of Object.values(options)) {

            const aliases = option.aliases?.length
                ? ` (${option.aliases.join(", ")})`
                : "";

            console.log(
                `    ${colors.cyan}${option.name}${aliases}${colors.reset}`.padEnd(35)
                + option.description
            );

        }

        console.log();
    }

    static printExamples(examples) {

        console.log(`${colors.green}EXAMPLES${colors.reset}`);

        for (const example of examples) {
            console.log(`    ${example}`);
        }

        console.log();
    }

}
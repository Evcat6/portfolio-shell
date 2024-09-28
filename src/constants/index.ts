import { CommandHistory } from "../types";

const HELP_COMMAND_MESSAGE = `Available Commands:

  ls            - Lists the directories and files in the current directory.
                  Example: ls

  cat <file>    - Displays the content of a file.
                  Example: cat contacts.info

  clear         - Clears the terminal screen, removing all previous output.
                  Example: clear

  help          - Shows this help message with the list of available commands.
                  Example: help
`;

const INITIAL_COMMAND_HISTORY: CommandHistory = [
    {
      command: "help",
      output: HELP_COMMAND_MESSAGE,
    },
];

export { INITIAL_COMMAND_HISTORY, HELP_COMMAND_MESSAGE };

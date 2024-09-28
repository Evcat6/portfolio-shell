import { useEffect, useState } from "react";
import styles from "./index.module.css";
import { FolderStructure, FileInfoItem } from '../../types';
import { INITIAL_COMMAND_HISTORY, HELP_COMMAND_MESSAGE } from '../../constants';
import { TimeLineResponseDto } from "../../dto";

const getPositionsFileInfoItem = ({
  title,
  link_title,
  link,
  date,
}: FileInfoItem) => {
  return `Position: ${title}
Company Name: <a class="${styles.output_link}" href="${link}" >${link_title}</a>
Duration: ${date}
`;
};

const getCertificateFileInfoItem = ({
  title,
  link_title,
  link,
  date,
}: FileInfoItem) => {
  return `Title: ${title}
Link: <a class="${styles.output_link}" href="${link}">${link_title}</a>
Date: ${date}
`;
};

const getConferencesFileInfoItem = ({
  title,
  link_title,
  link,
  date,
}: FileInfoItem) => {
  return `Title: ${title}
Link: <a class="${styles.output_link}" href="${link}" >${link_title}</a>
Date: ${date}`;
};

const getContactsFileInfo = ({
  email,
  linkedin,
  github,
}: {
  email: string;
  linkedin: string;
  github: string;
}) => {
  return `Email: <a class="${styles.output_link}" href="mailto:${email}" >${email}</a>
LinkedIn: <a class="${styles.output_link}" href="${linkedin}">Link</a>
GitHub: <a class="${styles.output_link}" href="${github}">Link</a>
`;
};

const Terminal = () => {
  const [terminalHistory, setTerminalHistory] = useState(
    INITIAL_COMMAND_HISTORY
  );
  const [folderStructure, setFolderStructure] = useState<FolderStructure>({
    "positions.info": "",
    "certificates.info": "",
    "conferences.info": "",
    "contacts.info": getContactsFileInfo({
      email: import.meta.env.VITE_USER_EMAIL,
      linkedin: import.meta.env.VITE_USER_LINKEDIN,
      github: import.meta.env.VITE_USER_GITHUB,
    }),
  });

  const loadFolderStructure = async() => {
    const response = await fetch(`${import.meta.env.VITE_APP_URL}/api/timeline`);

    const { positions, certificates, conferences }: TimeLineResponseDto = await response.json();
    setFolderStructure({
      ...folderStructure,
      "positions.info": positions.map(getPositionsFileInfoItem).join("\n"),
      "certificates.info": certificates
        .map(getCertificateFileInfoItem)
        .join("\n"),
      "conferences.info": conferences
        .map(getConferencesFileInfoItem)
        .join("\n"),
    });
  }

  useEffect(() => {
    loadFolderStructure();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLInputElement;
      handleCommand(target.value);
      target.value = "";
    }
  };

  const addHistory = (command: string, output: string) => {
    setTerminalHistory([
      ...terminalHistory,
      {
        command,
        output,
      },
    ]);
  };

  const handleLs = () => {
    addHistory(`ls`, Object.keys(folderStructure).join("\n"));
  };

  const handleCat = (fileName: keyof FolderStructure) => {
    const fileContent = folderStructure[fileName];
    if (typeof fileContent === "string") {
      addHistory(`cat ${fileName}`, fileContent);
    } else {
      addHistory(`cat ${fileName}`, `No such file: ${fileName}`);
    }
  };

  const handleCommand = (command: string) => {
    if (!command.trim()) return;

    if (command === "clear") {
      setTerminalHistory([]);
      return;
    }

    if (command === "help") {
      setTerminalHistory([
        ...terminalHistory,
        {
          command: "help",
          output: HELP_COMMAND_MESSAGE,
        },
      ]);
      return;
    }

    const [cmd, arg] = command.split(" ");

    switch (cmd) {
      case "ls":
        if (arg) {
          addHistory(command, `"ls" don't take arguments`);
        } else {
          handleLs();
        }
        break;

      case "cat":
        if (!arg) {
          addHistory(command, "The cat command requires a file name.");
        } else {
          handleCat(arg as keyof FolderStructure);
        }
        break;

      default:
        addHistory(
          command,
          `Invalid command: ${cmd}. Use "ls", "cd", or "cat".`
        );
    }
  };

  return (
    <div className={styles.container}>
      {terminalHistory.map((item, index) => (
        <div className={styles.prompt} key={index}>
          <div>
            <span className={styles.user}>
              quest@{import.meta.env.VITE_APP_DOMAIN_NAME}
            </span>
            <span className={styles.location}>~</span>
            <span className={styles.dollar}>$</span>
            <span className={styles.command}>{item.command}</span>
          </div>
          <pre
            dangerouslySetInnerHTML={{ __html: item.output }}
            className={styles.prompt_output}
          />
        </div>
      ))}

      <div className={styles.prompt_input}>
        <span className={styles.user}>
          quest@{import.meta.env.VITE_APP_DOMAIN_NAME}
        </span>
        <span className={styles.location}>~</span>
        <span className={styles.dollar}>$</span>
        <input
          onKeyDown={onKeyDown}
          className={styles.command_input}
          autoFocus
        />
      </div>
    </div>
  );
};

export { Terminal };


type CommandHistory = {
    command: string;
    output: string;
}[];

type FolderStructure = {
    "positions.info": string;
    "certificates.info": string;
    "conferences.info": string;
    "contacts.info": string;
};

type FileInfoItem = {
    title: string;
    link_title: string;
    link: string;
    date: string;
};

export type { CommandHistory, FolderStructure, FileInfoItem };

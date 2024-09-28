import { FileInfoItem } from "../types";

type TimeLineResponseDto = { name: string; overview: string; positions: FileInfoItem[]; certificates: FileInfoItem[]; conferences: FileInfoItem[] };

export type { TimeLineResponseDto };
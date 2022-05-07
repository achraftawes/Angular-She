import { IAttachment } from "./attachment.model";

export interface ILesson {
    idLesson: number;
    title: string;
    content: string;
    url_video: IAttachment;
}

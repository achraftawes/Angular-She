import { ISection } from "./section.model";
import { IUser } from "./user.model";
import { ICertificate } from "./certificate.model";
import { IAttachment } from "./attachment.model";

export enum Level {
    Beginner,
    Intermediate,
    Advanced,
}

export interface ITraining {
    idTraining: number;
    title: string;
    description: string;
    imgTraining: IAttachment;
    isAvailable: boolean;
    nbrHours: number;
    startDate: Date;
    endDate: Date;
    level: Level;
    sections: ISection[];
    former: IUser;
    certificate: ICertificate;
}

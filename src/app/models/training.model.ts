import { ISection } from "./section.model";
import { IUser } from "./user.model";
import { ICertificate } from './certificate.model';

export enum Level {
    Beginner,
    Intermediate,
    Advanced
}


export interface ITraining {
	idTraining: number;
	title: string;
	description: string;
	imgTraining: string;
	isAvailable: boolean;
	nbrHours: number;
    startDate: Date;
    endDate: Date;
    level: Level;
    sections: ISection[];
    former: IUser;
    certificate: ICertificate
}

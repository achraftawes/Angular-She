import { IRole } from "./role.model";
import { ITraining } from './training.model';

export interface IUser {
    id: number;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	pwd: string;
	picture: string;
	active: boolean;
    verification_code: string;
	lastConnectionDate: Date;
	roles: IRole[];
    hourlyFee: number;
}

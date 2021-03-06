import { Role } from "./role.model";

export class User {
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    pwd: string;
    picture: string;
    active: boolean;
    failedAttempt: Number;
    lockTime: Date;
    verificationCode: string;
    lastConnectionDate: Date;
    roles: Role[];
    constructor(
        firstName: string,
        lastName: string,
        userName: string,
        email: string,
        pwd: string,
        picture: string,
        active: boolean,
        failedAttempt: number,
        lockTime: Date,
        verificationCode: string,
        lastConnectionDate: Date,
        roles: Role[]
    ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.pwd = pwd;
        this.picture = picture;
        this.active = active;
        this.failedAttempt = failedAttempt;
        this.lockTime = lockTime;
        this.verificationCode = verificationCode;
        this.lastConnectionDate = lastConnectionDate;
        this.roles = roles;
    }
}

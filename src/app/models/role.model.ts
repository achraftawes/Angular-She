export enum RoleName {
    FORMER = "FORMER",
    WOMAN = "WOMAN",
    JOB_PROPOSER = "JOB_PROPOSER",
    EXPERT = "EXPERT",
    DONATOR = "DONATOR",
    ADMINISTRATOR = "ADMINISTRATOR"
}

export interface IRole {
    id: number;
    role: RoleName
}

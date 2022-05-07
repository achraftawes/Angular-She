import { User } from "./user.model";

export class Role {
    id: number;
    users: User;
    roleName: Role;
}

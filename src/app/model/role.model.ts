import { User } from "./user.model";
import { RoleName } from "./role-name";


export class Role {
    id:Number;
    users:User[];
    roleName: RoleName

    constructor(users: User[], roleName:RoleName) {
        this.users = users;
        this.roleName = roleName;
}
}

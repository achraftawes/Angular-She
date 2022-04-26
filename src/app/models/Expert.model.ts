import { Appointement } from "./Appointement.model";
import { Specialty } from "./Specialty.model";

export interface Expert{




    id_expert:string;
    email:string;
    firstname:string;
    lastname:string;
    number:number;
    appointements:Appointement[];
    specialty:Specialty;
}
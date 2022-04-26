import { Donnation } from "./Donnation.model";

export interface Donator{
    id_donator:string;
    emaildonor:string;
    namedonor:string;
    number:number;
    pwddonor:string;
    donnations:Donnation[];
}
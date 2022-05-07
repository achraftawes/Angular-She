import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IStatMap } from "../models/stats.model";

@Injectable({ providedIn: "root" })
export class FormerService {
    constructor(private http: HttpClient) {}
    getMyTrainings(): Promise<IStatMap> {
        return this.http
            .get(`/former/get-my-trainings`)
            .toPromise() as Promise<IStatMap>;
    }
}

import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from "@angular/common/http";

const headers = new HttpHeaders().set("Content-Type", "application/json");
@Injectable({
    providedIn: "root",
})
export class RoleService {
    private baseUrl = "/role";

    constructor(private http: HttpClient) {}

    findRoleById(id): Observable<any> {
        return this.http.get(`${this.baseUrl}/retrieve-role/${id}`);
    }

    findRoles(): Observable<any> {
        return this.http.get(`${this.baseUrl}/retrieve-roles`);
    }
}

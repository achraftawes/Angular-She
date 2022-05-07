import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { User } from "../models/user.model";
import {
    HttpClient,
    HttpErrorResponse,
    HttpHeaders,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Router } from "@angular/router";

const headers = new HttpHeaders().set("Content-Type", "application/json");
@Injectable({
    providedIn: "root",
})
export class RegistrationService {
    private baseUrl = "/registration";

    constructor(private http: HttpClient, private router: Router) {}
    signup(user: User): Observable<any> {
        console.log("In RegistrationService");
        console.log("role = " + user.roles);
        //console.log('role id = '+ user.role.id);
        console.log("role name = " + user.roles[0].roleName);
        return this.http
            .post(
                this.baseUrl,
                {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    userName: user.userName,
                    email: user.email,
                    pwd: user.pwd,
                    roles: user.roles,
                },
                { headers, responseType: "text" }
            )
            .pipe(catchError(this.handleError));
    }

    private handleError(httpError: HttpErrorResponse) {
        let message: string = "";

        if (httpError.error instanceof ProgressEvent) {
            console.log("in progrss event");
            message = "Network error";
        }
        // else if (httpError.error instanceof ErrorEvent) {
        //   // A client-side or network error occurred. Handle it accordingly.
        //   message = httpError.error.message;
        //   console.error('An error occurred:', httpError.error.message);
        // }
        else {
            message = httpError.error.message;
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${httpError.status}, ` +
                    `body was: ${httpError.error}`
            );
        }
        // Return an observable with a user-facing error message.
        return throwError(message);
    }
}

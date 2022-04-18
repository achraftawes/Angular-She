import {
    HttpHeaders,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
    constructor(@Inject("BASE_API_URL") private baseUrl: string) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // This is mandatory to create a new training
        const token =
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhaGFtZGkiLCJleHAiOjE2NTAyNTI3MDYsImlhdCI6MTY1MDIzNDcwNn0.9kg62BH3d8GXaQSP4dOazsbqVI8IzryqTNcZfZkO8I8IfJdIXi8Xm4RuFcsHqFfzqSzxggiFYEF7-6FqV3cV0g";
        const headers = new HttpHeaders().set(
            "Authorization",
            "Bearer " + token
        );
        const apiReq = request.clone({
            url: `${this.baseUrl}${request.url}`,
            headers,
        });
        return next.handle(apiReq);
    }
}

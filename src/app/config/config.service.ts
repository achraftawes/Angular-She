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
            "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhaGFtZGkiLCJleHAiOjE2NTAzODA4NzMsImlhdCI6MTY1MDM2Mjg3M30.wjzLR7c_hVRR0bA6av5XeQzCfqziXXBig3I_wfgwYMyiFHfZeMprlXzLHctQllZQFQoB8gAjPPNl2HcdovC3EQ";
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

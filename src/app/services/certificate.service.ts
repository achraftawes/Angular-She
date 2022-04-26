import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class CertificateService {
    constructor(private http: HttpClient) {}

    getCertificate(certificateId: number) {
        return this.http
            .get(`/certificate/${certificateId}`, { responseType: "text" })
            .toPromise();
    }
}

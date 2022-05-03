import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IAttachment } from "../models/attachment.model";
import { IClaim } from "../models/claim.model";

@Injectable({ providedIn: "root" })
export class ClaimService {
    constructor(private http: HttpClient) {}

    public addClaim(body: string) {
        return this.http
            .post("/claim/add-claim", { body }, { responseType: "text" })
            .toPromise() as Promise<string>;
    }

    public retrieveClaim(claimId: string) {
        return this.http.get(
            `/claim/retrieve-claim/${claimId}`
        ) as Observable<IClaim>;
    }
}

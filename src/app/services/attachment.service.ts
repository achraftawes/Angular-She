import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAttachment } from "../models/attachment.model";

@Injectable({ providedIn: "root" })
export class AttachmentService {
    constructor(private http: HttpClient) {}

    public uploadFile(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        return this.http
            .post("/attachment/upload", formData)
            .toPromise() as Promise<IAttachment>;
    }
}

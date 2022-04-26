import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, take } from "rxjs/operators";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

import { CertificateService } from "../../../services/certificate.service";

@Component({
    selector: "app-certificate-page",
    templateUrl: "./certificate-page.component.html",
})
export class CertificatePageComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private certificateService: CertificateService,
        private sanitizer: DomSanitizer
    ) {}

    public certificate;
    async ngOnInit(): Promise<void> {
        const idCertificate = await this.route.params
            .pipe(
                filter((params) => !!params["id-certificate"]),
                map((params) => params["id-certificate"]),
                take(1)
            )
            .toPromise();
        if (!idCertificate) this.router.navigate(["courses-grid"]);
        this.certificate = this.sanitizer.bypassSecurityTrustHtml(
            await this.certificateService.getCertificate(idCertificate)
        );
        console.log(this.certificate);
    }
}

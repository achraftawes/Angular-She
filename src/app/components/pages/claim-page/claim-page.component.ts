import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ClaimService } from "../../../services/claim.service";
import { StorageService } from "../../../services/storage.service";

@Component({
    selector: "app-contact-page",
    templateUrl: "./claim-page.component.html",
    styleUrls: ["./claim-page.component.scss"],
})
export class ClaimPageComponent implements OnInit {
    userName: string;
    constructor(
        private router: Router,
        private claimService: ClaimService,
        private storageService: StorageService
    ) {}

    ngOnInit(): void {
        this.userName = sessionStorage.getItem("username");
        if (!this.userName) this.router.navigate(["login"]);
    }

    async submit(form) {
        var message = form.message;
        const topic = await this.claimService.addClaim(message);
        this.storageService.setStorageItem({ key: "claimTopic", value: topic });
    }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map, take } from "rxjs/operators";
import { FormerService } from "src/app/services/former.service";
import { IStats } from "../../../models/stats.model";

@Component({
    selector: "app-training-stats",
    templateUrl: "./training-stats.component.html",
    styleUrls: ["./training-stats.component.scss"],
})
export class TrainingStatsComponent implements OnInit {
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private formerService: FormerService
    ) {}

    public stats: IStats;
    public engagementLabels = ["Not Engaged", "Engaged"];
    public successLabels = ["Failed", "Succeeded"];
    public engagementValues = [100, 0];
    public successValues = [100, 0];

    async ngOnInit() {
        const idTraining = await this.route.params
            .pipe(
                filter((params) => !!params["id-training"]),
                map((params) => params["id-training"]),
                take(1)
            )
            .toPromise();

        const myTrainings = await this.formerService.getMyTrainings();
        if (!myTrainings[+idTraining])
            return this.router.navigate(["/course-grid"]);
        this.stats = myTrainings[+idTraining];
        this.engagementValues = [
            100 - this.stats.engagement,
            this.stats.engagement,
        ];
        this.successValues = [
            100 - this.stats.successRate,
            this.stats.successRate,
        ];
    }
}

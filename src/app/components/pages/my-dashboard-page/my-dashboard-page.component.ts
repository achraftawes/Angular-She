import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UserService } from "src/app/services/user.service";
import { ITraining } from "../../../models/training.model";
import { TrainingService } from "../../../services/training.service";

@Component({
    selector: "app-my-dashboard-page",
    templateUrl: "./my-dashboard-page.component.html",
    styleUrls: ["./my-dashboard-page.component.scss"],
})
export class MyDashboardPageComponent implements OnInit {
    constructor(
        private trainingService: TrainingService,
        private userService: UserService
    ) {}
    public trainings: ITraining[];
    public users: User;

    async ngOnInit(): Promise<void> {
        this.trainings = await this.trainingService.listTrainings().toPromise();
    }
}

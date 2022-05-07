import { Component, OnInit } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { TrainingService } from "../../../services/training.service";
import { ITraining } from "../../../models/training.model";
import { TrainingState } from "../../../store";
import { TrainingActions } from "src/app/store/training/training.actions";

@Component({
    selector: "app-courses-grid",
    templateUrl: "./courses-grid.component.html",
    styleUrls: ["./courses-grid.component.scss"],
})
export class CoursesGridPageComponent implements OnInit {
    constructor(
        private trainingService: TrainingService,
        private store: Store
    ) {}
    @Select(TrainingState.allTrainings) trainings$: Observable<ITraining[]>;

    ngOnInit(): void {
        this.store.dispatch(new TrainingActions.GetAll());
    }

    public getLessonsNumber(training: ITraining) {
        return training.sections.reduce((acc, section) => {
            acc += section.lesson.length;
            return acc;
        }, 0);
    }

    public async getReview(training: any) {
        const review = (await this.trainingService.getTrainingReview(
            training.idTraining
        )) as number;
        return Array(review)
            .fill(0)
            .map((_, i) => i);
    }
}

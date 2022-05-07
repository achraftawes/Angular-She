import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { filter, map, take } from "rxjs/operators";
import { TrainingState } from "src/app/store";
import { TrainingActions } from "src/app/store/training/training.actions";

import { ITraining } from "../../../models/training.model";
import { ILesson } from "../../../models/lesson.model";
import { IQuiz } from "src/app/models/quiz.model";
import { RoleName } from "src/app/models/role-name";
import { TrainingService } from "src/app/services/training.service";
import { IStats } from "src/app/models/stats.model";

@Component({
    selector: "app-courses-details-page",
    templateUrl: "./courses-details-page.component.html",
    styleUrls: ["./courses-details-page.component.scss"],
})
export class CoursesDetailsPageComponent implements OnInit {
    @Select(TrainingState.selectedTraining)
    selectedTraining$: Observable<ITraining>;
    @Select(TrainingState.selectedLesson)
    selectedLesson$: Observable<ILesson>;
    @Select(TrainingState.selectedQuiz)
    selectedQuiz$: Observable<IQuiz>;

    @Select(TrainingState.answerSubmitted)
    answerSubmitted$: Observable<boolean>;

    public isEnrolledToTraining = false;
    public idTraining: number;
   

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private store: Store,
        private trainingService: TrainingService
    ) {}

    async ngOnInit(): Promise<void> {
        const idTraining = await this.route.params
            .pipe(
                filter((params) => !!params["id-training"]),
                map((params) => params["id-training"]),
                take(1)
            )
            .toPromise();
        if (!idTraining) this.router.navigate(["courses-grid"]);
        this.store.dispatch(new TrainingActions.SelectTraining(+idTraining));
        this.idTraining = idTraining;
        await this.isEnrolled();
    }

    async isEnrolled() {
        const rolesRaw = sessionStorage.getItem("roles");
        if (!rolesRaw) return;
        const parsedRoles = JSON.parse(rolesRaw) as RoleName[];
        const isFormer = parsedRoles.includes(RoleName.FORMER);
        if (isFormer) {
            // Formers does not need to enroll to training
            this.isEnrolledToTraining = true;
            return;
        }
        this.isEnrolledToTraining =
            await this.trainingService.isEnrolledToTraining(this.idTraining);
    }

    async enrollToTraining() {
        await this.trainingService.enrollToTraining(this.idTraining);
        await this.isEnrolled();
    }

    onSelectQuiz(sectionId: number) {
        // clean up selected lesson
        this.store.dispatch(new TrainingActions.SelectQuiz(sectionId));
    }

    onSelectLesson(lessonId: number) {
        // Clean up selected quiz
        this.store.dispatch(new TrainingActions.SelectLesson(lessonId));
    }

    userAnswerChange(event, questionId) {
        this.store.dispatch(
            new TrainingActions.AnswerQuestion(
                questionId,
                Number(event.path[0].defaultValue)
            )
        );
    }
    async submit() {
        this.store.dispatch(new TrainingActions.SubmitAnswer());
    }
}

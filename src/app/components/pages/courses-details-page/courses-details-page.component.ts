import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

import { filter, map, take } from "rxjs/operators";
import { ITraining } from "../../../models/training.model";
import { TrainingService } from "../../../services/training.service";
import { LearnerAnswerService } from "../../../services/learnerAnswer.service";

@Component({
    selector: "app-courses-details-page",
    templateUrl: "./courses-details-page.component.html",
    styleUrls: ["./courses-details-page.component.scss"],
})
export class CoursesDetailsPageComponent implements OnInit {
    public training: ITraining;
    public selectedLesson = null;
    public lessonSelected = false;

    public selectedQuiz = null;
    public quizSelected = false;
    public answerSubmitted = false;

    public userAnswer = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private trainingService: TrainingService,
        private learnerAnswerService: LearnerAnswerService
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
        const training = (await this.trainingService.listTrainings()).find(
            ({ idTraining: trainingId }) => trainingId === +idTraining
        );
        if (!training) this.router.navigate(["courses-grid"]);
        this.training = training;
    }

    onSelectQuiz(sectionId: number) {
        // clean up selected lesson
        this.selectedLesson = null;
        this.lessonSelected = false;
        this.answerSubmitted = false;
        this.selectedQuiz = this.training.sections.find(
            ({ idSection }) => idSection === sectionId
        ).quiz;
        setTimeout(() => (this.quizSelected = false));
        setTimeout(() => (this.quizSelected = true));
    }

    onSelectLesson(lessonId) {
        // Clean up selected quiz
        this.selectedQuiz = null;
        this.quizSelected = false;
        this.answerSubmitted = false;
        this.selectedLesson =
            this.training.sections
                .reduce((acc, { lesson }) => {
                    acc.push(...lesson);
                    return acc;
                }, [])
                .find(({ idLesson }) => idLesson === lessonId) || null;
        setTimeout(() => (this.lessonSelected = false));
        setTimeout(() => (this.lessonSelected = this.selectedLesson !== null));
    }

    userAnswerChange(event, questionId) {
        this.userAnswer[questionId] = Number(event.path[0].defaultValue);
    }
    async submit() {
        this.answerSubmitted = false;
        const quizId = this.selectedQuiz.id;
        const userAnswer = this.selectedQuiz.questions.map(({ id }) => ({
            question: id as number,
            answerIndex: this.userAnswer[id] as number,
        }));
        await this.learnerAnswerService.answerQuiz(quizId, userAnswer);
        this.answerSubmitted = true;
    }
}

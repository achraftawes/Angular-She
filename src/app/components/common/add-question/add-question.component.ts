import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { Store } from "@ngxs/store";
import { IQuestion } from "src/app/models/question.model";
import { QuizActions } from "src/app/store/training-management/quiz.actions";

@Component({
    selector: "app-add-question",
    templateUrl: "./add-question.component.html",
    styleUrls: ["./add-question.component.scss"],
})
export class AddQuestionComponent implements OnInit {
    @Input("index") index;
    @Input() question: IQuestion;
    constructor(private store: Store) {}

    ngOnInit(): void {}
    correctAnswerChange(event) {
        const correctAnswer = +event.path[0].defaultValue;
        this.store.dispatch(
            new QuizActions.EditCorrectAnswer(this.question.id, correctAnswer)
        );
    }

    onQuestionChange(event) {
        this.store.dispatch(
            new QuizActions.EditQuestion(this.question.id, event.target.value)
        );
    }

    onChangeChoiceA(event) {
        this.store.dispatch(
            new QuizActions.EditChoiceA(this.question.id, event.target.value)
        );
    }

    onChangeChoiceB(event) {
        this.store.dispatch(
            new QuizActions.EditChoiceB(this.question.id, event.target.value)
        );
    }

    onChangeChoiceC(event) {
        this.store.dispatch(
            new QuizActions.EditChoiceC(this.question.id, event.target.value)
        );
    }
}

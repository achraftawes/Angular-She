import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { IQuestion } from "src/app/models/question.model";

@Component({
    selector: "app-add-question",
    templateUrl: "./add-question.component.html",
    styleUrls: ["./add-question.component.scss"],
})
export class AddQuestionComponent implements OnInit {
    @Input("index") index;
    @Input() question: IQuestion;
    @Output() questionChange = new EventEmitter<IQuestion>();
    constructor() {}
    public questionSentence;
    public choiceA;
    public choiceB;
    public choiceC;
    public correctAnswer;

    ngOnInit(): void {}
    correctAnswerChange(event) {
        this.correctAnswer = event.path[0].defaultValue;
        this.emitUpdated();
        console.log(event.target);
    }
    emitUpdated() {
        console.log({
            id: 0,
            question: this.questionSentence,
            choiceA: this.choiceA,
            choiceB: this.choiceB,
            choiceC: this.choiceC,
            correctAnswer: this.correctAnswer,
        });

        this.questionChange.emit({
            id: 0,
            question: this.questionSentence,
            choiceA: this.choiceA,
            choiceB: this.choiceB,
            choiceC: this.choiceC,
            correctAnswer: this.correctAnswer,
        });
    }
}

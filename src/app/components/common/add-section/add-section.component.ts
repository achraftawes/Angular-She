import {
    Component,
    EventEmitter,
    forwardRef,
    Input,
    OnInit,
    Output,
} from "@angular/core";
import { ISection } from "../../../models/section.model";
import { FormControl } from "@angular/forms";
import { ILesson } from "../../../models/lesson.model";

@Component({
    selector: "app-add-section",
    templateUrl: "./add-section.component.html",
    styleUrls: ["./add-section.component.scss"],
})
export class AddSectionComponent implements OnInit {
    public radio: FormControl;
    public numbers = [];
    public lessons: ILesson[] = [];
    public title;
    public quizQuestion;
    public choiceA;
    public choiceB;
    public choiceC;
    public correctAnswer;

    @Input("index") index;

    @Input() section: ISection;
    @Output() sectionChange = new EventEmitter<ISection>();
    constructor() {}
    ngOnInit(): void {}

    addLesson() {
        this.lessons.push({} as ILesson);
        const nextIndex = this.numbers.length + 1;
        this.numbers = Array(nextIndex)
            .fill(0)
            .map((_, i) => i);
        this.emitUpdated();
    }

    correctAnswerChange(event) {
        this.correctAnswer = event.path[0].defaultValue;
        this.emitUpdated();
    }

    emitUpdated() {
        this.sectionChange.emit({
            idSection: 0,
            lesson: this.lessons.filter((lesson) => lesson.title),
            title: this.title,
            quiz: {
                id: 0,
                name: "",
                questions: [
                    {
                        id: 0,
                        question: this.quizQuestion,
                        choiceA: this.choiceA,
                        choiceB: this.choiceB,
                        choiceC: this.choiceC,
                        correctAnswer: this.correctAnswer,
                    },
                ],
            },
        });
    }
}

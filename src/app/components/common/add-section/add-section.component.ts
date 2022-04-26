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
import { IQuestion } from "src/app/models/question.model";

@Component({
    selector: "app-add-section",
    templateUrl: "./add-section.component.html",
    styleUrls: ["./add-section.component.scss"],
})
export class AddSectionComponent implements OnInit {
    public radio: FormControl;
    public numbers = [];
    public num = [];
    public lessons: ILesson[] = [];
    public questions: IQuestion[] = [];
    public title;

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

    addQuiz() {
        this.questions.push({} as IQuestion);
        const nextIndex = this.num.length + 1;
        this.num = Array(nextIndex)
            .fill(0)
            .map((_, i) => i);
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
                questions: this.questions,
            },
        });
    }
}

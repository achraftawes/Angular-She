import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ISection } from "../../../models/section.model";
import { FormControl } from "@angular/forms";
import { ILesson } from "../../../models/lesson.model";
import { IQuestion } from "src/app/models/question.model";
import { Store } from "@ngxs/store";
import { LessonActions } from "src/app/store/training-management/lesson.actions";
import { QuizActions } from "src/app/store/training-management/quiz.actions";
import { SectionActions } from "src/app/store/training-management/section.actions";

@Component({
    selector: "app-add-section",
    templateUrl: "./add-section.component.html",
    styleUrls: ["./add-section.component.scss"],
})
export class AddSectionComponent implements OnInit {
    public radio: FormControl;
    // public numbers = [];
    // public num = [];
    // public lessons: ILesson[] = [];
    // public questions: IQuestion[] = [];
    // public title;

    @Input("index") index;

    @Input() section: ISection;
    constructor(private store: Store) {}
    ngOnInit(): void {}

    addLesson() {
        this.store.dispatch(new LessonActions.Add(this.section.idSection));
    }

    addQuestion() {
        this.store.dispatch(
            new QuizActions.AddQuestion(this.section.idSection)
        );
    }

    onTitleChange(event) {
        this.store.dispatch(
            new SectionActions.EditTitle(
                this.section.idSection,
                event.target.value
            )
        );
    }
}

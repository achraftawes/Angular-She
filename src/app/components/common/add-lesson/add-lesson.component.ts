import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Store } from "@ngxs/store";
import { ILesson } from "../../../models/lesson.model";
import { AttachmentService } from "../../../services/attachment.service";
import { LessonActions } from "src/app/store/training-management/lesson.actions";

@Component({
    selector: "app-add-lesson",
    templateUrl: "./add-lesson.component.html",
    styleUrls: ["./add-lesson.component.scss"],
})
export class AddLessonComponent {
    @Input("index") index;
    @Input() lesson: ILesson;
    constructor(
        private attachmentService: AttachmentService,
        private store: Store
    ) {}

    public file: File;

    async onFileSelected(event) {
        this.file = event.target.files[0];
        const urlVideo = await this.attachmentService.uploadFile(this.file);
        this.store.dispatch(
            new LessonActions.EditUrlVideo(this.lesson.idLesson, urlVideo)
        );
    }

    onLessonDescriptionChange(content) {
        this.store.dispatch(
            new LessonActions.EditContent(this.lesson.idLesson, content)
        );
    }

    onTitleChange(event) {
        this.store.dispatch(
            new LessonActions.EditTitle(
                this.lesson.idLesson,
                event.target.value
            )
        );
    }
}

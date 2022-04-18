import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ILesson } from "../../../models/lesson.model";
import { AttachmentService } from "../../../services/attachment.service";

@Component({
    selector: "app-add-lesson",
    templateUrl: "./add-lesson.component.html",
    styleUrls: ["./add-lesson.component.scss"],
})
export class AddLessonComponent {
    @Input("index") index;
    @Input() lesson: ILesson;
    @Output() lessonChange = new EventEmitter<ILesson>();
    constructor(private attachmentService: AttachmentService) {}

    public title;
    public content;
    public video;
    private file: File;

    async onFileSelected(event) {
        this.file = event.target.files[0];
        this.video = await this.attachmentService.uploadFile(this.file);
        this.emitUpdated();
    }

    onLessonDescriptionChange(content) {
        this.content = content;
        this.emitUpdated();
    }

    emitUpdated() {
        console.log({
            idLesson: 0,
            title: this.title,
            content: this.content,
            url_video: this.video,
        });
        this.lessonChange.emit({
            idLesson: 0,
            title: this.title,
            content: this.content,
            url_video: this.video,
        });
    }
}

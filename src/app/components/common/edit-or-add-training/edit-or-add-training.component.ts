import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Store } from "@ngxs/store";
import { ITraining } from "src/app/models/training.model";
import { SectionActions } from "src/app/store/training-management/section.actions";
import { TrainingManagementActions } from "src/app/store/training-management/training.actions";
import { AttachmentService } from "../../../services/attachment.service";

@Component({
    selector: "app-edit-or-add-training",
    templateUrl: "./edit-or-add-training.component.html",
    styleUrls: ["./edit-or-add-training.component.scss"],
})
export class EditOrAddTrainingComponent {
    @Input() training: ITraining;
    @Output() submit = new EventEmitter();
    public numbers = [];
    private file: File;

    constructor(
        private store: Store,
        private attachmentService: AttachmentService
    ) {}

    async onFileSelected(event) {
        this.file = event.target.files[0];
        const imgTraining = await this.attachmentService.uploadFile(this.file);
        this.store.dispatch(
            new TrainingManagementActions.EditImgTraining(imgTraining)
        );
    }
    addSection() {
        this.store.dispatch(new SectionActions.AddSection());
    }
    onTitleChange(event) {
        const {
            target: { value },
        } = event;
        this.store.dispatch(new TrainingManagementActions.EditTitle(value));
    }

    onTrainingDescriptionChange(content) {
        this.store.dispatch(
            new TrainingManagementActions.EditDescription(content)
        );
    }

    onSubmit() {
        this.submit.emit();
    }
}

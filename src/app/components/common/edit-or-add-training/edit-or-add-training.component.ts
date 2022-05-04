import { Component, EventEmitter, Output } from "@angular/core";
import { ISection } from "src/app/models/section.model";
import { ITraining } from "src/app/models/training.model";

@Component({
    selector: "app-edit-or-add-training",
    templateUrl: "./edit-or-add-training.component.html",
    styleUrls: ["./edit-or-add-training.component.scss"],
})
export class EditOrAddTrainingComponent {
    @Output() training: ITraining;
    @Output() trainingChange = new EventEmitter<ITraining>();
    @Output() submit = new EventEmitter();
    public numbers = [];
    private file: File;
    public trainingTitle: string;
    public trainingDescription: string;
    public sections: ISection[] = [];

    constructor() {}

    onFileSelected(event) {
        this.file = event.target.files[0];
    }
    addSection() {
        this.sections.push({} as ISection);
        const nextIndex = this.numbers.length + 1;
        this.numbers = Array(nextIndex)
            .fill(0)
            .map((_, i) => i);
    }

    onTrainingDescriptionChange(content) {
        this.trainingDescription = content;
    }

    onSubmit() {
        this.submit.emit();
    }
}

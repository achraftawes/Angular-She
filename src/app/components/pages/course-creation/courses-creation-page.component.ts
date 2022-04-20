import { Component } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { TrainingService } from "../../../services/training.service";
import { AttachmentService } from "../../../services/attachment.service";
import { ITraining } from "../../../models/training.model";
import { ISection } from "../../../models/section.model";
import { CourseCreationModalComponent } from "../../common/course-creation-modal/course-creation-modal.component";

@Component({
    selector: "app-course-creation-page",
    templateUrl: "./course-creation-page.component.html",
    styleUrls: ["./course-creation-page.component.scss"],
})
export class CourseCreationPageComponent {
    public numbers = [];
    private file: File;
    public trainingTitle: string;
    public trainingDescription: string;
    public sections: ISection[] = [];
    private trainingId;

    constructor(
        private trainingService: TrainingService,
        private attachmentService: AttachmentService,
        private modalService: NgbModal,
        private router: Router
    ) {}

    onFileSelected(event) {
        this.file = event.target.files[0]; //un seul fichier à selectionner 
    }
    addSection() {
        this.sections.push({} as ISection); // on a préparé {} un espace vide pour la nouvelle section 
        const nextIndex = this.numbers.length + 1; 
        this.numbers = Array(nextIndex) // liste de section chaque section contient ses propres données
            .fill(0)
            .map((_, i) => i);
    }

    onTrainingDescriptionChange(content) {
        this.trainingDescription = content;// ici  le pére reçoit le  changement 
        //le pére prend changement et le met dans description training
    }
    async submit() {
        try {
            const imgTraining = await this.attachmentService.uploadFile(
                this.file //idAttachement dans la base de données
            );
            const training = {
                title: this.trainingTitle,
                description: this.trainingDescription,
                imgTraining,
                sections: this.sections.filter((section) => section.title),
            } as ITraining;

            this.trainingId = await this.trainingService.addTraining(training);
            this.open(this.trainingId);
        } catch {
            this.open(-1);
        }
    }

    open(courseId) {
        const modalRef = this.modalService.open(CourseCreationModalComponent);
        modalRef.componentInstance.courseId = courseId;
        modalRef.result.then(
            (result) => {
                this.getDismissReason(result);
            },
            (reason) => {
                this.getDismissReason(reason);
            }
        );
    }

    private getDismissReason(reason: any) {
        switch (reason) {
            case ModalDismissReasons.ESC:
            case ModalDismissReasons.BACKDROP_CLICK:
            case "Close":
            case "Cross":
                window.location.reload();
                break;
            case "Details":
                this.router.navigate([`/single-courses/${this.trainingId}`]);
                break;
            default:
                window.location.reload();
                break;
        }
    }
}

import { Component } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { CourseCreationModalComponent } from "../../common/course-creation-modal/course-creation-modal.component";
import { Select, Store } from "@ngxs/store";
import { TrainingManagementState } from "../../../store/";
import { Observable } from "rxjs";
import { ITraining } from "../../../models/training.model";
import { TrainingManagementActions } from "src/app/store/training-management/training.actions";

@Component({
    selector: "app-course-creation-page",
    templateUrl: "./course-creation-page.component.html",
    styleUrls: ["./course-creation-page.component.scss"],
})
export class CourseCreationPageComponent {
    constructor(
        private store: Store,
        private modalService: NgbModal,
        private router: Router
    ) {}

    @Select(TrainingManagementState.getTraining)
    training$: Observable<ITraining>;

    onSubmit() {
        this.store.dispatch(new TrainingManagementActions.SaveTraining(true));
        this.open(1);
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
                this.router.navigate([`/courses-grid`]);
                break;
            default:
                window.location.reload();
                break;
        }
    }
}

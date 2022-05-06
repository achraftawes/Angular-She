import { Component, OnInit } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ActivatedRoute, Router } from "@angular/router";
import { ITraining } from "../../../models/training.model";
import { CourseCreationModalComponent } from "../../common/course-creation-modal/course-creation-modal.component";
import { Select, Store } from "@ngxs/store";
import { TrainingManagementState } from "src/app/store";
import { Observable } from "rxjs";
import { TrainingManagementActions } from "src/app/store/training-management/training.actions";
import { TrainingService } from "src/app/services/training.service";
import { filter, map, take } from "rxjs/operators";

@Component({
    selector: "app-edit-training",
    templateUrl: "./edit-training.component.html",
    styleUrls: ["./edit-training.component.scss"],
})
export class EditTrainingComponent implements OnInit {
    constructor(
        private store: Store,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute,
        private trainingService: TrainingService
    ) {}

    async ngOnInit(): Promise<void> {
        const idTraining = await this.route.params
            .pipe(
                filter((params) => !!params["id-training"]),
                map((params) => params["id-training"]),
                take(1)
            )
            .toPromise();

        const training = (
            await this.trainingService.listTrainings().toPromise()
        ).find((training) => training.idTraining === +idTraining);

        this.store.dispatch(
            new TrainingManagementActions.SetTraining(training)
        );
    }

    @Select(TrainingManagementState.getTraining)
    training$: Observable<ITraining>;

    onSubmit() {
        this.store.dispatch(new TrainingManagementActions.SaveTraining(false));
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

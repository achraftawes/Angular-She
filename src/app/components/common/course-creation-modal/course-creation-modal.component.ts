import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
    selector: "app-course-creation-modal",
    templateUrl: "./course-creation-modal.component.html",
    styleUrls: [],
})
export class CourseCreationModalComponent {
    @Input("courseId") courseId;
    constructor(public activeModal: NgbActiveModal) {}
}

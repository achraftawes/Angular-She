import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../../services/training.service';

@Component({
  selector: 'app-courses-grid',
  templateUrl: './courses-grid.component.html',
  styleUrls: ['./courses-grid.component.scss']
})
export class CoursesGridPageComponent implements OnInit {

    constructor(private trainingService: TrainingService) { }
    public trainings: any[];

    async ngOnInit(): Promise<void> {
        this.trainings = await this.trainingService.listTrainings().toPromise() as any[];

        console.log(this.trainings)
    }

    public getLessonsNumber(training: any) {
        return training.sections.reduce((acc, section) => {
            acc += section.lession.length;
            return acc;
        }, 0);
    }

    public async getReview(training: any) {
        const review = await this.trainingService.getTrainingReview(training.idTraining).toPromise() as number;
        return Array(review).fill(0).map((_, i) => i);
    }

}

import { Component, OnInit } from '@angular/core';
import { TrainingService } from '../../../services/training.service';
import { ITraining } from '../../../models/training.model';

@Component({
  selector: 'app-courses-grid',
  templateUrl: './courses-grid.component.html',
  styleUrls: ['./courses-grid.component.scss']
})
export class CoursesGridPageComponent implements OnInit {

    constructor(private trainingService: TrainingService) { }
    public trainings: ITraining[];

    async ngOnInit(): Promise<void> {
        this.trainings = await this.trainingService.listTrainings();

        console.log(this.trainings)
    }

    public getLessonsNumber(training: ITraining) {
        return training.sections.reduce((acc, section) => {
            acc += section.lesson.length;
            return acc;
        }, 0);
    }

    public async getReview(training: any) {
        const review = await this.trainingService.getTrainingReview(training.idTraining) as number;
        return Array(review).fill(0).map((_, i) => i);
    }

}

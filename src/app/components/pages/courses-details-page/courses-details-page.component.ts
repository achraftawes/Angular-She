import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, take, tap } from 'rxjs/operators';
import { ITraining } from '../../../models/training.model';
import { TrainingService } from '../../../services/training.service';

@Component({
  selector: 'app-courses-details-page',
  templateUrl: './courses-details-page.component.html',
  styleUrls: ['./courses-details-page.component.scss']
})
export class CoursesDetailsPageComponent implements OnInit {
    public training: ITraining;

    constructor(private route: ActivatedRoute, private router: Router, private trainingService: TrainingService) { }

    async ngOnInit(): Promise<void> {
        const idTraining = await this.route.params.pipe(
            filter(params => !!params["id-training"]),
            map(params => params["id-training"]),
            take(1)
        ).toPromise();
        if (!idTraining) this.router.navigate(['courses-grid']);
        const training = (await this.trainingService.listTrainings()).find(({ idTraining: trainingId }) => trainingId === +idTraining);
        if (!training) this.router.navigate(['courses-grid']);
        this.training = training;
        console.log('training', training.sections[0])
    }

}

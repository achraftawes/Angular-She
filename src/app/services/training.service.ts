import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrainingService {

  constructor(private http: HttpClient) { }

  listTrainings() {
    return this.http.get('/training/retrieve-all-trainings')
    }
    getTrainingReview(id: number) {
        return this.http.get(`/training/reviewTotalTraining/${id}`);
     }

}
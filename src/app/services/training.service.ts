import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ITraining } from "../models/training.model";

@Injectable({ providedIn: "root" })
export class TrainingService {
    constructor(private http: HttpClient) {}

    listTrainings(): Promise<ITraining[]> {
        return this.http
            .get("/training/retrieve-all-trainings")
            .toPromise() as Promise<ITraining[]>;
    }
    getTrainingReview(id: number) {
        return this.http
            .get(`/training/reviewTotalTraining/${id}`)
            .toPromise() as Promise<number>;
    }

    addTraining(training: ITraining): Promise<ITraining> {
        return this.http
            .post("/training/add-training", training)
            .toPromise() as Promise<ITraining>;
    }
}

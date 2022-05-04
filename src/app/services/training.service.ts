import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ITraining } from "../models/training.model";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class TrainingService {
    constructor(private http: HttpClient) {}

    listTrainings(): Observable<ITraining[]> {
        return this.http.get("/training/retrieve-all-trainings") as Observable<
            ITraining[]
        >;
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

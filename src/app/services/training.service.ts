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

    updateTraining(training: ITraining): Promise<string> {
        return this.http
            .put(`/training/updateTraining/${training.idTraining}`, training, {
                responseType: "text",
            })
            .toPromise() as Promise<string>;
    }

    isEnrolledToTraining(id: number): Promise<boolean> {
        return this.http
            .get(`/training/enrolled-to-training/${id}`)
            .toPromise() as Promise<boolean>;
    }

    enrollToTraining(id: number): Promise<string> {
        return this.http
            .put(
                `/training/enroll-to-training/${id}`,
                {},
                { responseType: "text" }
            )
            .toPromise() as Promise<string>;
    }
}

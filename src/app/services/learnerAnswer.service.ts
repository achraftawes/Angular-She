import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface IUserAnswer {
    question: number;
    answerIndex: number;
}

@Injectable({ providedIn: "root" })
export class LearnerAnswerService {
    constructor(private http: HttpClient) {}

    answerQuiz(quizId: number, answer: IUserAnswer[]) {
        return this.http
            .post(`/learner-answer/answer-quiz/${quizId}`, answer)
            .toPromise();
    }
}

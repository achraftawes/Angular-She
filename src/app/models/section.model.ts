import { ILesson } from "./lesson.model";
import { IQuiz } from "./quiz.model";

export interface ISection {
    idSection: number;
    title: string;
    lesson: ILesson[];
    quiz: IQuiz;
}

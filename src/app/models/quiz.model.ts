import { IQuestion } from './question.model';
export interface IQuiz {
    id: number;
    name: string;
    questions: IQuestion[];

}

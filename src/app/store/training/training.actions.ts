export namespace TrainingActions {
    export class GetAll {
        static readonly type = "[Training] GetAll";
    }

    export class SelectTraining {
        static readonly type = "[Training] SelectTraining";
        constructor(public trainingId: number) {}
    }

    export class SelectLesson {
        static readonly type = "[Training] SelectLesson";
        constructor(public lessonId: number) {}
    }

    export class SelectQuiz {
        static readonly type = "[Training] SelectQuiz";
        constructor(public quizId: number) {}
    }

    export class AnswerQuestion {
        static readonly type = "[Training] AnswerQuestion";
        constructor(public questionId: number, public answerIndex: number) {}
    }

    export class SubmitAnswer {
        static readonly type = "[Training] SubmitAnswer";
    }
}

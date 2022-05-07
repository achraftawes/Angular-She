export namespace QuizActions {
    export class AddQuestion {
        static readonly type = "[Quiz] AddQuestion";
        constructor(public quizId: number) {}
    }

    export class EditQuestion {
        static readonly type = "[Quiz] EditQuestion";
        constructor(public questionId: number, public question: string) {}
    }

    export class EditChoiceA {
        static readonly type = "[Quiz] EditChoiceA";
        constructor(public questionId: number, public choiceA: string) {}
    }

    export class EditChoiceB {
        static readonly type = "[Quiz] EditChoiceB";
        constructor(public questionId: number, public choiceB: string) {}
    }

    export class EditChoiceC {
        static readonly type = "[Quiz] EditChoiceC";
        constructor(public questionId: number, public choiceC: string) {}
    }

    export class EditCorrectAnswer {
        static readonly type = "[Quiz] EditCorrectAnswer";
        constructor(public questionId: number, public correctAnswer: number) {}
    }
}

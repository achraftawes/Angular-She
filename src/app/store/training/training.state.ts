import { State, Action, StateContext, Selector } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { TrainingActions } from "./training.actions";
import { ITraining } from "../../models/training.model";
import { TrainingService } from "../../services/training.service";
import GetAll = TrainingActions.GetAll;
import SelectTraining = TrainingActions.SelectTraining;
import SelectLesson = TrainingActions.SelectLesson;
import SelectQuiz = TrainingActions.SelectQuiz;
import AnswerQuestion = TrainingActions.AnswerQuestion;
import SubmitAnswer = TrainingActions.SubmitAnswer;
import { LearnerAnswerService } from "src/app/services/learnerAnswer.service";

export interface TrainingStateModel {
    trainingsList: ITraining[];
    selectedTraining: number;
    selectedLesson: number;
    selectedQuiz: number;
    userAnswers: Record<number, number>;
    answerSubmitted: boolean;
}

@State<TrainingStateModel>({
    name: "Training",
    defaults: {
        trainingsList: [],
        selectedTraining: null,
        selectedLesson: null,
        selectedQuiz: null,
        userAnswers: {},
        answerSubmitted: false,
    },
})
@Injectable()
export class TrainingState {
    constructor(
        private trainingService: TrainingService,
        private learnerAnswerService: LearnerAnswerService
    ) {}

    @Selector()
    static allTrainings(state: TrainingStateModel) {
        return state.trainingsList;
    }

    @Selector()
    static answerSubmitted(state: TrainingStateModel) {
        return state.answerSubmitted;
    }

    @Selector()
    static selectedTraining(state: TrainingStateModel) {
        const selectedTraining = state.trainingsList.find(
            ({ idTraining }) => idTraining === state.selectedTraining
        );
        return selectedTraining;
    }

    @Selector()
    static selectedLesson(state: TrainingStateModel) {
        const { selectedLesson } = state;
        if (!selectedLesson) return null;
        const selectedTraining = state.trainingsList.find(
            ({ idTraining }) => idTraining === state.selectedTraining
        );
        return (
            selectedTraining.sections
                .reduce((acc, { lesson }) => {
                    acc.push(...lesson);
                    return acc;
                }, [])
                .find(({ idLesson }) => idLesson === selectedLesson) || null
        );
    }

    @Selector()
    static selectedQuiz(state: TrainingStateModel) {
        const { selectedQuiz } = state;
        if (!selectedQuiz) return null;
        const selectedTraining = state.trainingsList.find(
            ({ idTraining }) => idTraining === state.selectedTraining
        );
        return (
            selectedTraining.sections.find(
                ({ quiz: { id } }) => id === selectedQuiz
            ).quiz || null
        );
    }

    @Action(GetAll)
    getAllTraining({ patchState }: StateContext<TrainingStateModel>) {
        this.trainingService
            .listTrainings()
            .subscribe((trainingsList) => patchState({ trainingsList }));
    }

    @Action(SelectTraining)
    selectTraining(
        { patchState, dispatch, getState }: StateContext<TrainingStateModel>,
        { trainingId }
    ) {
        let { trainingsList } = getState();
        console.log("inside med", trainingId);

        if (!trainingsList.length) {
            dispatch(new GetAll());
            ({ trainingsList } = getState());
            console.log("inside med", trainingId);
        }
        patchState({ selectedTraining: trainingId });
    }

    @Action(SelectLesson)
    selectLesson({ patchState }, { lessonId }) {
        patchState({
            selectedLesson: lessonId,
            selectedQuiz: null,
            answerSubmitted: false,
        });
    }

    @Action(SelectQuiz)
    selectQuiz({ patchState }, { quizId }) {
        patchState({
            selectedLesson: null,
            selectedQuiz: quizId,
            answerSubmitted: false,
        });
    }

    @Action(AnswerQuestion)
    answerQuestion({ patchState, getState }, { questionId, answerIndex }) {
        const { userAnswers } = getState();
        patchState({
            userAnswers: { ...userAnswers, [questionId]: answerIndex },
            answerSubmitted: false,
        });
    }

    @Action(SubmitAnswer)
    async submitAnswer({ patchState, getState }) {
        patchState({ answerSubmitted: false });
        const { userAnswers, selectedQuiz, selectedTraining, trainingsList } =
            getState();
        const quizId = selectedQuiz;
        const training = trainingsList.find(
            ({ idTraining }) => idTraining === selectedTraining
        );
        const quiz = training.sections.find(
            ({ quiz: { id } }) => id === selectedQuiz
        ).quiz;

        const answers = quiz.questions.map(({ id }) => ({
            question: id as number,
            answerIndex: userAnswers[id] as number,
        }));
        await this.learnerAnswerService.answerQuiz(quizId, answers);
        patchState({ answerSubmitted: true });
    }
}

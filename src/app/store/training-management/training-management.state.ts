import { State, Action, Selector, StateContext } from "@ngxs/store";
import { Injectable } from "@angular/core";
import { patch, append, updateItem } from "@ngxs/store/operators";

import { SectionActions } from "./section.actions";
import { LessonActions } from "./lesson.actions";
import { ILesson } from "../../models/lesson.model";
import { ISection } from "../../models/section.model";
import { ITraining } from "../../models/training.model";
import { TrainingManagementActions } from "./training.actions";
import { QuizActions } from "./quiz.actions";
import { IQuestion } from "../../models/question.model";
import { TrainingService } from "../../services/training.service";

type TrainingManagement = Pick<
    ITraining,
    "title" | "sections" | "description" | "imgTraining"
>;
@State<TrainingManagement>({
    name: "TrainingManagement",
    defaults: {
        title: "",
        sections: [] as ISection[],
        description: "",
        imgTraining: null,
    },
})
@Injectable()
export class TrainingManagementState {
    constructor(private trainingService: TrainingService) {}

    @Selector()
    static getTraining(state: TrainingManagement) {
        return state;
    }

    deepCopy(obj: any) {
        return JSON.parse(JSON.stringify(obj));
    }

    // training management
    @Action(TrainingManagementActions.SetTraining)
    setTraining(
        { setState }: StateContext<TrainingManagement>,
        { training }: TrainingManagementActions.SetTraining
    ) {
        setState(training);
    }

    @Action(TrainingManagementActions.EditTitle)
    editTitle({ patchState }, { title }) {
        patchState({ title });
    }

    @Action(TrainingManagementActions.EditDescription)
    editDescription({ patchState }, { description }) {
        patchState({ description });
    }

    @Action(TrainingManagementActions.EditImgTraining)
    editImgTraining({ patchState }, { imgTraining }) {
        patchState({ imgTraining });
    }

    @Action(TrainingManagementActions.SaveTraining)
    async saveTraining(
        { getState },
        { isNew }: TrainingManagementActions.SaveTraining
    ) {
        const training = getState();
        if (isNew) {
            return this.trainingService.addTraining(training);
        }
        return this.trainingService.updateTraining(training);
    }

    // Section management
    @Action(SectionActions.AddSection)
    editSection(ctx: StateContext<TrainingManagement>) {
        const nextId = ctx.getState().sections.length;
        const newSection: ISection = {
            idSection: nextId,
            title: "",
            quiz: {
                id: nextId,
                name: "",
                questions: [],
            },
            lesson: [],
        };
        ctx.setState(
            patch({
                sections: append<ISection>([newSection]),
            })
        );
    }

    @Action(SectionActions.EditTitle)
    editSectionTitle(
        ctx: StateContext<TrainingManagement>,
        { idSection, title }: SectionActions.EditTitle
    ): void {
        const section = ctx
            .getState()
            .sections.find((section) => section.idSection === idSection);

        const updatedSection: ISection = {
            ...section,
            title,
        };
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    // Quiz management
    @Action(QuizActions.AddQuestion)
    addQuestion(
        ctx: StateContext<TrainingManagement>,
        { quizId }: QuizActions.AddQuestion
    ): void {
        const section = ctx
            .getState()
            .sections.find((section) => section.quiz.id === quizId);
        const { idSection } = section;
        const questionsCount = ctx
            .getState()
            .sections.reduce((acc, section) => {
                acc += section.quiz.questions.length;
                return acc;
            }, 0);
        const nextId = questionsCount + 1;
        const newQuestion: IQuestion = {
            id: nextId,
            question: "",
            choiceA: "",
            choiceB: "",
            choiceC: "",
            correctAnswer: -1,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.quiz.questions.push(newQuestion);
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    @Action(QuizActions.EditQuestion)
    editQuestion(
        ctx: StateContext<TrainingManagement>,
        { questionId, question }: QuizActions.EditQuestion
    ): void {
        const section = ctx
            .getState()
            .sections.find((section) =>
                section.quiz.questions.find(({ id }) => id === questionId)
            );
        const { idSection } = section;
        const questionIndex = section.quiz.questions.findIndex(
            ({ id }) => id === questionId
        );
        const updatedQuestion = {
            ...section.quiz.questions[questionIndex],
            question,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.quiz.questions[questionIndex] = updatedQuestion;
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    @Action(QuizActions.EditChoiceA)
    editChoiceA(
        ctx: StateContext<TrainingManagement>,
        { questionId, choiceA }: QuizActions.EditChoiceA
    ): void {
        const section = ctx
            .getState()
            .sections.find((section) =>
                section.quiz.questions.find(({ id }) => id === questionId)
            );
        const { idSection } = section;
        const questionIndex = section.quiz.questions.findIndex(
            ({ id }) => id === questionId
        );
        const updatedQuestion = {
            ...section.quiz.questions[questionIndex],
            choiceA,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.quiz.questions[questionIndex] = updatedQuestion;
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    @Action(QuizActions.EditChoiceB)
    editChoiceB(
        ctx: StateContext<TrainingManagement>,
        { questionId, choiceB }: QuizActions.EditChoiceB
    ): void {
        const section = ctx
            .getState()
            .sections.find((section) =>
                section.quiz.questions.find(({ id }) => id === questionId)
            );
        const { idSection } = section;
        const questionIndex = section.quiz.questions.findIndex(
            ({ id }) => id === questionId
        );
        const updatedQuestion = {
            ...section.quiz.questions[questionIndex],
            choiceB,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.quiz.questions[questionIndex] = updatedQuestion;
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    @Action(QuizActions.EditChoiceC)
    editChoiceC(
        ctx: StateContext<TrainingManagement>,
        { questionId, choiceC }: QuizActions.EditChoiceC
    ): void {
        const section = ctx
            .getState()
            .sections.find((section) =>
                section.quiz.questions.find(({ id }) => id === questionId)
            );
        const { idSection } = section;
        const questionIndex = section.quiz.questions.findIndex(
            ({ id }) => id === questionId
        );
        const updatedQuestion = {
            ...section.quiz.questions[questionIndex],
            choiceC,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.quiz.questions[questionIndex] = updatedQuestion;
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    @Action(QuizActions.EditCorrectAnswer)
    editCorrectAnswer(
        ctx: StateContext<TrainingManagement>,
        { questionId, correctAnswer }: QuizActions.EditCorrectAnswer
    ): void {
        const section = ctx
            .getState()
            .sections.find((section) =>
                section.quiz.questions.find(({ id }) => id === questionId)
            );
        const { idSection } = section;
        const questionIndex = section.quiz.questions.findIndex(
            ({ id }) => id === questionId
        );
        const updatedQuestion = {
            ...section.quiz.questions[questionIndex],
            correctAnswer,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.quiz.questions[questionIndex] = updatedQuestion;
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    // Lesson management
    @Action(LessonActions.Add)
    addLesson(
        ctx: StateContext<TrainingManagement>,
        { idSection }: LessonActions.Add
    ): void {
        const section = ctx
            .getState()
            .sections.find((section) => section.idSection === idSection);
        const lessonCount = ctx.getState().sections.reduce((acc, section) => {
            acc += section.lesson.length;
            return acc;
        }, 0);
        const nextId = lessonCount + 1;
        const newLesson: ILesson = {
            idLesson: nextId,
            title: "",
            content: "",
            url_video: null,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.lesson.push(newLesson);
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    @Action(LessonActions.EditTitle)
    editLessonTitle(
        ctx: StateContext<TrainingManagement>,
        { idLesson, title }: LessonActions.EditTitle
    ): void {
        const sections = ctx.getState().sections;
        const section = sections.find(({ lesson }) =>
            lesson.find((l) => l.idLesson === idLesson)
        );
        const { idSection } = section;
        const lessonIndex = section.lesson.findIndex(
            (l) => l.idLesson === idLesson
        );
        const lesson = section.lesson[lessonIndex];

        const updatedLesson: ILesson = {
            ...lesson,
            title,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.lesson[lessonIndex] = updatedLesson;
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    @Action(LessonActions.EditContent)
    editLessonContent(
        ctx: StateContext<TrainingManagement>,
        { idLesson, content }: LessonActions.EditContent
    ): void {
        const sections = ctx.getState().sections;
        const section = sections.find(({ lesson }) =>
            lesson.find((l) => l.idLesson === idLesson)
        );
        const { idSection } = section;
        const lessonIndex = section.lesson.findIndex(
            (l) => l.idLesson === idLesson
        );
        const lesson = section.lesson[lessonIndex];

        const updatedLesson: ILesson = {
            ...lesson,
            content,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.lesson[lessonIndex] = updatedLesson;
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }

    @Action(LessonActions.EditUrlVideo)
    editLessonUrlVideo(
        ctx: StateContext<TrainingManagement>,
        { idLesson, urlVideo }: LessonActions.EditUrlVideo
    ): void {
        const sections = ctx.getState().sections;
        const section = sections.find(({ lesson }) =>
            lesson.find((l) => l.idLesson === idLesson)
        );
        const { idSection } = section;
        const lessonIndex = section.lesson.findIndex(
            (l) => l.idLesson === idLesson
        );
        const lesson = section.lesson[lessonIndex];

        const updatedLesson: ILesson = {
            ...lesson,
            url_video: urlVideo,
        };
        const updatedSection = this.deepCopy(section);
        updatedSection.lesson[lessonIndex] = updatedLesson;
        ctx.setState(
            patch({
                sections: updateItem<ISection>(
                    (section) => section.idSection === idSection,
                    updatedSection
                ),
            })
        );
    }
}

import { IAttachment } from "../../models/attachment.model";
export namespace LessonActions {
    export class Add {
        static readonly type = "[Lesson] Add";
        constructor(public idSection: number) {}
    }

    export class EditTitle {
        static readonly type = "[Lesson] EditTitle";
        constructor(public idLesson: number, public title: string) {}
    }

    export class EditContent {
        static readonly type = "[Lesson] EditContent";
        constructor(public idLesson: number, public content: string) {}
    }

    export class EditUrlVideo {
        static readonly type = "[Lesson] EditUrlVideo";
        constructor(public idLesson: number, public urlVideo: IAttachment) {}
    }
}

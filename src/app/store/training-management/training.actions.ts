import { IAttachment } from "src/app/models/attachment.model";
import { ITraining } from "src/app/models/training.model";

export namespace TrainingManagementActions {
    export class Add {
        static readonly type = "[Training] Add";
    }

    export class SetTraining {
        static readonly type = "[Training] SetTraining";
        constructor(public training: ITraining) {}
    }

    export class EditTitle {
        static readonly type = "[Training] EditTitle";
        constructor(public title: string) {}
    }

    export class EditDescription {
        static readonly type = "[Training] EditDescription";
        constructor(public description: string) {}
    }

    export class EditImgTraining {
        static readonly type = "[Training] EditImgTraining";
        constructor(public imgTraining: IAttachment) {}
    }

    export class SaveTraining {
        static readonly type = "[Training] SaveTraining";
        constructor(public isNew: boolean = true) {}
    }
}

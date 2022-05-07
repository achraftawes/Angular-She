export namespace SectionActions {
    export class AddSection {
        static readonly type = "[Section] AddSection";
    }

    export class EditTitle {
        static readonly type = "[Section] EditTitle";
        constructor(public idSection: number, public title: string) {}
    }
}

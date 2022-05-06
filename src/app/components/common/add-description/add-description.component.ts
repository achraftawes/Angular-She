import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-add-description",
    templateUrl: "./add-description.component.html",
    styleUrls: ["./add-description.component.scss"],
})
export class AddDescriptionComponent implements OnInit {
    public options;

    @Input() value: string;

    @Output() contentChange = new EventEmitter<string>();

    constructor() {
        this.options = {
            usingFontAwesome5: true,
            enablePreviewContentClick: true, // Allow user fire the click event on the preview panel, like href etc. Default is false
            resizable: true, // Allow resize the editor
        };
    }
    onChange(event) {
        this.contentChange.emit(event.target.value);
    }
    ngOnInit(): void {
        this.onChange.bind(this);
    }
}

import { Component, EventEmitter, OnInit, Output } from "@angular/core";

interface UploadResult {
    isImg: boolean;
    name: string;
    url: string;
}

@Component({
    selector: "app-add-description",
    templateUrl: "./add-description.component.html",
    styleUrls: ["./add-description.component.scss"],
})
export class AddDescriptionComponent implements OnInit {
    public options;

    public content;
    @Output() contentChange = new EventEmitter<string>();

    constructor() {
        this.options = {
            usingFontAwesome5: true,
            enablePreviewContentClick: true, // Allow user fire the click event on the preview panel, like href etc. Default is false
            resizable: true, // Allow resize the editor
        };
    }
    onChange() {
        this.contentChange.emit(this.content);
    }
    ngOnInit(): void {
        this.onChange.bind(this);
    }
}

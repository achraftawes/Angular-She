import { Component, OnInit } from '@angular/core';
import { ITraining } from '../../../models/training.model';
import { TrainingService } from '../../../services/training.service';

interface UploadResult {
  isImg: boolean
  name: string
  url: string
}

@Component({
  selector: 'app-course-creation-page',
  templateUrl: './course-creation-page.component.html',
  styleUrls: ['./course-creation-page.component.scss']
})
export class CourseCreationPageComponent implements OnInit {
    public training: ITraining;
    public options: any;

    constructor(private trainingService: TrainingService) {
        this.doUpload = this.doUpload.bind(this);  // This is very important.
        this.options = {
            usingFontAwesome5: true,
            enablePreviewContentClick: true,  // Allow user fire the click event on the preview panel, like href etc. Default is false
            resizable: true      // Allow resize the editor
        }
     }

    doUpload(files: Array<File>): Promise<Array<UploadResult>> {
    // do upload file by yourself
    return Promise.resolve([{ name: 'xxx', url: 'xxx.png', isImg: true }]);
    }


    async ngOnInit(): Promise<void> {
    }

}

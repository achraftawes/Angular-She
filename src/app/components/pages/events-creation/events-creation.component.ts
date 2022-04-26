import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { EventService } from '../../../services/event.service';
@Component({
  selector: 'app-events-creation',
  templateUrl: './events-creation.component.html',
  styleUrls: ['./events-creation.component.scss']
})
export class EventsCreationComponent implements OnInit {
  public events: any;
  currentFileUpload;
  submitted = false;
  registerForm: FormGroup;
  constructor(private eventService: EventService) { }

  ngOnInit(): void {
    this.listEvents();

      this.events = {
        id_charity: null,
        description: null,
        date_event : null,
        adress : null,
        numberattendees : null,
        
      }
    }
    listEvents(){
      this.eventService.listEvents().subscribe(res => this.events=res);
    
  }
  onSubmit(value) {
    value.photo = this.currentFileUpload;
    this.submitted = true;
        
    if (this.registerForm.invalid) {
            return;
        } else {
            this.onSavePost(value);
        }
    }
    onSavePost(value) {
      this.eventService.addEvent(value).subscribe();

  }
  addEvent(c:any ){
    this.eventService.addEvent(c).subscribe(() => {
      this.listEvents();
      
    })
  }

}

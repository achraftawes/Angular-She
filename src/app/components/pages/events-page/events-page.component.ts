import { Component, OnInit } from '@angular/core';
import { Charityevent } from 'src/app/models/Charityevent.model';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-events-page',
  templateUrl: './events-page.component.html',
  styleUrls: ['./events-page.component.scss']
})
export class EventsPageComponent implements OnInit {
  public events: any;
  constructor(private eventService: EventService) { }
   

    ngOnInit(): void {

      this.events=this.listEvents();

    /*  this.events = {
        id_charity: null,
        description: null,
        date_event : null,
        adress : null,
        numberattendees : null,
        imageEvent : null
      }*/
    }
    listEvents(){
  this.eventService.listEvents().subscribe(res => this.events=res);

}}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Charityevent } from '../models/Charityevent.model';

@Injectable({ providedIn: 'root' })
export class EventService {

  constructor(private http: HttpClient) { }

  listEvents() {
    return this.http.get('/charityevent/retrieve-events')
    }
    addEvent(data){
      return this.http.post('/charityevent/add_event',data)
    }
    
}
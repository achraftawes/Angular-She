import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import Pusher from 'pusher-js';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
    username = 'username';
    message = '';
    messages = [];

    constructor(private http: HttpClient) {
    }

    ngOnInit(): void {
        Pusher.logToConsole = true;

        const pusher = new Pusher('c8ee3312046c619611d4', {
            cluster: 'eu'
        });

        const channel = pusher.subscribe('chat');
        channel.bind('message', data => {
            this.messages.push(data);
        });
    }

    submit(): void {
        this.http.post('http://localhost:8086/SheApp/add-Chat', {
            sendTo: this.username,
            text: this.message
        }).subscribe(() => this.message = '');
    }
}

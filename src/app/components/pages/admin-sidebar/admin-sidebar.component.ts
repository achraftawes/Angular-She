import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-sidebar',
  templateUrl: './admin-sidebar.component.html',
  styleUrls: ['./admin-sidebar.component.scss']
})
export class AdminSidebarComponent implements OnInit {
user : User;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.userService.getUserByUsername(sessionStorage.getItem('username')).subscribe(
(response : User)=>{
  console.log("resp =   "+ response)
  this.user = response;
}
    )
  }

}

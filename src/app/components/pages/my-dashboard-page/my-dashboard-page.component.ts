import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-dashboard-page',
  templateUrl: './my-dashboard-page.component.html',
  styleUrls: ['./my-dashboard-page.component.scss']
})
export class MyDashboardPageComponent implements OnInit {

  constructor(private userService: UserService) { }
    public users: any[];

    async ngOnInit(): Promise<void> {
        this.users = await this.userService.getAllUsers().toPromise() as any[];

        console.log(this.users);

}
}

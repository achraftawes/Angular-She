import { Component, OnInit } from '@angular/core';
import {AppointementService} from "../../../services/appointements/appointement.service";
import {Appointement} from "../../../models/Appointement.model";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointements',
  templateUrl: './appointements.component.html',
  styleUrls: ['./appointements.component.scss']
})
export class AppointementsComponent implements OnInit {

  list : Appointement [] = [];
  id;
itemToSearch="";
  constructor(private as : AppointementService, private router: Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
      this.as.FilterAppointementByDateDesc().subscribe(
          (data: Appointement [])=> {
              this.list = data

          }, (err)=>{
              console.log(err);
          }
      )
  }

 deleteAppointement(appointement: Appointement){
      this.as.deleteAppointement(appointement).subscribe(
          (data)=> {
             Swal.fire(
          'Success!',
          'Appointement deleted Successfully!',
          'success',
          ).then(() => {
            this.router.navigateByUrl('/downloads');
            location.reload();
          });

          }, (err)=>{
              console.log(err);
          }
      )
  }

   cancelAppointement(id: number){
      this.as.cancelAppointement(id).subscribe(
          (data)=> {
                Swal.fire(
          'Success!',
          'Appointement Canceled Successfully!',
          'success',
          ).then(() => {
            this.router.navigateByUrl('/downloads');
            location.reload();
          });
          }, (err)=>{
              console.log(err);
          }
      )
  }

}

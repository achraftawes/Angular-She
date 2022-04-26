import { Component, OnInit } from '@angular/core';
import {AppointementService} from "../../../services/appointements/appointement.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { Appointement } from 'src/app/models/Appointement.model';

@Component({
  selector: 'app-takeappointement',
  templateUrl: './takeappointement.component.html',
  styleUrls: ['./takeappointement.component.scss']
})
export class TakeappointementComponent implements OnInit {

     takeA : Appointement = new Appointement();
     id=1;
    form_appointement : FormGroup;
  constructor(private as : AppointementService, private router : Router) {
      this.form_appointement = new FormGroup(
          {
              dateAppointement : new FormControl('',[Validators.required]),
              observation : new FormControl('',[Validators.required]),
              etat : new FormControl('',[Validators.required]),
          }
      )
  }

  ngOnInit(): void {
  }

    get dateAppointement() {
    return this.form_appointement.get('dateAppointement');
  }
  get observation() {
    return this.form_appointement.get('observation');
  }
  get etat() {
    return this.form_appointement.get('etat');
  }

  onConfirmAppointment(){
      
      this.as.addAppointement(this.takeA,1).subscribe(
          (res)=> {
               this.router.navigateByUrl('/downloads')},  (error => console.log(error))
      );
  }

}

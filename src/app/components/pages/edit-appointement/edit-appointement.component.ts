import { Component, OnInit } from '@angular/core';
import {Appointement} from "../../../models/Appointement.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppointementService} from "../../../services/appointements/appointement.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-appointement',
  templateUrl: './edit-appointement.component.html',
  styleUrls: ['./edit-appointement.component.scss']
})
export class EditAppointementComponent implements OnInit {
     takeA : Appointement = new Appointement();
     id ;
    form_appointement : FormGroup;
  constructor(private as : AppointementService, private router : Router,private route : ActivatedRoute) {
      this.form_appointement = new FormGroup(
          {
              dateAppointement : new FormControl('',[Validators.required]),
              observation : new FormControl('',[Validators.required]),
              etat : new FormControl('',[Validators.required]),
          }
      )
  }

  ngOnInit(): void {
       this.id = this.route.snapshot.params["id"];
         this.as.getAppointementByID(this.id).subscribe(data=>{
      this.takeA = data;
    }, error => console.log(error)
    )

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

      this.as.updateAppointement(this.takeA,this.id).subscribe(
          (res)=> {

              this.router.navigateByUrl('/downloads')
              },
               (error => console.log(error))
      );
  }

}

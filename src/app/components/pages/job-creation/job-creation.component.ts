import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobOffers } from 'src/app/models/JobOffers.model';
import { JobOffersService } from 'src/app/services/JobOffers.service';


@Component({
  selector: 'app-job-creation',
  templateUrl: './job-creation.component.html',
  styleUrls: ['./job-creation.component.scss']
})
export class JobCreationComponent implements OnInit {
offre :JobOffers=new JobOffers()
offreForm:FormGroup
  constructor(public formBuilder:FormBuilder,private joboffreservice:JobOffersService,private router:Router) { }

  ngOnInit(): void {
    this.offreForm=this.formBuilder.group({
      
      hire_date:['', [Validators.required]],
      termination_date:['', [Validators.required]],
      description:['', [Validators.required]],
      type:['', [Validators.required]],
      job_salary:['', [Validators.required]],
      categorie:['', [Validators.required]],
    })
  }
  get getControl(){
    return this.offreForm.controls;
  }
  onSubmit(){
    this.offre.description=this.offreForm.value.description;
    this.offre.hire_date=this.offreForm.value.hire_date;
    this.offre.termination_date=this.offreForm.value.termination_date;

    this.offre.type=this.offreForm.value.type;
    this.offre.job_salary=this.offreForm.value.job_salary;
    this.offre.categorie=this.offreForm.value.categorie;
    this.save();

  }
  save() {
    console.log(this.offre);

    this.joboffreservice.creat(this.offre).subscribe(data=>{
      // this.router.navigate(['liste']);
      console.log(data);
    },error=>console.log(error));
  }
}

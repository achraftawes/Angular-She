import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { JobOffers } from '../models/JobOffers.model';
import { JobOffersService } from '../services/JobOffers.service';

@Component({
  selector: 'app-update-offre',
  templateUrl: './update-offre.component.html',
  styleUrls: ['./update-offre.component.scss']
})
export class UpdateOffreComponent implements OnInit {
  offre :JobOffers=new JobOffers()
  offreForm:FormGroup
  id:any
  constructor(private route:ActivatedRoute, public formBuilder:FormBuilder,private joboffreservice:JobOffersService,private router:Router) { }

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"]
   
    this.offreForm=this.formBuilder.group({
      
      hire_date:['', [Validators.required]],
      termination_date:['', [Validators.required]],
      description:['', [Validators.required]],
      type:['', [Validators.required]],
      job_salary:['', [Validators.required]],
      categorie:['', [Validators.required]],
    })
    this.joboffreservice.getByid(this.id).subscribe(data=>{
      this.offreForm.patchValue(data);
    },error=>console.log(error));
  }
  get getControl(){
    return this.offreForm.controls;
  }

  onSubmitt(){
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

    this.joboffreservice.update(this.offre).subscribe(data=>{
    
      this.router.navigate(['gallery']);
      console.log(data);
    },error=>console.log(error));
  }
}

// onSubmit(){
// console.log(this.firstname)
// var user = new User()
// user.firstname = this.firstname;
// console.log(user.firstname);
// user.lastname = this.lastname;
// user.image = this.img;
// user.username = this.editUser.value.username;
// user.email = this.editUser.value.email;
// user.password = this.editUser.value.password;

// user.typeuser = this.editUser.value.typeuser;
// user.userId=this.userIdToEdit;
// console.log(user)
// this.userService.updateUser(user).subscribe(data=>{
//   this.router.navigate(["listusers"])
//   console.log(data);
// },error=>console.log(error));

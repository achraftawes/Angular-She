import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Role } from 'src/app/model/role.model';
import { RegistrationService } from "src/app/services/registration.service";
import { User } from "../../../model/user.model";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  registrationForm: FormGroup;
    user = new User('', '', '','','',
    '',false,null,null,'', null,null);
    isRegistered = false;
    submitted = false;
    errorMessage = '';
    role :Role;
    RolesList : Role[];

    constructor(private registrationService: RegistrationService){ }
    ngOnInit() {
        this.registrationForm = new FormGroup({
           firstName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
           lastName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
           userName: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
           email: new FormControl(null, [Validators.required, Validators.email]),
           pwd: new FormControl(null, [Validators.required, Validators.minLength(8)]),
           id_role : new FormControl(null,[Validators.required])});
           this.getRoles();
        
    }



    onSubmit(){
        this.submitted = true;
        this.user.firstName = this.registrationForm.value.firstName;
        this.user.lastName = this.registrationForm.value.lastName;
        this.user.userName = this.registrationForm.value.userName;
        this.user.email = this.registrationForm.value.email;
        this.user.pwd = this.registrationForm.value.pwd;
        this.user.role = this.role;
        this.registerUser()
        this.registrationForm.reset();
    }
    registerUser(){
        this.registrationService.signup(this.user)
        .subscribe(user=> {
            console.log(user);
            this.isRegistered = true;
        }, error=> {
            console.log(error);
            this.errorMessage = error;
            this.isRegistered = false;
        });
    }

    onSelectRole(id_role : string){
      this.registrationService.findRoleById(id_role).subscribe(
        response => {

          this.role = response;
        }
      )
      console.log("role = "+ this.role);
      console.log("role id= "+ id_role);

    }


    getRoles(){
      this.registrationService.findRoles().subscribe(
        response => {
          console.log(response)
          this.RolesList = response;
        }
      )
      console.log("roles = "+ this.RolesList);

    }


}
import { Component, Inject, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { Role } from 'src/app/model/role.model';
import { RegistrationService } from "src/app/services/registration.service";
import { User } from "../../../model/user.model";
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
selector: 'app-dialog',
templateUrl: './dialog.component.html',
styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
hide = true;
registrationForm: FormGroup;
  user = new User('', '', '','','',
  '',false,null,null,'', null,null);
  isRegistered = false;
  submitted = false;
  errorMessage = '';
  role :Role;
  RolesList : Role[];
  actionBtn: string = "Save";
  title : string = "Add user form";

  constructor(private registrationService: RegistrationService, 
    private userService : UserService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef : MatDialogRef<DialogComponent>){ }
  ngOnInit() {
      this.registrationForm = new FormGroup({
          firstName: new FormControl(null, [Validators.required]),
          lastName: new FormControl(null, [Validators.required]),
          userName: new FormControl(null, [Validators.required]),
          email: new FormControl(null, [Validators.required,Validators.email]),
          pwd: new FormControl(null, [Validators.required]),
          id_role : new FormControl(null,[Validators.required])});
          this.getRoles();

          if(this.editData){
            this.actionBtn = "Update"
            this.title="Edit user form"
            console.log(this.editData)
            this.registrationForm.controls['firstName'].setValue(this.editData.firstName)
            this.registrationForm.controls['lastName'].setValue(this.editData.lastName)
            this.registrationForm.controls['userName'].setValue(this.editData.userName)
            this.registrationForm.controls['email'].setValue(this.editData.email)
            //this.registrationForm.controls['pwd'].setValue(this.editData.pwd)
            this.registrationForm.controls['id_role'].setValue(this.editData.role.id)
            this.registrationService.findRoleById(this.editData.role.id).subscribe(
              response => {
                this.role = response;
              }
            )
          }
      
  }

  onSubmit(){
    this.submitted = true;
    console.log("on submit")
    console.log(this.registrationForm.valid)

    if(this.registrationForm.valid){
      this.user.firstName = this.registrationForm.value.firstName;
      this.user.lastName = this.registrationForm.value.lastName;
      this.user.userName = this.registrationForm.value.userName;
      this.user.email = this.registrationForm.value.email;
      this.user.pwd = this.registrationForm.value.pwd;
      this.user.role = this.role;
      console.log("submitting user")

      if(!this.editData){
        this.registerUser()
      }else{
        console.log("updating user")
        this.updateUser()
      }
    }
  
}

registerUser(){
    this.registrationService.signup(this.user)
    .subscribe(user=> {
      alert("User added successfully")
      this.registrationForm.reset;
      this.dialogRef.close('save');
      this.isRegistered = true;
    }, error=> {
        alert("Error while adding user")
        this.errorMessage = error;
        this.isRegistered = false;
    });
}


updateUser(){
  this.userService.modifyUser(this.user)
  .subscribe(user=> {
    alert("User modified successfully")
    this.registrationForm.reset;
    this.dialogRef.close('update');
  }, error=> {
      alert("Error while updating user")
      this.errorMessage = error;
  });
}

getRoles(){
  this.registrationService.findRoles().subscribe(
    response => {
      console.log(response)
      this.RolesList = response;
    }
  )
}

onSelectRole(event){
  this.registrationService.findRoleById(event.source.value).subscribe(
    response => {
      this.role = response;
    }
  )
}


}
import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { FormControl, FormGroup, Validators,ReactiveFormsModule, FormBuilder} from "@angular/forms";
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  aFormGroup: FormGroup;
  hide = true;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder){  
  }
  submitted = false;
  errorMessage = '';
  isLoggedin = false;
  isLoginFailed = false;
  siteKey:string ="6Le1RMkfAAAAAL4kuF1kJYn1Cwg6Luy4OZerwv0m"
  ngOnInit() {
      this.loginForm = new FormGroup({
          userName: new FormControl(null, Validators.required),
          password: new FormControl(null, Validators.required),
      });
      this.aFormGroup = this.formBuilder.group({
        recaptcha: ['', Validators.required]
      });
  }
  onSubmit(){
    console.log("recaptcha value "+this.loginForm.value.recaptcha)
      this.submitted = true;
      this.authService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
          data=>{
              this.isLoggedin = true
              if(sessionStorage.getItem('roles').includes('ADMINISTRATOR')){
                this.router.navigate(['/admin-dashboard']);
              }else {
                this.router.navigate(['/home']);
              }
          },
          error=>{
              console.log(error);
              this.errorMessage = error;
              this.isLoggedin = false;
              this.isLoginFailed = true;
          }
      );


  }


}
import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/auth.service";
import { FormControl, FormGroup, Validators,ReactiveFormsModule} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private authService: AuthService, private router: Router){ }
  submitted = false;
  errorMessage = '';
  isLoggedin = false;
  isLoginFailed = false;
  ngOnInit() {
      this.loginForm = new FormGroup({
          userName: new FormControl(null, Validators.required),
          password: new FormControl(null, Validators.required),
      });
  }
  onSubmit(){
      this.submitted = true;
      this.authService.login(this.loginForm.value.userName, this.loginForm.value.password).subscribe(
          data=>{
              this.isLoggedin = true
              console.log(sessionStorage.getItem('roles'))
              this.router.navigate(['/home']);
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
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { usercred } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  constructor(private builder: FormBuilder, private service: UserService,
    private router: Router, private snackbar: MatSnackBar) {

  }
  ngOnInit(): void {
    localStorage.clear();
    localStorage.setItem('isLoggedIn', 'false');
    this.snackbar.open('Please Login');
  }

  _response: any;

  _loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  protected get _loginformControl() {
    return this._loginform.controls;
  }

  proceedlogin() {

    if (this._loginform.valid) {
      let _obj: usercred = {
        username: this._loginform.value.username as string,
        password: this._loginform.value.password as string
      }
      this.service.Proceedlogin(_obj).subscribe(item => {
        this._response = item;
        // console.log(this._response);
        if (this._response.status == 1) {
          this.snackbar.open('Logged In Successfully');
          localStorage.setItem('token', this._response.token);
          const payload = atob(this._response.token.split('.')[1]);
          const parsedPayload = JSON.parse(payload);
          // console.log(parsedPayload);
          localStorage.setItem('userid', parsedPayload.userid);
          localStorage.setItem('username', parsedPayload.username);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('usertype', parsedPayload.usertype);
          if(parsedPayload.usertype == 'Admin'){
            this.router.navigateByUrl('/adminpanel');
          }
          else{
            this.router.navigateByUrl('/');
          }
        } else {
          this.snackbar.open('Wrong Credentials');
        }
      });
    }else {
      this._loginform.markAllAsTouched()
    }
  }
}

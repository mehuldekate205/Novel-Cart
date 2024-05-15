import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, 
    private service: UserService, 
    private snackbar: MatSnackBar, 
    private router: Router) {}

  _response: any;

  _regform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/)]),
    firstName: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    gender: this.builder.control('', Validators.required)
  })

  protected get _regformControl() {
    return this._regform.controls;
  }
  
  proceedregister() {
    if (this._regform.valid) {
      let obj: User = {
        userName: this._regform.value.username as string,
        firstName: this._regform.value.username as string,
        lastName: this._regform.value.username as string,
        password: this._regform.value.password as string,
        gender: this._regform.value.username as string,
        userTypeId: 2
      }
      this.service.Userregisteration(obj).subscribe(item => {
        this._response = item;
        // console.log(this._response);
        if (this._response.status == 1) {
          this.snackbar.open('User registered successfully');
          this.router.navigateByUrl('/login');
        } else {
          this.snackbar.open('User not registered');
        }
      });
    }else{
      this._regform.markAllAsTouched()
    }
  }
}


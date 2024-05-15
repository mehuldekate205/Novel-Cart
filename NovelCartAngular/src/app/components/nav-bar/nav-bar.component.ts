import { Component, DoCheck, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, DoCheck {

  constructor(private router: Router, private snackbar: MatSnackBar) {}

  userid: number | undefined;
  username = '';
  usertype = '';
  showmenu = false;
  isAdmin = false;

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.usertype = localStorage.getItem('usertype') as string;
    this.userid = parseInt(localStorage.getItem('userid')!);
    this.username = localStorage.getItem('username') as string;
    if(this.usertype == 'Admin') this.isAdmin = true;
    else this.isAdmin = false;
    let token = localStorage.getItem('token')
    if(token){
      const payload = atob(token.split('.')[1]);
      const parsedPayload = JSON.parse(payload);
      if(!(parsedPayload.exp > Date.now() / 1000)){
        this.snackbar.open('Session Expired');
        this.router.navigateByUrl('/login');
      } 
    }
    this.Setaccess();
  }
  
  Setaccess() {
    let currentUrl = this.router.url;
    if (currentUrl === '/' && localStorage.getItem('isLoggedIn') == 'false') {
      this.router.navigateByUrl('/login');
    } else if (currentUrl === '/register' || currentUrl === '/login') {
      this.showmenu = false;
    }else {
      this.showmenu = true;
    }
  }
}

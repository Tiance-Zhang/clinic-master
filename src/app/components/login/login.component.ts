import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Clinician } from 'src/app/models/Clinician';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  isLogin = 'false';
  clinician: Clinician = { username: '', password: '' };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // read credentials from local storage and redirect to the main page
    this.isLogin = window.localStorage.getItem('isLogin');
    console.log(this.isLogin);
    if (this.isLogin == 'true'){
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }

  onSubmit() {
    this.clinician.username = this.username;
    this.clinician.password = this.password;
    this.authService.loginClinician(this.clinician).subscribe(result => {
      if (result) {
        window.localStorage.setItem('isLogin', String(result));
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  hide = true;

  constructor(public userService: UserService,  private router: Router) {}

  ngOnInit() {
  }

  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    return this.password.hasError('required') ? 'You must enter a value' : '';
  }

  login(): void {
    if (this.email.valid && this.password.valid) {
      this.userService.loginWithEmailAndPassword(this.email.value, this.password.value)
        .then(() => this.router.navigate(['/home']))
        .catch(_error => {
          console.log('Error', _error.message);
          this.router.navigate(['/']);
        });
    } else {
      console.log('not valid');
    }
  }
}

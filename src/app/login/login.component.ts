import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService,  private router: Router) {}

  ngOnInit() {
  }

  login(formData): void {
    if (formData.valid) {
      this.userService.loginWithEmailAndPassword(formData.value.email, formData.value.password)
        .then(() => this.router.navigate(['/home']))
        .catch(_error => {
          // this.error = _error;
          console.log(_error);
          this.router.navigate(['/']);
        });
    } else {
      console.log('not valid');
    }
  }
}

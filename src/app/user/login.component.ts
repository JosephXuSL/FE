import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = 'Log In';
  public showerror = false;
  constructor(private authService: AuthService) { }

  login(loginForm: NgForm): void {
    if (loginForm && loginForm.valid) {
      this.showerror = false;
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password).subscribe(t => {
        if (!t) {
          this.AddErrorMessage();
        }
      });
    }
  }
  AddErrorMessage(): void {
    this.showerror = true;
    this.errorMessage = '请检查用户名和密码是否正确.';
  }
}

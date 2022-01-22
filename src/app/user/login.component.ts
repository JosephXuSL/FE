import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string;
  pageTitle = '登录';
  loading = false;
  public showerror = false;
  constructor(private authService: AuthService) { }

  login(loginForm: NgForm): void {
    this.loading = true;
    this.errorMessage = '';
    if (loginForm && loginForm.valid) {
      this.showerror = false;
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      this.authService.login(userName, password).subscribe(t => {
        this.loading = false;
        if (!t) {
          this.AddErrorMessage();
        }
      });
    }
  }
  AddErrorMessage(): void {
    this.showerror = true;
    if (sessionStorage.getItem('accountstatus') === '停用') {
      this.errorMessage = '该账号已停用，如仍需登录，请联系管理员！';
    } else {
      this.errorMessage = '请检查用户名和密码是否正确.';
    }

  }
}

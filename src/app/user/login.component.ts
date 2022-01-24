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
  canvas: any;
  image: any;
  validateCode: string;
  nums = Array<string>();
  public showerror = false;
  str = '';
  constructor(private authService: AuthService) { }
  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit(): void {
    this.getyanzhengma();

  }
  login(loginForm: NgForm): void {
    this.loading = true;
    this.errorMessage = '';
    if (loginForm && loginForm.valid) {
      this.showerror = false;
      const userName = loginForm.form.value.userName;
      const password = loginForm.form.value.password;
      const yanzhengma = loginForm.form.value.yanzhengma;
      if (yanzhengma !== this.str) {
        this.showerror = true;
        this.errorMessage = '验证码错误！';
        this.getyanzhengma();
        this.loading = false;
      } else {
        this.authService.login(userName, password).subscribe(t => {
          this.loading = false;
          if (!t) {
            this.AddErrorMessage();
            this.getyanzhengma();
          }
        });
      }
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
  // yanzhengma 生成部分
  getyanzhengma() {
    // this.clearCanvas()
    this.canvas = document.getElementById('verifyCanvas'); // 获取HTML端画布
    const context: CanvasRenderingContext2D = this.canvas.getContext('2d'); // 获取画布2D上下文
    context.fillStyle = 'white'; // 画布填充色
    context.fillRect(0, 0, this.canvas.width, this.canvas.height); // 清空画布
    context.fillStyle = '#40991b'; // 设置字体颜色
    context.font = '25px Arial'; // 设置字体
    const rand = new Array();
    const x = new Array();
    const y = new Array();
    this.rangenum();
    for (let i = 0; i < 4; i++) {
      rand.push(rand[i]);
      rand[i] = this.nums[i];
      x[i] = i * 20 + 10;
      y[i] = Math.random() * 20 + 20;
      context.fillText(rand[i], x[i], y[i]);
    }
    this.str = rand.join('').toUpperCase();
    this.convertCanvasToImage(this.canvas);
    return this.str;
  }

  rangenum() {
    this.nums = new Array<string>();
    this.validateCode = '';
    for (let i = 0; i < 4; i++) {
      const t = Math.floor(Math.random() * 10);
      this.nums.push(t.toString());
      this.validateCode = this.validateCode + t.toString();
    }
  }
  // 绘制图片
  convertCanvasToImage(canvas) {
    document.getElementById('verifyCanvas').style.display = 'none';
    this.image = document.getElementById('code_img');
    this.image.src = canvas.toDataURL('image/png');
    return this.image;
  }
  clearCanvas(): void {
    this.canvas = document.getElementById('verifyCanvas');
    const ctx: CanvasRenderingContext2D = this.canvas.getContext('2d');
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

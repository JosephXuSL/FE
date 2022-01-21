import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiClient } from 'src/app/api-client';
import { Student } from 'src/app/models/student';
declare let html2canvas: any;

@Component({
  selector: 'pm-student-enrollsearch',
  templateUrl: './student-enrollsearch.component.html',
  styleUrls: ['./student-enrollsearch.component.css']
})
export class StudentEnrollsearchComponent implements OnInit {
  canvas: any;
  image: any;
  validateCode: string;
  public showerror = false;
  public student: Student;
  loading: boolean;
  constructor(private apiClient: ApiClient) { }
  errorMessage: string;
  alertMessage: string;
  showPupup: boolean;
  nums = Array<string>();

  str = '';

  ngOnInit() {
    this.resetpagetobegin();
    this.student = new Student();
    this.getyanzhengma();
  }

  sbumit(loginForm: NgForm): void {
    this.student = new Student();
    this.resetpagetobegin();
    if (loginForm && loginForm.valid) {
      this.loading = true;
      this.showerror = false;
      const userName = loginForm.form.value.userName;
      const yanzhengma = loginForm.form.value.yanzhengma;
      if (yanzhengma !== this.str) {
        this.dispalyErrorMessage('验证码错误！');
        this.getyanzhengma();
        this.loading = false;
      } else {
        this.apiClient.getStudentByIDCardNumber(userName).subscribe(t => {
          if (t && t.studentNumber) {
            this.dispalyalertMessage('恭喜您已被录取！');
            this.student = new Student();
            this.student.name = t.name;
            this.student.sex = t.sex;
            this.student.studentNumber = t.studentNumber;
            this.student.identityCardNumber = t.identityCardNumber;
            this.student.phoneNumber = t.phoneNumber;
            this.student.major.grade = t.major.grade;
            this.student.major.majorName = t.major.majorName;
            this.student.major.department = t.major.department;
            this.student.bed = t.bed;
            this.student.apartment = t.apartment;
            this.student.chamber = t.chamber;

          } else {
            this.student = new Student();
            this.dispalyErrorMessage('暂无您的相关信息');
            this.closealertMessage();
          }
          this.loading = false;
          this.getyanzhengma();
        });
      }

    }
  }
  // yanzhengma 生成部分
  getyanzhengma() {
  // this.clearCanvas()

    this.canvas = document.getElementById('verifyCanvas'); // 获取HTML端画布
    const context: CanvasRenderingContext2D = this.canvas.getContext('2d'); // 获取画布2D上下文
    context.fillStyle = 'white'; // 画布填充色
    context.fillRect(0, 0, this.canvas.width, this.canvas.height); // 清空画布
    context.fillStyle = 'DarkGreen'; // 设置字体颜色
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
  resetpagetobegin(): void {
    this.showPupup = false;
    this.showerror = false;
    this.errorMessage = '';
    this.alertMessage = '';
  }
  dispalyErrorMessage(s: string): void {
    this.showerror = true;
    this.errorMessage = s;
  }
  closeErrorMessage(): void {
    this.showerror = false;
    this.errorMessage = '';
  }
  dispalyalertMessage(s: string): void {
    this.showPupup = true;
    this.alertMessage = s;
  }
  closealertMessage(): void {
    this.showPupup = false;
    this.alertMessage = '';
  }

}

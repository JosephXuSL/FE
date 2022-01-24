import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Student } from 'src/app/models/student';
import { ApiClient } from 'src/app/api-client';
import { Major } from 'src/app/models/major';
import { GridOptions, GridReadyEvent } from 'ag-grid-community';
import { AgGridLocalText } from 'src/app/models/ag-grid-localText';
declare let html2canvas: any;

@Component({
  selector: 'pm-student-searchexamscore',
  templateUrl: './student-searchexamscore.component.html',
  styleUrls: ['./student-searchexamscore.component.css']
})
export class StudentSearchexamscoreComponent implements OnInit {
  canvas: any;
  image: any;
  validateCode: string;
  public showerror = false;
  public student: Student;
  loading: boolean;
  errorMessage: string;
  alertMessage: string;
  showPupup: boolean;
  nums = Array<string>();
  public gridApi: any;
  private gridColumnApi;
  result: Array<any>;
  rowSelection = 'single';
  columnDefs = [
    { headerName: '课 程 名 称', field: 'courseName', resizable: true, sortable: true, filter: 'agTextColumnFilter' },
    { headerName: '分      数', field: 'score', resizable: true, sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: '学      期', field: 'semester', resizable: true, sortable: true, filter: 'agTextColumnFilter' }
  ];
  localeText = AgGridLocalText;
  rowData = [];
  str = '';
  constructor(private apiClient: ApiClient) { }

  ngOnInit() {
    this.resetpagetobegin();
    // this.student = new Student();
    this.getyanzhengma();
  }
  sbumit(loginForm: NgForm): void {
    this.student = new Student();
    this.resetpagetobegin();
    if (loginForm && loginForm.valid) {
      this.loading = true;
      this.showerror = false;
      const userName = loginForm.form.value.userName;
      const shenfenzheng = loginForm.form.value.shenfen;
      const yanzhengma = loginForm.form.value.yanzhengma;
      if (yanzhengma !== this.str) {
        this.dispalyErrorMessage('验证码错误！');
        this.getyanzhengma();
        this.loading = false;
      } else {
        this.apiClient.getStudentByIDCardNumber(shenfenzheng).subscribe(t => {
          if (t && t.studentNumber && t.studentNumber === userName) {
            this.dispalyalertMessage('以下是您的个人信息及成绩单');
            this.mapstudentInformation(t);
            this.getAllStudentunderExam();
          } else {
            this.student = new Student();
            this.dispalyErrorMessage('未查询到您的相关信息，如与事实不符，请联系管理员');
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
  // 绘制图片
  convertCanvasToImage(canvas) {
    document.getElementById('verifyCanvas').style.display = 'none';
    this.image = document.getElementById('code_img');
    this.image.src = canvas.toDataURL('image/png');
    return this.image;
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
  mapstudentInformation(t: any): void {
    this.student = new Student();
    this.student.major = new Major();
    this.student.id = t.id;
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
  }
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.rowData = this.result;
    if (!this.rowData || this.rowData.length === 0) {

      params.api.showNoRowsOverlay();
    }
  }
  getAllStudentunderExam(): void {
    const ids = new Array<number>();
    ids.push(this.student.id);
    this.apiClient.getExaminationsByStudentIds(ids).subscribe(t => {
      if (t) {
        this.generateAllStudentexamRowdata(t);
      }
      this.loading = false;
    });
  }
  generateAllStudentexamRowdata(infolist: any[]): void {

    this.result = new Array<any>();
    infolist.forEach(i => {

      const info = {
        courseName: i.course.courseName,
        score: i.score,
        semester: i.semester
      };
      this.result.push(info);
    });
    this.rowData = this.result;
    this.gridApi.setRowData(this.rowData);
  }
}

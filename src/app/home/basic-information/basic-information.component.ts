import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiClient, Teacher, TeacherAccount } from 'src/app/api-client';

@Component({
  selector: 'pm-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit {
  logInUserNm: string;
  imgUrl;
  errorMessage: string;
  loading: boolean;
  public showerror = false;
  public teacherAccount: TeacherAccount;
  constructor(private apiClient: ApiClient, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.loading = true;
    this.teacherAccount = new TeacherAccount();
    this.teacherAccount.teacher = new Teacher();
    this.logInUserNm = sessionStorage.getItem('teachernumber');
    if (this.logInUserNm) {
      if (this.logInUserNm !== 'admin') {
        this.getTeacherAccountInfo(this.logInUserNm);
      } else {
        this.teacherAccount.id = 0;
        this.teacherAccount.teacherId = 0;
        this.teacherAccount.isAdminAccount = false;
        this.teacherAccount.accountStatus = '正常';
        this.teacherAccount.accountName = '管理员';
        this.teacherAccount.password = 'admin';
        this.teacherAccount.teacher.teacherNumber = '0';
        this.teacherAccount.teacher.phoneNumber = '';
        this.teacherAccount.teacher.teacherComment = '';
        this.loading = false;
      }
    }

  }
  isadmin(): boolean {
    const isadmin = sessionStorage.getItem('isadmin');
    if (isadmin === '1') {
      return true;
    }
    return false;
  }
  issuperadmin(): boolean {
    const issuperadmin = sessionStorage.getItem('issuperadmin');
    if (issuperadmin === '1') {
      return true;
    }
    return false;
  }
  getTeacherAccountInfo(name: string) {
    const teacherid = sessionStorage.getItem('teachernumber');
    if (teacherid) {
      this.apiClient.getTeacherAccountByTeacherNm(teacherid)
        .subscribe((t: TeacherAccount) => {
          if (t) {
            this.teacherAccount.id = t.id;
            this.teacherAccount.teacherId = t.teacherId;
            this.teacherAccount.teacher = t.teacher;
            this.teacherAccount.isAdminAccount = t.isAdminAccount;
            this.teacherAccount.accountStatus = t.accountStatus;
            this.teacherAccount.teacher.teacherNumber = t.teacher.teacherNumber;
            this.teacherAccount.teacher.phoneNumber = t.teacher.phoneNumber;
            this.teacherAccount.teacher.teacherComment = t.teacher.teacherComment;
            this.teacherAccount.accountName = t.accountName;
            this.teacherAccount.password = t.password;

          }
          this.loading = false;
        });
    }

  }
  fileChange(event) {
    const file = event.target.files[0];
    const isimg = file.type === 'image/jpeg';
    if (!isimg) {
      this.AddErrorMessage('只允许上传JPG文件!');
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.AddErrorMessage('请上传小于2M的图片');

      return;
    }
    const imgUrl = window.URL.createObjectURL(file);
    const sanitizerUrl = this.sanitizer.bypassSecurityTrustUrl(imgUrl);
    this.imgUrl = sanitizerUrl;
  }
  AddErrorMessage(st: string): void {
    this.showerror = true;
    this.errorMessage = st;
  }
}

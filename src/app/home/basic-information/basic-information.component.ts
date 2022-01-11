import { Component, OnInit } from '@angular/core';
import { ApiClient, Teacher, TeacherAccount } from 'src/app/api-client';

@Component({
  selector: 'pm-basic-information',
  templateUrl: './basic-information.component.html',
  styleUrls: ['./basic-information.component.css']
})
export class BasicInformationComponent implements OnInit {
  logInUserNm: string;
  public teacherAccount: TeacherAccount;
  constructor(private apiClient: ApiClient) { }

  ngOnInit() {
    this.teacherAccount = new TeacherAccount();
    this.teacherAccount.teacher = new Teacher()
    this.logInUserNm = sessionStorage.getItem('teachernumber');
    if (this.logInUserNm) {
      if (this.logInUserNm != 'admin') {
        this.getTeacherAccountInfo(this.logInUserNm);
      } else {
        this.teacherAccount.id = 0;
        this.teacherAccount.teacherId = 0;
        this.teacherAccount.isMentorAccount = false;
        this.teacherAccount.accountStatus = '正常';
        this.teacherAccount.accountName = '管理员';
        this.teacherAccount.password = 'admin';
        this.teacherAccount.teacher.teacherNumber = '0';
        this.teacherAccount.teacher.phoneNumber = '';
        this.teacherAccount.teacher.teacherComment = '';

      }
    }

  }
  isadmin(): boolean {
    let isadmin = sessionStorage.getItem('isadmin');
    if (isadmin == '1') {
      return true;
    }
    return false;
  }
  getTeacherAccountInfo(name: string) {
    let teacherid = sessionStorage.getItem('teachernumber');
    if (teacherid) {
      this.apiClient.getTeacherAccountByTeacherNm(teacherid)
        .subscribe((t: TeacherAccount) => {
          if (t) {
            this.teacherAccount.id = t.id;
            this.teacherAccount.teacherId = t.teacherId;
            this.teacherAccount.teacher = t.teacher;
            this.teacherAccount.isMentorAccount = t.isMentorAccount;
            this.teacherAccount.accountStatus = t.accountStatus;
            this.teacherAccount.teacher.teacherNumber = t.teacher.teacherNumber;
            this.teacherAccount.teacher.phoneNumber = t.teacher.phoneNumber;
            this.teacherAccount.teacher.teacherComment = t.teacher.teacherComment;
            this.teacherAccount.accountName = t.accountName;
            this.teacherAccount.password = t.password;

          }

        });
    }

  }
}
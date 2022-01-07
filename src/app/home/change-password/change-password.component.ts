import { Component, OnInit } from '@angular/core';
import { TeacherAccount } from 'src/app/api-client';
import { ActivatedRoute } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'pm-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public showerror = false;
  public teacherAccount: TeacherAccount;
  public passwordNum: string;
  accountName: string;
  errorMessage: string;
  constructor(private activatedRoute: ActivatedRoute, private managementService: ManagementService) { }

  ngOnInit() {
    this.accountName = sessionStorage.getItem('user');
    // this.activatedRoute.queryParams.subscribe(params => {
    //   this.teacherAccount.teacherId = params['id'];
    //   //this.teacherAccount.accountName = params['name'];
    // });
  }
  submit(): void {
    this.ResetErrorMessage();

    if (this.passwordNum && this.accountName) {
      this.showerror = false;

      // const password = loginForm.form.value.password;

      if (this.managementService.updateTeacherAccountPassword(this.accountName, this.passwordNum)) {

        this.AddErrorMessage();
      } else {
        this.AddSuccessMessage();
      }
    }
  }
  ResetErrorMessage(): void {
    this.showerror = false;
    this.errorMessage = '';
  }
  AddErrorMessage(): void {
    this.showerror = true;
    this.errorMessage = 'Please enter a valid password.';
  }
  AddSuccessMessage(): void {
    this.showerror = true;
    this.errorMessage = '密码已修改成功！';
  }
}

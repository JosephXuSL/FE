import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { Business, businessList } from '../models/business';
import { AgGrideService } from './service/ag-gride.service';
import { TeacherAccount } from '../api-client';
import { ManagementService } from './service/management.service';
@Component({
  selector: 'pm-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  business: Business;
  errorMessage = '';
  columnDefs = [];
  rowData: any;
  logInUserNm: string;
  isBasicInformation: boolean;
  isadmin: boolean;

  public teacherAccount: TeacherAccount;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agGrideService: AgGrideService,
    private managementService: ManagementService) { }

  ngOnInit() {
    this.isBasicInformation = false;
    this.teacherAccount = new TeacherAccount();
    this.isadmin = false;
    this.activatedRoute.params.subscribe(param => {
      this.business = businessList.find(b => b.name === param.business);
      this.columnDefs = this.agGrideService.getColumnDefs(this.business);
    });
    this.logInUserNm = sessionStorage.getItem('user');
    if (this.business.name === 'information') {
      this.isBasicInformation = true;
      if (this.logInUserNm) {
        if (this.logInUserNm !== 'admin') {
          this.getTeacherAccountInfo(this.logInUserNm);
        } else {
          this.isadmin = true;
          this.teacherAccount.id = 0;
          this.teacherAccount.teacherId = 0;
          this.teacherAccount.isMentorAccount = false;
          this.teacherAccount.accountStatus = '正常';
          this.teacherAccount.accountName = '管理员';
          this.teacherAccount.password = 'admin';
        }

      }

    }
    this.activatedRoute.data.subscribe(data => {
      this.rowData = data.listResolvedData;
    });
  }

  onRowDoubleClicked(params)  {
    console.log(params.data);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
  getTeacherAccountInfo(name: string) {
    this.managementService.searchTeacherAccountByName(name).subscribe((t: TeacherAccount) => {
      if (t) {
        this.teacherAccount.id = t.id;
        this.teacherAccount.teacherId = t.teacherId;
        this.teacherAccount.isMentorAccount = t.isMentorAccount;
        this.teacherAccount.accountStatus = t.accountStatus;
        this.teacherAccount.accountName = t.accountName;
        this.teacherAccount.password = t.password;
        this.teacherAccount.teacher = t.teacher;
      }

    });

  }

}

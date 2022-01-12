import { Component, OnInit } from '@angular/core';
import { GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiClient, Teacher, TeacherAccountRequestBody } from 'src/app/api-client';

@Component({
  selector: 'pm-create-teacher-account',
  templateUrl: './create-teacher-account.component.html',
  styleUrls: ['./create-teacher-account.component.css']
})
export class CreateTeacherAccountComponent implements OnInit {
  public gender;
  public showerror = false;
  public selectedrowids: any[];
  loading: boolean;
  errorMessage: string;
  alertMessage: string;
  showPupup: boolean;
  nums: Array<any>;
  public gridApi: any;
  private gridColumnApi;
  result: Array<any>;
  // newaccounts: TeacherAccountRequestBody[];
  rowSelection = 'multiple';
  columnDefs = [
    { headerName: '教师id', checkboxSelection: true, headerCheckboxSelection: true, field: 'teacherid', sortable: true, filter: 'agNumberColumnFilter', hidden: true },
    { headerName: '教师编号', field: 'teacherNumber', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: '教师姓名', field: 'teacherName', sortable: true, filter: 'agNumberColumnFilter' },
    { headerName: '状态', field: 'status', sortable: true, filter: 'agTextColumnFilter' }
  ];
  rowData = [];
  str = '';
  constructor(private apiClient: ApiClient) { }

  ngOnInit() {
    this.loading = true;
    this.gender = 'admin';
    this.selectedrowids = new Array<number>();
    this.getAllteacherInfo();
  }
  submit(): void {

    let newaccounts = this.generatenewteacherAccounts();
    
    this.addTeacherAccount(newaccounts).subscribe(a => {
      this.errorMessage = "以下编号账户已创建成功：";
      newaccounts.forEach(t => {
        this.apiClient.getTeacherAccountByTeacherNm(t.accountName).subscribe(i => {
          if (i && i.id && i.accountName) {
            this.errorMessage =  this.errorMessage + "教师编号-"+i.accountName+";";
          }
        });

        this.selectedrowids = new Array<number>();
        this.getAllteacherInfo();

      });
    });
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
  onSelectionChanged() {
    this.selectedrowids = new Array<any>();
    const selectedRows = this.gridApi.getSelectedRows();
    selectedRows.forEach(e => {
      let info = {
        teacherid: e.teacherid,
        teacherNumber: e.teacherNumber,
        isAdmin: this.gender == 'admin'
      }
      this.selectedrowids.push(info);
    });
  }
  getAllteacherInfo(): void {
    this.apiClient.getAllTeachers().subscribe(t => {
      if (t && t.length > 0) {
        this.generateAllteacherowdata(t);
      }
      this.loading = false;
    });
  }
  generateAllteacherowdata(infolist: any[]): void {

    this.result = new Array<any>();
    infolist.forEach(i => {

      let info = {
        teacherid: i.id,
        teacherNumber: i.teacherNumber,
        teacherName: i.name,
        status: i.teacherStatus,
      }
      this.result.push(info);
    });
    this.rowData = this.result;
    this.gridApi.setRowData(this.rowData);
  }
  generatenewteacherAccounts(): TeacherAccountRequestBody[] {
    let newaccounts = new Array<TeacherAccountRequestBody>();
    this.selectedrowids.forEach(i => {

      let newteacherAccount = new TeacherAccountRequestBody();
      newteacherAccount.id = 0;
      newteacherAccount.accountName = i.teacherNumber;
      newteacherAccount.teacherId = i.teacherid;
      newteacherAccount.isMentorAccount = this.gender == 'admin';
      newteacherAccount.accountStatus = "在职";
      newteacherAccount.password = "123456";

      newaccounts.push(newteacherAccount);
    });
    return newaccounts;
  }
  addTeacherAccount(teacherAccounts: TeacherAccountRequestBody[]): Observable<any> {

    return this.apiClient.addTeacherAccounts(teacherAccounts);
  }
}

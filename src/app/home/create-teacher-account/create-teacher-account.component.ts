import { Component, OnInit } from '@angular/core';
import { GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ApiClient, Teacher, TeacherAccountRequestBody } from 'src/app/api-client';
import { AgGridLocalText } from 'src/app/models/ag-grid-localText';

@Component({
  selector: 'pm-create-teacher-account',
  templateUrl: './create-teacher-account.component.html',
  styleUrls: ['./create-teacher-account.component.css']
})
export class CreateTeacherAccountComponent implements OnInit {
  public gender;
  public showerror = false;
  public selectedrowids: any[];
  public jiaoshi: '';
  public js: '';
  loading: boolean;
  errorMessage: string;
  alertMessage: string;
  showPupup: boolean;
  nums: Array<any>;
  public gridApi: any;
  private gridColumnApi;
  result: Array<any>;
  allteacherAccounts: Array<any>;
  // newaccounts: TeacherAccountRequestBody[];
  rowSelection = 'multiple';
  columnDefs = [
    // tslint:disable-next-line:max-line-length
    {
      headerName: '教师id',
      field: 'teacherid',
      hide: true
    },
    {
      headerName: '教师编号',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      field: 'teacherNumber',
      resizable: true,
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: '教师姓名',
      field: 'teacherName',
      resizable: true,
      sortable: true,
      filter: 'agNumberColumnFilter'
    },
    {
      headerName: '状态',
      field: 'status',
      resizable: true,
      sortable: true,
      filter: 'agTextColumnFilter'
    }
  ];
  localeText = AgGridLocalText;
  rowData = [];
  str = '';
  constructor(private apiClient: ApiClient) { }

  ngOnInit() {
    this.js = '';
    this.jiaoshi = '';
    this.errorMessage = '';
    this.loading = true;
    this.gender = 'admin';
    this.selectedrowids = new Array<number>();
    this.getAllteacherInfo();
  }
  submit(): void {
    this.loading = true;
    const newaccounts = this.generatenewteacherAccounts();

    this.addTeacherAccount(newaccounts).subscribe(a => {
      this.errorMessage = '以下编号账户已创建成功：';
      newaccounts.forEach(t => {
        this.apiClient.getTeacherAccountByTeacherNm(t.accountName).subscribe(i => {
          if (i && i.id && i.accountName) {
            this.errorMessage = this.errorMessage + '教师编号-' + i.accountName + ';';
          }
          this.selectedrowids = new Array<number>();
          this.getAllteacherInfo();
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
      const info = {
        teacherid: e.teacherid,
        teacherNumber: e.teacherNumber,
        isAdmin: this.gender === 'admin'
      };
      this.selectedrowids.push(info);
    });
  }
  getAllteacherInfo(): void {
    this.apiClient.getAllNoAccountTeachers().subscribe(t => {
      if (t && t.length > 0) {
        this.generateAllteacherowdata(t);
      } else {
        this.gridApi.setRowData(null);
      }
      this.loading = false;
    });
  }
  generateAllteacherowdata(infolist: any[]): void {
    this.loading = true;
    this.result = new Array<any>();
    infolist.forEach(i => {

      const info = {
        teacherid: i.id,
        teacherNumber: i.teacherNumber,
        teacherName: i.name,
        status: i.teacherStatus,
      };
      this.result.push(info);
    });
    this.rowData = this.result;
    this.allteacherAccounts = this.result;
    this.gridApi.setRowData(this.rowData);
    this.loading = false;
  }
  generatenewteacherAccounts(): TeacherAccountRequestBody[] {
    const newaccounts = new Array<TeacherAccountRequestBody>();
    this.selectedrowids.forEach(i => {

      const newteacherAccount = new TeacherAccountRequestBody();
      newteacherAccount.id = 0;
      newteacherAccount.accountName = i.teacherNumber;
      newteacherAccount.teacherId = i.teacherid;
      newteacherAccount.isAdminAccount = this.gender === 'admin';
      newteacherAccount.accountStatus = '在职';
      newteacherAccount.password = '123456';

      newaccounts.push(newteacherAccount);
    });
    return newaccounts;
  }
  addTeacherAccount(teacherAccounts: TeacherAccountRequestBody[]): Observable<any> {

    return this.apiClient.addTeacherAccounts(teacherAccounts);
  }
  clear() {
    this.jiaoshi = '';
    this.js = '';
  }
  searchall() {
    this.clear();
    this.ngOnInit();
  }
  search() {
    this.loading = true;
    this.errorMessage = '';
    this.rowData = [];
    if (this.allteacherAccounts && this.allteacherAccounts.length > 0) {
      this.allteacherAccounts.forEach(t => {
        if (this.jiaoshi) {
          if (this.js) {
            if (t.teacherNumber === this.jiaoshi && t.teacherName === this.js) {
              this.rowData.push(t);
            }
          } else {
            if (t.teacherNumber === this.jiaoshi) {
              this.rowData.push(t);
            }
          }
        } else if (this.js && this.js === t.teacherName) {
          this.rowData.push(t);
        }

      });
      if (!(this.rowData && this.rowData.length > 0)) {
        this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
      }
      this.gridApi.setRowData(this.rowData);
      this.loading = false;
    } else {
      this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
    }
  }
}

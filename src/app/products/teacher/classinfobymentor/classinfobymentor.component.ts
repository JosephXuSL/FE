import { Component, OnInit } from '@angular/core';
import { Major, Student } from 'src/app/api-client';
import { ApiClient } from 'src/app/api-client';
import { GridReadyEvent } from 'ag-grid-community';
import { AgGridLocalText } from 'src/app/models/ag-grid-localText';
@Component({
  selector: 'pm-classinfobymentor',
  templateUrl: './classinfobymentor.component.html',
  styleUrls: ['./classinfobymentor.component.css']
})
export class ClassinfobymentorComponent implements OnInit {
  allClasses: Array<any>;
  currentClassstudent: Array<any>;
  loading: boolean;
  lookbuttonclick: boolean;
  viewStudentclick: boolean;
  public student: Student;
  classid: number;
  classNum: string;
  errorMessage: string;
  public selectstudentname = '';
  public selectstudentfenzheng = '';
  public gridApi: any;
  private gridColumnApi;
  constructor(private apiClient: ApiClient) { }
  rowSelection = 'single';
  columnDefs = [
    { headerName: '姓名', field: 'xingming', resizable: true, sortable: true, minWidth: 150, maxWidth: 250, filter: 'agTextColumnFilter' },
    { headerName: '学号', field: 'xuehao', resizable: true, sortable: true, minWidth: 150, maxWidth: 250, filter: 'agTextColumnFilter' },
    { headerName: '性别', field: 'xingbie', resizable: true, sortable: true, minWidth: 80, maxWidth: 120, filter: 'agTextColumnFilter' },
    // tslint:disable-next-line:max-line-length
    { headerName: '身份证号码', field: 'shenfenzheng', resizable: true, sortable: true, minWidth: 150, maxWidth: 250, filter: 'agTextColumnFilter' },
    { headerName: '电话号码', field: 'dianhua', resizable: true, sortable: true, minWidth: 150, maxWidth: 250, filter: 'agTextColumnFilter' }
  ];
  localeText = AgGridLocalText;
  rowData = [];
  ngOnInit() {
    this.loading = true;
    this.lookbuttonclick = false;
    this.student = new Student();
    this.student.major = new Major();
    this.viewStudentclick = false;
    this.getallClass();
  }
  getallClass() {
    this.allClasses = new Array<any>();
    const teacherid = sessionStorage.getItem('teacherid');
    this.apiClient.getClassesByMentorId(parseInt(teacherid)).subscribe(t => {
      if (t && t.length > 0 && t[0].id) {
        t.forEach(i => {
          const info = {
            classid: i.id,
            grade: i.major.grade,
            department: i.major.department,
            majorName: i.major.majorName,
            classNumber: i.classNumber
          };
          this.allClasses.push(info);
        });
      } else {
        this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
      }
      this.loading = false;

    });

  }

  choseClass(data: any) {
    this.classid = data.classid;
    this.classNum = data.classNumber;
    this.lookbuttonclick = true;
    this.getstudentsbyclass( this.classid);
  }

  getstudentsbyclass(id: number) {
    this.loading = true;
    this.apiClient.getStudentsByClassId(id).subscribe(t => {
      if (t) {
        this.generateAllStudentunderclassRowdata(t);
      }
      this.loading = false;
    });

  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectstudentname = selectedRows[0].xingming;
    this.selectstudentfenzheng = selectedRows[0].shenfenzheng;
  }
  generateAllStudentunderclassRowdata(infolist: Student[]): void {
    this.currentClassstudent = new Array<any>();
    infolist.forEach(i => {
      const info = {
        id: i.id,
        xingming: i.name,
        xingbie: i.sex,
        dianhua: i.phoneNumber,
        shenfenzheng: i.identityCardNumber,
        xuehao: i.studentNumber
      };
      this.currentClassstudent.push(info);
    });
    this.rowData = this.currentClassstudent;
    this.gridApi.setRowData(this.rowData);
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.rowData = this.currentClassstudent;
    if (!this.rowData || this.rowData.length === 0) {
      params.api.showNoRowsOverlay();
    }
  }
  backtoclass() {
    this.lookbuttonclick = false;
    this.selectstudentname = '';
  }
  backtostudentlist() {
    this.viewStudentclick = false;
    this.lookbuttonclick = true;
  }
  searchInfo() {
    this.viewStudentclick = true;
    this.lookbuttonclick = false;
    this.loading = true;
    this.searchcoursebyclassidInfo();
  }
  searchcoursebyclassidInfo() {
    this.student = new Student();
    this.student.major = new Major();
    this.apiClient.getStudentByIDCardNumber(this.selectstudentfenzheng).subscribe(t => {
      if (t) {
        this.student.id = t.id;
        this.student.identityCardNumber = t.identityCardNumber;
        this.student.sex = t.sex;
        this.student.studentNumber = t.studentNumber;
        this.student.phoneNumber = t.phoneNumber;
        this.student.studentStatus = t.studentStatus;
        this.student.name = t.name;
        this.student.major = t.major;
      } else {

        this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
      }
      this.loading = false;
    });
  }

}

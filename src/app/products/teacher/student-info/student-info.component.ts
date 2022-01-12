import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiClient, CourseSelection } from 'src/app/api-client';
import { studentundercourse } from 'src/app/models/studentundercourse';
import { GridOptions, GridReadyEvent } from 'ag-grid-community';
import { Student } from 'src/app/models/student';
@Component({
  selector: 'pm-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  title = 'app';
  public selectstudentname = '';
  issearchbuttondisable: boolean;
  showPupup: boolean;
  public student: Student;
  public errorMessage = '';
  loading: boolean;
  @Output() popupData = new EventEmitter();

  public gridApi: any;
  private gridColumnApi;
  public selectedRows: Array<studentundercourse>;
  rowSelection = 'single';
  columnDefs = [
    { headerName: '学科', field: 'xueke', sortable: true, minWidth: 150, maxWidth: 250,filter: 'agTextColumnFilter' },
    { headerName: '年级', field: 'nianji', sortable: true,  minWidth: 50,maxWidth: 150,filter: 'agTextColumnFilter' },
    { headerName: '专业', field: 'zhuanye', sortable: true, minWidth: 100,maxWidth: 250, filter: 'agTextColumnFilter' },
    { headerName: '学生姓名', field: 'xingming', sortable: true, maxWidth: 200,filter: 'agTextColumnFilter' }
  ];
  rowData = [];
  result: Array<any>;
  constructor(private apiClient: ApiClient) { }

  ngOnInit() {
    this.loading = true;
    this.getAllStudentundercourse();
    this.student = new Student();

  }
  getAllStudentundercourse(): void {
    let teacherNum = sessionStorage.getItem('teachernumber');
    this.apiClient.getCourseSelectionByTeacherAccount(teacherNum).subscribe(t => {
      if (t) {
        this.generateAllStudentundercourseRowdata(t);
      }
      this.loading = false;
    });
  }
  generateAllStudentundercourseRowdata(infolist: CourseSelection[]): void {

    this.result = new Array<any>();
    infolist.forEach(i => {

      let info = {
        nianji: i.teacherCourseInfo.class.major.grade,
        zhuanye: i.teacherCourseInfo.class.major.majorName,
        xueke: i.teacherCourseInfo.course.courseName,
        xingming: i.student.name
      }
      this.result.push(info);
    });
    this.rowData = this.result;
    this.gridApi.setRowData(this.rowData);
  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectstudentname = selectedRows[0].xingming;
  }
  searchInfo() {
    this.showPupup = true;
    this.loading = true;
    this.searchstudentInfo();
  }
  back() {
    this.showPupup = false;
    this.errorMessage = '';
  }
  searchstudentInfo() {
    this.apiClient.getStudentsByName(this.selectstudentname).subscribe(t => {
      if (t && t[0] && t[0].studentNumber) {
        this.student = new Student();
        this.student.name = t[0].name;
        this.student.sex = t[0].sex;
        this.student.studentNumber = t[0].studentNumber;
        this.student.phoneNumber = t[0].phoneNumber;
        this.student.major.grade = t[0].major.grade;
        this.student.major.majorName = t[0].major.majorName;
        this.student.major.department = t[0].major.department;
      } else {
        this.student = new Student();
        this.errorMessage = '该学生信息已丢失，请联系管理员';
      }
      this.loading = false;
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
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiClient, CourseSelection } from 'src/app/api-client';
import { studentundercourse } from 'src/app/models/studentundercourse';
import { GridReadyEvent } from 'ag-grid-community';
import { Student } from 'src/app/models/student';
import { AgGridLocalText } from 'src/app/models/ag-grid-localText';
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
  public xingming = '';
  public xueqi = '';
  public kecheng = '';
  allInfo = [];
  @Output() popupData = new EventEmitter();

  public gridApi: any;
  private gridColumnApi;
  public selectedRows: Array<studentundercourse>;
  rowSelection = 'single';
  columnDefs = [
    { headerName: '课程名称', field: 'xueke', resizable: true, sortable: true, minWidth: 130, maxWidth: 250, filter: 'agTextColumnFilter' },
    { headerName: '学期', field: 'xueqi', resizable: true, sortable: true, minWidth: 50, maxWidth: 150, filter: 'agTextColumnFilter' },
    { headerName: '年级', field: 'nianji', resizable: true, sortable: true, minWidth: 50, maxWidth: 150, filter: 'agTextColumnFilter' },
    { headerName: '专业', field: 'zhuanye', resizable: true, sortable: true, minWidth: 100, maxWidth: 250, filter: 'agTextColumnFilter' },
    { headerName: '学生姓名', field: 'xingming', resizable: true, sortable: true, maxWidth: 160, filter: 'agTextColumnFilter' }
  ];
  localeText = AgGridLocalText;
  rowData = [];
  result: Array<any>;
  constructor(private apiClient: ApiClient) { }

  ngOnInit() {
    this.errorMessage = ''
    this.loading = true;
    this.getAllStudentundercourse();
    this.student = new Student();
    this.allInfo = new Array<any>();
  }
  getAllStudentundercourse(): void {
    const teacherNum = sessionStorage.getItem('teachernumber');
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

      const info = {
        nianji: i.teacherCourseInfo.class.major.grade,
        zhuanye: i.teacherCourseInfo.class.major.majorName,
        xueke: i.teacherCourseInfo.course.courseName,
        xueqi: i.teacherCourseInfo.semester,
        xingming: i.student.name
      };
      this.result.push(info);
    });
    this.rowData = this.result;
    this.allInfo = this.result;
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
    this.clear();
    this.selectstudentname = '';
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
  search() {
    this.loading = true;
    this.errorMessage = '';
    this.rowData = [];
    if (this.allInfo && this.allInfo.length > 0) {
      this.allInfo.forEach(t => {
        if (t.xueke === this.kecheng && t.xueqi === this.xueqi) {
          if (this.xingming === '' || (this.xingming && t.xingming === this.xingming)) {
            this.rowData.push(t);
          }
        }
      });
      if (!(this.rowData && this.rowData.length > 0)) {
        this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
      }
    } else {
      this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
    }
    this.gridApi.setRowData(this.rowData);
    this.loading = false;
  }
  clear() {
    this.xingming = '';
    this.xueqi = '';
    this.kecheng = '';
  }
  searchall(){
    this.clear();
    this.ngOnInit();
  }
}

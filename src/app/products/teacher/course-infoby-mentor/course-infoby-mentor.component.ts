import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { ApiClient, Class, Student } from 'src/app/api-client';
import { studentundercourse } from 'src/app/models/studentundercourse';

@Component({
  selector: 'pm-course-infoby-mentor',
  templateUrl: './course-infoby-mentor.component.html',
  styleUrls: ['./course-infoby-mentor.component.css']
})
export class CourseInfobyMentorComponent implements OnInit {
  title = 'app';
  public selectclassname = '';
  selectclassid: number;
  issearchbuttondisable: boolean;
  showPupup: boolean;
  public student: Student;
  public errorMessage = '';
  results: Array<any>;
  @Output() popupData = new EventEmitter();
  loading: boolean;
  public gridApi: any;
  private gridColumnApi;
  public selectedRows: Array<studentundercourse>;
  classresult: Array<any>;

  rowSelection = 'single';
  columnDefs = [
    { headerName: '班级', field: 'banji', resizable: true, sortable: true, minWidth: 100, maxWidth: 150,filter: 'agTextColumnFilter' },
    { headerName: '年级', field: 'nianji', resizable: true, sortable: true, minWidth: 100, maxWidth: 200,filter: 'agTextColumnFilter' },
    { headerName: '专业', field: 'zhuanye', resizable: true, sortable: true, minWidth: 150, maxWidth: 250,filter: 'agTextColumnFilter' },
    { headerName: '学院', field: 'xueyuan', resizable: true, sortable: true,  maxWidth: 300,filter: 'agTextColumnFilter' }
  ];
  rowData = [];
  constructor(private apiClient: ApiClient) { }

  ngOnInit() {
    this.loading = true;
    this.getAllClass();
  }
  getAllClass(): void {
    let teacherid = sessionStorage.getItem('teacherid');
    if (teacherid === null) {
      this.errorMessage = '系统错误，请重新登陆再尝试';
      this.loading = false;
    }
    else {
      this.apiClient.getClassesByMentorId(parseInt(teacherid)).subscribe(t => {
        if (t) {
          this.generateAllStudentundercourseRowdata(t);
        }
        this.loading = false;
      });
    }
  }
  generateAllStudentundercourseRowdata(infolist: Class[]): void {
    this.classresult = new Array<any>();
    infolist.forEach(i => {
      let info = {
        id: i.id,
        banji: i.classNumber,
        nianji: i.major.grade,
        zhuanye: i.major.majorName,
        xueyuan: i.major.department
      }
      this.classresult.push(info);
    });
    this.rowData = this.classresult;
    this.gridApi.setRowData(this.rowData);
  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    this.selectclassname = selectedRows[0].banji + '-' + selectedRows[0].nianji + '-' + selectedRows[0].zhuanye;
    this.selectclassid = selectedRows[0].id;
  }
  searchInfo() {
    this.showPupup = true;
    this.loading = true;
    this.searchcoursebyclassidInfo();
  }
  back() {
    this.showPupup = false;
    this.errorMessage = '';
  }
  searchcoursebyclassidInfo() {
    this.results = new Array<any>();
    this.apiClient.getCourseScheduleByClassId(this.selectclassid).subscribe(t => {
      if (t && t.length > 0 && t[0].id) {
        t.forEach(i => {
          let info = {
            courseName: i.teacherCourseInfo.course.courseName,
            textbook: i.teacherCourseInfo.course.textbook,
            scheduledWeekday: i.scheduledWeekday,
            scheduledTime: i.scheduledTime
          }
          this.results.push(info);
        });
      } else {

        this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
      }
      this.loading = false;
    });
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    this.rowData = this.classresult;
    if (!this.rowData || this.rowData.length === 0) {

      params.api.showNoRowsOverlay();
    }
  }
}

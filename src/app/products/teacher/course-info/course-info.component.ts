import { Component, OnInit } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { ApiClient, CourseSchedule } from 'src/app/api-client';
import { AgGridLocalText } from 'src/app/models/ag-grid-localText';

@Component({
  selector: 'pm-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  title = 'app';
  public selectclasstname = '';
  issearchbuttondisable: boolean;
  showPupup: boolean;
  result: Array<any>;
  loading: boolean;
  allCourseResults: any[];
  public kecheng = '';
  public xueqi = '';
  public errorMessage = '';

  public gridApi: any;
  private gridColumnApi;

  rowSelection = 'single';
  columnDefs = [
    { headerName: '课程名称', field: 'courseName', resizable: true, sortable: true, maxWidth: 200, filter: 'agTextColumnFilter' },
    { headerName: '使用教材', field: 'textbook', resizable: true, sortable: true, maxWidth: 200, filter: 'agTextColumnFilter' },
    { headerName: '学期', field: 'semester', resizable: true, maxWidth: 130, sortable: true, filter: 'agTextColumnFilter' },
    { headerName: '计划课程安排', field: 'scheduledWeekday', resizable: true, maxWidth: 200, sortable: true, filter: 'agTextColumnFilter' },
    { headerName: '上课时间', field: 'scheduledTime', resizable: true, sortable: true, maxWidth: 250, filter: 'agTextColumnFilter' }
  ];
  localeText = AgGridLocalText;
  rowData = [];
  constructor(private apiClient: ApiClient) { }


  ngOnInit() {
    this.kecheng = '';
    this.xueqi = '';
    this.errorMessage = '';
    this.getAllStudentundercourse();
  }
  getAllStudentundercourse(): void {
    this.loading = true;
    const teacherNum = sessionStorage.getItem('teachernumber');
    this.apiClient.getTeacherAccountByTeacherNm(teacherNum).subscribe(t => {
      if (t) {
        this.apiClient.getCourseScheduleByTeacherId(t.teacherId).subscribe(s => {
          if (s) {
            this.generateAllcourseRowdata(s);
          }
        });
      } else {
        this.errorMessage = '暂无安排';
      }
      this.loading = false;
    });
  }
  generateAllcourseRowdata(infolist: CourseSchedule[]): void {
    this.result = new Array<any>();
    infolist.forEach(i => {
      const info = {
        courseName: i.teacherCourseInfo.course.courseName,
        textbook: i.teacherCourseInfo.course.textbook,
        scheduledWeekday: i.scheduledWeekday,
        semester: i.teacherCourseInfo.semester,
        scheduledTime: i.scheduledTime
      };
      this.result.push(info);
    });
    this.rowData = this.result;
    this.allCourseResults = this.result;
    this.gridApi.setRowData(this.rowData);
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
  searchcourse() {
    this.loading = true;
    this.errorMessage = '';
    let courserowData = new Array<any>();
    if (this.allCourseResults && this.allCourseResults.length > 0) {
      courserowData = this.searchMatchResult('courseName', this.kecheng, false, this.allCourseResults);
      courserowData = this.searchMatchResult('semester', this.xueqi, false, courserowData);

    }
    if (this.allCourseResults == null || courserowData == null) {
      this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
    }
    this.gridApi.setRowData(courserowData);
    this.loading = false;
  }
  clearcourse() {
    this.loading = true;
    this.kecheng = '';
    this.xueqi = '';
    this.getAllStudentundercourse();
    this.loading = false;
  }
  searchall() {
    this.ngOnInit();
  }
  searchMatchResult(st: string, value: string, isfullmatch: boolean, allresult: any[]): any[] {
    if (value !== null && value !== '') {
      const resultrowData = new Array<any>();
      allresult.forEach(e => {
        const v = Reflect.get(e, st);
        if (isfullmatch) {
          if (v && v === value) {
            resultrowData.push(e);
          }
        } else {
          if (v && v.indexOf(value) === 0) {
            resultrowData.push(e);
          }
        }
      });
      return resultrowData;
    } else {
      return allresult;
    }

  }
}

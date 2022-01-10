import { Component, OnInit } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { ApiClient, CourseSchedule } from 'src/app/api-client';

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
  loading:boolean;

  public errorMessage = '';

  public gridApi: any;
  private gridColumnApi;

  rowSelection = 'single';
  columnDefs = [
    { headerName: '课程名称', field: 'courseName', sortable: true, filter: 'agTextColumnFilter' },
    { textbook: '使用教材', field: 'textbook', sortable: true, filter: 'agTextColumnFilter' },
    { scheduledWeekday: '计划课程安排', field: 'scheduledWeekday', sortable: true, filter: 'agTextColumnFilter' },
    { headerName: '上课时间', field: 'scheduledTime', sortable: true, filter: 'agTextColumnFilter' }
  ];
  rowData = [];
  constructor(private apiClient: ApiClient) { }


  ngOnInit() {
    this.getAllStudentundercourse();
  }
  getAllStudentundercourse(): void {
    this.loading = true;
    let teacherNum = sessionStorage.getItem('teachernumber');
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
      let info = {
        courseName: i.teacherCourseInfo.course.courseName,
        textbook: i.teacherCourseInfo.course.textbook,
        scheduledWeekday: i.scheduledWeekday,
        scheduledTime: i.scheduledTime
      }
      this.result.push(info);
    });
    this.rowData = this.result;
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
}

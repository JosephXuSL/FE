import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GridReadyEvent } from 'ag-grid-community';
import { ApiClient, Class, ClassInfoRequestBody, Student } from 'src/app/api-client';
import { AgGridLocalText } from 'src/app/models/ag-grid-localText';
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
  public nianji = '';
  public zhuanye = '';
  public yuanxi = '';
  public banji = '';
  public kecheng = '';
  public xueqi = '';
  dataSet = [];
  allClassesExisted = [];
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  rowSelection = 'single';
  allCourseResults = new Array<any>();
  columnDefs = [
    {
      headerName: '班级',
      field: 'banji',
      checkboxSelection: true,
      resizable: true,
      sortable: true,
      minWidth: 100,
      maxWidth: 150,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: '年级',
      field: 'nianji',
      resizable: true,
      sortable: true,
      minWidth: 100,
      maxWidth: 200,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: '专业',
      field: 'zhuanye',
      resizable: true,
      sortable: true,
      minWidth: 150,
      maxWidth: 250,
      filter: 'agTextColumnFilter'
    },
    {
      headerName: '学院',
      field: 'xueyuan',
      resizable: true,
      sortable: true,
      maxWidth: 300,
      filter: 'agTextColumnFilter'
    }
  ];
  localeText = AgGridLocalText;
  rowData = [];
  courserowData = [];
  constructor(private apiClient: ApiClient) { }

  ngOnInit() {
    this.clear();
    this.clearcourse();
    this.selectclassname = '';
    this.loading = true;
    this.getAllClass();
  }
  getAllClass(): void {
    const teacherid = sessionStorage.getItem('teacherid');
    if (teacherid === null) {
      this.errorMessage = '系统错误，请重新登陆再尝试';
      this.loading = false;
    } else {
      // tslint:disable-next-line:radix
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
      const info = {
        id: i.id,
        banji: i.classNumber,
        nianji: i.major.grade,
        zhuanye: i.major.majorName,
        xueyuan: i.major.department
      };
      this.classresult.push(info);
    });
    this.rowData = this.classresult;
    this.allClassesExisted = this.classresult;
    this.gridApi.setRowData(this.rowData);
  }
  onSelectionChanged() {
    const selectedRows = this.gridApi.getSelectedRows();
    if (selectedRows && selectedRows.length > 0) {
      this.selectclassname = selectedRows[0].banji + '-' + selectedRows[0].nianji + '-' + selectedRows[0].zhuanye;
      this.selectclassid = selectedRows[0].id;
    } else {
      this.selectclassname = '';
      this.selectclassid = null;
    }
  }
  searchInfo() {
    this.showPupup = true;
    this.loading = true;
    this.searchcoursebyclassidInfo();
  }
  back() {
    this.showPupup = false;
    this.errorMessage = '';
    this.clearcourse();
    this.selectclassname = '';
  }
  searchcoursebyclassidInfo() {
    this.results = new Array<any>();
    this.courserowData = new Array<any>();
    this.errorMessage = '';
    this.apiClient.getCourseScheduleByClassId(this.selectclassid).subscribe(t => {
      if (t && t.length > 0 && t[0].id) {
        t.forEach(i => {
          const info = {
            courseName: i.teacherCourseInfo.course.courseName,
            textbook: i.teacherCourseInfo.course.textbook,
            semester: i.teacherCourseInfo.semester,
            scheduledWeekday: i.scheduledWeekday,
            scheduledTime: i.scheduledTime
          };
          this.results.push(info);
        });
      } else {

        this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
      }
      this.loading = false;
      this.courserowData = this.results;
      this.allCourseResults = this.results;

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
  search() {
    this.loading = true;
    this.errorMessage = '';
    this.rowData = [];
    if (this.allClassesExisted != null) {
      this.rowData = this.searchMatchResult('nianji', this.nianji, false, this.allClassesExisted);
      this.rowData = this.searchMatchResult('banji', this.banji, false, this.rowData);
      this.rowData = this.searchMatchResult('zhuanye', this.zhuanye, false, this.rowData);
      this.rowData = this.searchMatchResult('xueyuan', this.yuanxi, false, this.rowData);
    }
    if (this.allClassesExisted == null || this.rowData == null) {

      this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
    }

    this.loading = false;
    this.gridApi.setRowData(this.rowData);

  }
  clear() {
    this.nianji = '';
    this.zhuanye = '';
    this.yuanxi = '';
    this.banji = '';
  }
  clearcourse() {
    this.kecheng = '';
    this.xueqi = '';
  }
  changePageIndex(pageIndex) {
    this.pageIndex = pageIndex;
  }
  changePageSize(pageSize) {
    this.pageSize = pageSize;
  }
  searchcourse() {
    this.loading = true;
    this.errorMessage = '';
    this.results = new Array<any>();
    this.courserowData = new Array<any>();
    if (this.allCourseResults && this.allCourseResults.length > 0) {
      this.courserowData = this.searchMatchResult('courseName', this.kecheng, false, this.allCourseResults);
      this.courserowData = this.searchMatchResult('semester', this.xueqi, false, this.courserowData);

    }
    if (this.allCourseResults == null || this.courserowData == null) {
      this.errorMessage = '暂无相关信息，如与事实不符，请联系管理员';
    }
    this.loading = false;
  }
  searchall() {
    this.ngOnInit();
  }
  searchallCourse() {
    this.clearcourse();
    this.searchInfo();
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


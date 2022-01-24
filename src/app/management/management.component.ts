import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { Business, businessList } from '../models/business';
import { AgGrideService } from './service/ag-gride.service';
import { TeacherAccount } from '../api-client';
import { ManagementService } from './service/management.service';
import { AgGridLocalText } from '../models/ag-grid-localText';
@Component({
  selector: 'pm-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  business: Business;
  errorMessage = '';
  columnDefs = [];
  localeText = AgGridLocalText;
  rowData: any;
  logInUserNm: string;
  isBasicInformation: boolean;
  isadmin: boolean;
  public iscoursepage: boolean;
  allcourses = [];
  allmajors = [];
  allteachers = [];
  allclasses = [];
  allstudents = [];
  allscores = [];
  allcourseSchedules = [];
  matchResult = [];
  public kecheng = '';

  public ji = '';
  public yuanxi = '';
  public zhuanye = '';

  public jiaoshi = '';
  public jnum = '';

  public cji = '';
  public cyuanxi = '';
  public czy = '';

  public sname = '';
  public sxh = '';

  public scorename = '';
  public sxueke = '';
  public sxuenian = '';

  public steachern = '';
  public scxuenian = '';
  public sckcId = '';
  loading: boolean;
  public teacherAccount: TeacherAccount;

  rowSelection: any;
  rowSelectionId: 0;
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agGrideService: AgGrideService,
    private router: Router,
    private managementService: ManagementService) { }

  ngOnInit() {
    this.isBasicInformation = false;
    this.teacherAccount = new TeacherAccount();
    this.isadmin = false;
    this.activatedRoute.params.subscribe(param => {
      this.business = businessList.find(b => b.name === param.business);
      this.columnDefs = this.agGrideService.getColumnDefs(this.business);
      this.rowSelection = null;
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
          this.teacherAccount.isAdminAccount = false;
          this.teacherAccount.accountStatus = '正常';
          this.teacherAccount.accountName = '管理员';
          this.teacherAccount.password = 'admin';
        }

      }

    }
    this.activatedRoute.data.subscribe(data => {
      this.rowData = data.listResolvedData;
      this.setAllCasesData();
    });
  }

  setAllCasesData() {
    if (this.business.name === 'course') {
      this.allcourses = this.rowData;
      this.iscoursepage = true;
    }
    if (this.business.name === 'major') {
      this.allmajors = this.rowData;
    }
    if (this.business.name === 'teacher') {
      this.allteachers = this.rowData;
    }
    if (this.business.name === 'class') {
      this.allclasses = this.rowData;
    }
    if (this.business.name === 'student') {
      this.allstudents = this.rowData;
    }
    if (this.business.name === 'score') {
      this.allscores = this.rowData;
    }
    if (this.business.name === 'courseSchedule') {
      this.allcourseSchedules = this.rowData;
    }

  }

  resizeColumns() {
    if (this.gridApi !== null && this.gridApi !== undefined) {
      this.gridApi.sizeColumnsToFit();
    }
  }

  onRowDoubleClicked(params) {
    this.viewDetail(params.data);
  }

  onClickViewButton() {
    this.viewDetail(this.rowSelection);
  }

  viewDetail(data) {
    const routerParams: NavigationExtras = {
      queryParams: {
        detail: JSON.stringify(data)
      }
    };
    this.router.navigate([this.router.url, data.id], routerParams);
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
        this.teacherAccount.isAdminAccount = t.isAdminAccount;
        this.teacherAccount.accountStatus = t.accountStatus;
        this.teacherAccount.accountName = t.accountName;
        this.teacherAccount.password = t.password;
        this.teacherAccount.teacher = t.teacher;
      }
    });
  }

  onSelectionChanged() {
    this.rowSelection = this.gridApi.getSelectedRows()[0];
    this.rowSelectionId = this.rowSelection.id;
  }

  buttonVisiable(): boolean {
    if (this.rowSelection) {
      return true;
    } else {
      return false;
    }
  }

  removeSelection() {
    if (confirm('确认删除数据？')) {
      this.managementService.removeDataById(this.business.name, this.rowSelectionId).subscribe(data => {
        if (data.result) {
          this.router.navigate([this.router.url]);
        }
        if (!data.result && data.error) {
          alert('当前删除信息正被其他信息使用， 不能被删除！');
        }
      });
    }
  }
  searchcourse() {
    this.loading = true;
    const courserowData = new Array<any>();
    if (this.allcourses && this.allcourses.length > 0) {
      this.allcourses.forEach(s => {
        // if (s.courseName === this.kecheng) {
        if (s.courseName.indexOf(this.kecheng) === 0) {
          courserowData.push(s);
        }
      });
    }
    this.gridApi.setRowData(courserowData);
    this.loading = false;
  }
  searchmajor() {
    this.loading = true;
    // const courserowData = new Array<any>();
    let finalresult = new Array<any>();
    if (this.allmajors && this.allmajors.length > 0) {
      finalresult = this.searchMatchResult('grade', this.ji, false, this.allmajors);
      finalresult = this.searchMatchResult('majorName', this.zhuanye, false, finalresult);
      finalresult = this.searchMatchResult('department', this.yuanxi, false, finalresult);

      // this.allmajors.forEach(s => {
      //   if (s.grade === this.ji && s.majorName === this.zhuanye && s.department === this.yuanxi) {
      //     courserowData.push(s);
      //   }
      // });
    }
    this.gridApi.setRowData(finalresult);
    this.loading = false;
  }

  searchclass() {
    this.loading = true;
    let courserowData = new Array<any>();
    if (this.allclasses && this.allclasses.length > 0) {
      courserowData = this.searchMatchTwoCycleResult('major', 'grade', this.cji, false, this.allclasses);
      courserowData = this.searchMatchTwoCycleResult('major', 'department', this.cyuanxi, false, courserowData);
      courserowData = this.searchMatchTwoCycleResult('major', 'majorName', this.czy, false, courserowData);
      // this.allclasses.forEach(s => {
      //   if (this.cji && this.cji !== '') {

      //   }
      //   if (s.major.grade === this.cji && s.major.department === this.cyuanxi && s.major.majorName === this.czy) {
      //     courserowData.push(s);
      //   }
      // });
    }
    this.gridApi.setRowData(courserowData);
    this.loading = false;
  }

  searchteacher() {
    this.loading = true;
    let courserowData = new Array<any>();
    if (this.allteachers && this.allteachers.length > 0) {
      courserowData = this.searchMatchResult('name', this.jiaoshi, false, this.allteachers);
      courserowData = this.searchMatchResult('teacherNumber', this.jnum, true, courserowData);
    }
    this.gridApi.setRowData(courserowData);
    this.loading = false;
  }

  searchstudent() {
    this.loading = true;
    let courserowData = new Array<any>();
    if (this.allstudents && this.allstudents.length > 0) {
      courserowData = this.searchMatchResult('name', this.sname, false, this.allstudents);
      courserowData = this.searchMatchResult('studentNumber', this.sxh, true, courserowData);
      // this.allstudents.forEach(s => {
      //   if (s.name === this.sname && s.studentNumber === this.sxh) {
      //     courserowData.push(s);
      //   }
      // });
    }
    this.gridApi.setRowData(courserowData);
    this.loading = false;
  }
  searchscore() {
    this.loading = true;
    let courserowData = new Array<any>();
    if (this.allscores && this.allscores.length > 0) {
      courserowData = this.searchMatchResult('semester', this.sxuenian, false, this.allscores);
      courserowData = this.searchMatchTwoCycleResult('course', 'courseName', this.sxueke, false, courserowData);
      courserowData = this.searchMatchTwoCycleResult('student', 'name', this.scorename, false, courserowData);
      // this.allscores.forEach(s => {
      //   if (s.semester === this.sxuenian
      //     && s.course.courseName === this.sxueke
      //     && s.student.name === this.scorename) {
      //     courserowData.push(s);
      //   }
      // });
    }
    this.gridApi.setRowData(courserowData);
    this.loading = false;
  }

  searchcourseSchedule() {
    this.loading = true;
    let courserowData = new Array<any>();
    if (this.allcourseSchedules && this.allcourseSchedules.length > 0) {
      // tslint:disable-next-line:max-line-length
      courserowData = this.searchMatchThreeCycleResult('teacherCourseInfo', 'teacher', 'name', this.steachern, false, this.allcourseSchedules);
      courserowData = this.searchMatchTwoCycleResult('teacherCourseInfo', 'semester', this.scxuenian, false, courserowData);
      courserowData = this.searchMatchThreeCycleResult('teacherCourseInfo', 'course', 'courseName', this.sckcId, false, courserowData);

      // this.allcourseSchedules.forEach(s => {
      //   if (s.teacherCourseInfo.teacher.name === this.steachern
      //     && s.teacherCourseInfo.semester === this.scxuenian
      //     && s.teacherCourseInfo.course.courseName === this.sckcId) {
      //     courserowData.push(s);
      //   }
      // });
    }
    this.gridApi.setRowData(courserowData);
    this.loading = false;
  }
  clear() {
    this.loading = true;
    this.kecheng = '';

    this.ji = '';
    this.zhuanye = '';
    this.yuanxi = '';

    this.jiaoshi = '';
    this.jnum = '';

    this.cji = '';
    this.cyuanxi = '';
    this.czy = '';

    this.sname = '';
    this.sxh = '';

    this.scorename = '';
    this.sxueke = '';
    this.sxuenian = '';

    this.steachern = '';
    this.scxuenian = '';
    this.sckcId = '';


    this.loading = false;

  }

  searchall() {
    if (this.business.name === 'course') {
      this.gridApi.setRowData(this.allcourses);
    }
    if (this.business.name === 'major') {
      this.gridApi.setRowData(this.allmajors);
    }
    if (this.business.name === 'teacher') {
      this.gridApi.setRowData(this.allteachers);
    }
    if (this.business.name === 'class') {
      this.gridApi.setRowData(this.allclasses);
    }
    if (this.business.name === 'student') {
      this.gridApi.setRowData(this.allstudents);
    }
    if (this.business.name === 'score') {
      this.gridApi.setRowData(this.allscores);
    }
    if (this.business.name === 'courseSchedule') {
      this.gridApi.setRowData(this.allcourseSchedules);
    }
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

  searchMatchTwoCycleResult(fistst: string, secost: string, value: string, isfullmatch: boolean, allresult: any[]): any[] {
    if (value !== null && value !== '') {
      const resultrowData = new Array<any>();
      allresult.forEach(e => {
        const v = Reflect.get(e, fistst);
        const v2 = Reflect.get(v, secost);

        if (isfullmatch) {
          if (v2 && v2 === value) {
            resultrowData.push(e);
          }
        } else {
          if (v2 && v2.indexOf(value) === 0) {
            resultrowData.push(e);
          }
        }
      });
      return resultrowData;
    } else {
      return allresult;
    }

  }

  searchMatchThreeCycleResult(fistst: string, secost: string,
                              thirdst: string, value: string, isfullmatch: boolean, allresult: any[]): any[] {
    if (value !== null && value !== '') {
      const resultrowData = new Array<any>();
      allresult.forEach(e => {
        const v = Reflect.get(e, fistst);
        const v2 = Reflect.get(v, secost);
        const v3 = Reflect.get(v2, thirdst);

        if (isfullmatch) {
          if (v3 && v3 === value) {
            resultrowData.push(e);
          }
        } else {
          if (v3 && v3.indexOf(value) === 0) {
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

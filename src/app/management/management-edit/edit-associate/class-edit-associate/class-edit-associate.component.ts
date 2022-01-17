import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
import { Business, businessList } from 'src/app/models/business';
import { Class } from 'src/app/models/class';

@Component({
  selector: 'pm-class-edit-associate',
  templateUrl: './class-edit-associate.component.html',
  styleUrls: ['./class-edit-associate.component.css']
})
export class ClassEditAssociateComponent implements OnInit {
  searchGrade: string;
  searchDepartment: string;
  searchMajorName: string;
  searchClassNumber: string;
  searchClasses: Class[];
  currentData: any;
  business: Business;
  loading: boolean;
  errorMessage: string;
  allClasses: Class[];
  allGrade = [];
  allDepartment = [];
  allMajorName = [];
  allClassNumber = [];

  constructor(private managementService: ManagementService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.errorMessage = '';
    this.business = businessList.find(b => b.name === this.activatedRoute.snapshot.parent.paramMap.get('business'));
    this.activatedRoute.parent.data.subscribe(data => {
      this.currentData = data['infoResolvedData'].data;
      if (this.business.name === 'courseSchedule') {
        this.searchGrade = this.currentData.teacherCourseInfo.class.major.grade;
        this.searchDepartment = this.currentData.teacherCourseInfo.class.major.department;
        this.searchMajorName = this.currentData.teacherCourseInfo.class.major.majorName;
        this.searchClassNumber = this.currentData.teacherCourseInfo.class.classNumber;
      } else {
        this.searchGrade = this.currentData.class.major.grade;
        this.searchDepartment = this.currentData.class.major.department;
        this.searchMajorName = this.currentData.class.major.majorName;
        this.searchClassNumber = this.currentData.class.classNumber;
      }
      this.allClasses = data['infoResolvedData'].classes;
      this.getAllGrade();
      if (this.searchGrade) {
        this.onGradeChange();
      }
      if (this.searchDepartment) {
        this.onDepartmentChange();
      }
      if (this.searchMajorName) {
        this.onMajorNameChange();
      }
    });
    this.loading = false;
  }

  searchInfo() {
    this.loading = true;
    this.errorMessage = '';
    this.managementService.searchClasses(this.searchGrade && this.searchGrade.length !== 0 ? this.searchGrade : null,
      this.searchDepartment && this.searchDepartment.length !== 0 ? this.searchDepartment : null,
      this.searchMajorName && this.searchMajorName.length !== 0 ?  this.searchMajorName : null,
      this.searchClassNumber && this.searchClassNumber.length !== 0 ?  this.searchClassNumber : null).subscribe(data => {
        this.searchClasses = data;
        if (this.searchClasses == null || this.searchClasses.length <= 0) {
          this.errorMessage = '无查询结果';
        }
        this.loading = false;
      });
  }
  choseClass(data: Class) {
    if (this.business.name === 'courseSchedule') {
      this.currentData.teacherCourseInfo.class = data;
    } else {
      this.currentData.class = data;
      this.currentData.major = data.major;
    }
    this.router.navigate(['/management', this.business.name, 'edit',
    this.currentData.id, this.business.subTab]);
  }

  getAllGrade() {
    this.allClasses.forEach(c => this.allGrade.push(c.major.grade));
  }

  onGradeChange() {
    this.allClasses.filter(c => c.major.grade === this.searchGrade).forEach(c => this.allDepartment.push(c.major.department));
  }

  onDepartmentChange() {
    this.allClasses.filter(c => c.major.grade === this.searchGrade && c.major.department === this.searchDepartment)
    .forEach(c => this.allMajorName.push(c.major.majorName));
  }

  onMajorNameChange() {
    this.allClasses.filter(c => c.major.grade === this.searchGrade
      && c.major.department === this.searchDepartment
      && c.major.majorName === this.searchMajorName)
    .forEach(c => this.allClassNumber.push(c.classNumber));
  }

  onClassNumberChange() {
    this.choseClass(this.allClasses
      .filter(c => c.major.grade === this.searchGrade
        && c.major.department === this.searchDepartment
        && c.major.majorName === this.searchMajorName
        && c.classNumber === this.searchClassNumber)[0]);
  }
}

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
  loading:boolean;
  errorMessage:string;

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
    });
    this.loading = false;
  }

  searchInfo() {
    this.loading = true;
    this.errorMessage = '';
    this.managementService.searchClasses(this.searchGrade,
      this.searchDepartment, this.searchMajorName, this.searchClassNumber).subscribe(data => {
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
}

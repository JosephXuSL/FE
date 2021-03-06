import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
import { Business, businessList } from 'src/app/models/business';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'pm-teacher-edit-associate',
  templateUrl: './teacher-edit-associate.component.html',
  styleUrls: ['./teacher-edit-associate.component.css']
})
export class TeacherEditAssociateComponent implements OnInit {
  searchName: string;
  searchTeachers: Teacher[];
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
      if (this.business.name === 'class') {
        this.searchName = this.currentData.mentor.name;
      }
      if (this.business.name === 'courseSchedule') {
        this.searchName = this.currentData.teacherCourseInfo.teacher.name;
      }
    });
    this.loading = false;
  }

  searchInfo() {
    this.loading = true;
    this.errorMessage = '';
    this.managementService.searchTeachers(this.searchName).subscribe(data => {
        this.searchTeachers = data;
        if (this.searchTeachers == null || this.searchTeachers.length <= 0) {
          this.errorMessage = '无查询结果';
        }
        this.loading = false;
      });
  }

  choseData(teacher: Teacher) {
    if (this.business.name === 'class') {
      this.currentData.mentor = teacher;
    }
    if (this.business.name === 'courseSchedule') {
      this.currentData.teacherCourseInfo.teacher = teacher;
    }
    this.router.navigate(['/management', this.business.name, 'edit',
    this.currentData.id, this.business.subTab]);
  }

}

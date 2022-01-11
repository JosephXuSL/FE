import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
import { Business, businessList } from 'src/app/models/business';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'pm-course-edit-associate',
  templateUrl: './course-edit-associate.component.html',
  styleUrls: ['./course-edit-associate.component.css']
})
export class CourseEditAssociateComponent implements OnInit {
  searchCourseName: string;
  searchCourses: Course[];
  currentData: any;
  business: Business;
  loading: boolean;
  errorMessage: string;

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
        this.searchCourseName = this.currentData.teacherCourseInfo.course.courseName;
      } else {
        this.searchCourseName = this.currentData.course.courseName;
      }
    });
    this.loading = false;
  }

  searchInfo() {
    this.loading = true;
    this.errorMessage = '';
    this.managementService.searchCourses(this.searchCourseName).subscribe(data => {
        this.searchCourses = data;
        if (this.searchCourses == null || this.searchCourses.length <= 0) {
          this.errorMessage = '无查询结果';
        }
        this.loading = false;
      });
  }

  choseCourse(course: Course) {
    if (this.business.name === 'courseSchedule') {
      this.currentData.teacherCourseInfo.course = course;
    } else {
      this.currentData.course = course;
    }
    this.router.navigate(['/management', this.business.name, 'edit',
    this.currentData.id, this.business.subTab]);
  }


}

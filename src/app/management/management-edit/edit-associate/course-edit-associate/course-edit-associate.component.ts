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

  constructor(private managementService: ManagementService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      this.currentData = data['infoResolvedData'].data;
      this.searchCourseName = this.currentData.course.courseName;
    });
    this.business = businessList.find(b => b.name === this.activatedRoute.snapshot.parent.paramMap.get('business'));
  }

  searchInfo() {
    this.managementService.searchCourses(this.searchCourseName).subscribe(data => {
        this.searchCourses = data;
      });
  }

  choseCourse(course: Course) {
    this.currentData.course = course;
    this.router.navigate(['/management', this.business.name, 'edit',
    this.currentData.id, this.business.subTab]);
  }


}
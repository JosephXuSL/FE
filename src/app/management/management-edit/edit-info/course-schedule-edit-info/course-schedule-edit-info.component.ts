import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseSchedule } from 'src/app/models/courseSchedule';

@Component({
  selector: 'pm-course-schedule-edit-info',
  templateUrl: './course-schedule-edit-info.component.html',
  styleUrls: ['./course-schedule-edit-info.component.css']
})
export class CourseScheduleEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) courseScheduleForm: NgForm;

  errorMessage: string;
  courseSchedule: CourseSchedule;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      if (this.courseScheduleForm) {
        this.courseScheduleForm.reset();
      }

      this.courseSchedule = data['infoResolvedData'].data;
    });
  }

  selectClass() {
    this.router.navigate(['/management/courseSchedule/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'classAssociate']);
  }

  selectTeacher() {
    this.router.navigate(['/management/courseSchedule/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'teacherAssociate']);
  }

  selectCourse() {
    this.router.navigate(['/management/courseSchedule/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'courseAssociate']);
  }
}

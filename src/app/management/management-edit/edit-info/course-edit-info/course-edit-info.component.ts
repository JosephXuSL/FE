import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/models/course';

@Component({
  selector: 'pm-course-edit-info',
  templateUrl: './course-edit-info.component.html',
  styleUrls: ['./course-edit-info.component.css']
})
export class CourseEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) courseForm: NgForm;

  errorMessage: string;
  course: Course;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      if (this.courseForm) {
        this.courseForm.reset();
      }

      this.course = data['infoResolvedData'].data;
    });
  }
}

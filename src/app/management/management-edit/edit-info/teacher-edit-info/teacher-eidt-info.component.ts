import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'pm-teacher-eidt-info',
  templateUrl: './teacher-eidt-info.component.html',
  styleUrls: ['./teacher-eidt-info.component.css']
})
export class TeacherEidtInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) teacherForm: NgForm;

  errorMessage: string;
  teacher: Teacher;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      if (this.teacherForm) {
        this.teacherForm.reset();
      }

      this.teacher = data['infoResolvedData'].data;
    });
  }
}

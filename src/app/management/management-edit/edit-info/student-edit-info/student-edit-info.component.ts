import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from 'src/app/api-client';

@Component({
  selector: 'pm-student-edit-info',
  templateUrl: './student-edit-info.component.html',
  styleUrls: ['./student-edit-info.component.css']
})
export class StudentEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) studentForm: NgForm;

  errorMessage: string;
  student: Student;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      if (this.studentForm) {
        this.studentForm.reset();
      }

      this.student = data['infoResolvedData'].data;
    });
  }

  selectClass() {
    this.router.navigate(['/management/student/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'classAssociate']);
  }
}

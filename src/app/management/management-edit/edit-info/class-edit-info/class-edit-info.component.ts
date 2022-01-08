import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Class } from 'src/app/api-client';

@Component({
  selector: 'pm-class-edit-info',
  templateUrl: './class-edit-info.component.html',
  styleUrls: ['./class-edit-info.component.css']
})
export class ClassEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) classForm: NgForm;

  errorMessage: string;
  class: Class;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      if (this.classForm) {
        this.classForm.reset();
      }

      this.class = data['infoResolvedData'].data;
    });
  }

  selectMajor() {
    this.router.navigate(['/management/class/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'majorAssociate']);
  }

  selectTeacher() {
    this.router.navigate(['/management/class/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'teacherAssociate']);
  }

}

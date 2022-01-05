import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Major } from 'src/app/models/major';

@Component({
  selector: 'pm-major-edit-info',
  templateUrl: './major-edit-info.component.html',
  styleUrls: ['./major-edit-info.component.css']
})
export class MajorEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) majorForm: NgForm;

  errorMessage: string;
  major: Major;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      if (this.majorForm) {
        this.majorForm.reset();
      }

      this.major = data['infoResolvedData'].data;
    });
  }

}

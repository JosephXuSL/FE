import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Score } from 'src/app/models/score';

@Component({
  selector: 'pm-score-import-info',
  templateUrl: './score-import-info.component.html',
  styleUrls: ['./score-import-info.component.css']
})
export class ScoreImportInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) scoreForm: NgForm;

  errorMessage: string;
  score: Score;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
            this.score = data['infoResolvedData'].data;
    });
  }

  selectMajor() {
    this.router.navigate(['/management/score/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'majorAssociate']);
  }

  selectCourse() {
    this.router.navigate(['/management/score/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'courseAssociate']);
  }
}

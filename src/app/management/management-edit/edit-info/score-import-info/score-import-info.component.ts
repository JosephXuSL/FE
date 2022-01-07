import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import { Score, StudentNumberAndScore } from 'src/app/models/score';

@Component({
  selector: 'pm-score-import-info',
  templateUrl: './score-import-info.component.html',
  styleUrls: ['./score-import-info.component.css']
})
export class ScoreImportInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) classForm: NgForm;

  errorMessage: string;
  score: Score;
  count = 0 ;

  columnDefs: ColDef[] = [
    {
      lockPosition: true,
      valueGetter: 'node.rowIndex +1',
      cellClass: 'locked-col',
      width: 60,
      suppressNavigable: true
    },
    {headerName: '学号', field: 'studentNumber', lockPosition: true, editable: true},
    {headerName: '分数', field: 'score', lockPosition: true, editable: true}
  ];
  rowData = [];

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      if (this.classForm) {
        this.classForm.reset();
      }

      this.score = data['infoResolvedData'].data;
    });
  }

  selectMajor() {
    this.router.navigate(['/management/score/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'majorAssociate']);
  }

  selectCourse() {
    this.router.navigate(['/management/score/edit', this.activatedRoute.snapshot.parent.paramMap.get('id'), 'courseAssociate']);
  }

  generateTable() {
    this.rowData = [];
    for (let i = 0; i < this.count; i++) {
      this.rowData.push(new StudentNumberAndScore());
    }
    this.gridApi.setRowData(this.rowData);
    this.gridApi.sizeColumnsToFit();
  }

  saveInfo() {
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
}

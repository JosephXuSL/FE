import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnApi, GridApi } from 'ag-grid-community';
import { Observable } from 'rxjs';

import { Business, businessList } from '../models/business';
import { AgGrideService } from './service/ag-gride.service';

@Component({
  selector: 'pm-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {
  business: Business;
  errorMessage = '';
  columnDefs = [];
  rowData: any;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(private activatedRoute: ActivatedRoute, private agGrideService: AgGrideService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.business = businessList.find(b => b.name === param.business);
      this.columnDefs = this.agGrideService.getColumnDefs(this.business);
    });
    this.activatedRoute.data.subscribe(data => {
      this.rowData = data.listResolvedData;
    });
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }

}

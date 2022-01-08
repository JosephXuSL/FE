import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { GridApi, ColumnApi } from 'ag-grid-community';
import { Business, businessList } from 'src/app/models/business';
import { AgGrideService } from '../../service/ag-gride.service';

@Component({
  selector: 'pm-detail-associate',
  templateUrl: './detail-associate.component.html',
  styleUrls: ['./detail-associate.component.css']
})
export class DetailAssociateComponent implements OnInit {
  business: Business;
  errorMessage = '';
  columnDefs = [];
  rowData: any;

  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

  constructor(
    private activatedRoute: ActivatedRoute,
    private agGrideService: AgGrideService,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.business = businessList.find(b => b.name === param.associate);
      this.columnDefs = this.agGrideService.getColumnDefs(this.business);
    });
    this.activatedRoute.data.subscribe(data => {
      this.rowData = data.listResolvedData;
    });
  }

  onRowDoubleClicked(params) {
    const routerParams: NavigationExtras = {
      queryParams: {
        detail: JSON.stringify(params.data)
      }
    };
    this.router.navigate(['/management', this.business.name, params.data.id], routerParams);
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
  }
}

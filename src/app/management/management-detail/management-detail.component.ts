import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Business, businessList } from 'src/app/models/business';
import { ManagementService } from '../service/management.service';

@Component({
  selector: 'pm-management-detail',
  templateUrl: './management-detail.component.html',
  styleUrls: ['./management-detail.component.css']
})
export class ManagementDetailComponent implements OnInit {
  detail: any;
  business: Business;
  associateBusiness: Business[];
  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private managementService: ManagementService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(data => {
      this.detail = JSON.parse(data.detail);
    });
    this.activatedRoute.params.subscribe(param => {
      this.business = businessList.find(b => b.name === param.business);
      this.associateBusiness = businessList
      .filter(b => this.business.associateBusiness && this.business.associateBusiness.indexOf( b.name) !== -1);
    });
  }

  viewAll(associateName: string) {
    this.router.navigate(['/management', this.business.name, this.detail.id, associateName]);
  }

  removeSelection() {
    if ( confirm('确认删除数据？')) {
      this.managementService.removeDataById(this.business.name, this.detail.id).subscribe(data => {
        if (data.result) {
          this.router.navigate(['/management', this.business.name]);
        }
        if (!data.result && data.error) {
          alert('当前删除信息正被其他信息使用， 不能被删除！');
        }
      });
    }
  }

}

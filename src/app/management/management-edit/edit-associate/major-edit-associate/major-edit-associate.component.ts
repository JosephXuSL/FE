import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
import { Business, businessList } from 'src/app/models/business';
import { Major } from 'src/app/models/major';

@Component({
  selector: 'pm-major-edit-associate',
  templateUrl: './major-edit-associate.component.html',
  styleUrls: ['./major-edit-associate.component.css']
})
export class MajorEditAssociateComponent implements OnInit {
  searchGrade: string;
  searchDepartment: string;
  searchMajorName: string;
  searchMajors: Major[];
  currentData: any;
  business: Business;
  loading:boolean;
  errorMessage:string;

  constructor(private managementService: ManagementService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.errorMessage = '';
    this.activatedRoute.parent.data.subscribe(data => {
      this.currentData = data['infoResolvedData'].data;
      this.searchGrade = this.currentData.major.grade;
      this.searchDepartment = this.currentData.major.department;
      this.searchMajorName = this.currentData.major.majorName;
    });
    this.business = businessList.find(b => b.name === this.activatedRoute.snapshot.parent.paramMap.get('business'));
    this.loading = false;
  }

  searchInfo() {
    this.loading = true;
    this.errorMessage = '';
    this.managementService.searchMajors(this.searchGrade && this.searchGrade.length != 0 ? this.searchGrade : null,
      this.searchDepartment && this.searchDepartment.length != 0 ? this.searchDepartment : null , 
      this.searchMajorName && this.searchMajorName.length != 0 ?  this.searchMajorName : null)
      .subscribe(data => {
        this.searchMajors = data;
        if (this.searchMajors == null || this.searchMajors.length <= 0) {
          this.errorMessage = '无查询结果';
        }
        this.loading = false;
      });
  }

  choseMajor(major: Major) {
    this.currentData.major = major;
    this.router.navigate(['/management', this.business.name, 'edit',
    this.currentData.id, this.business.subTab]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
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

  constructor(private managementService: ManagementService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      this.currentData = data['infoResolvedData'].data;
      console.log(this.currentData);
      this.searchGrade = this.currentData.major.grade;
      this.searchDepartment = this.currentData.major.department;
      this.searchMajorName = this.currentData.major.majorName;
    });
  }

  searchInfo() {
    this.managementService.searchMajors(this.searchGrade,
      this.searchDepartment, this.searchMajorName).subscribe(data => {
        this.searchMajors = data;
      });
  }

  choseMajor(major: Major) {
    this.currentData.major = major;
    this.router.navigate(['/management/class/edit/0/classInfo']);
  }
}

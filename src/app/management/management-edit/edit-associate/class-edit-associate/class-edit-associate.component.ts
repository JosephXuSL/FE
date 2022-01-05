import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
import { Class } from 'src/app/models/class';

@Component({
  selector: 'pm-class-edit-associate',
  templateUrl: './class-edit-associate.component.html',
  styleUrls: ['./class-edit-associate.component.css']
})
export class ClassEditAssociateComponent implements OnInit {
  searchGrade: string;
  searchDepartment: string;
  searchMajorName: string;
  searchClassNumber: string;
  searchClasses: Class[];
  currentData: any;

  constructor(private managementService: ManagementService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      this.currentData = data['infoResolvedData'].data;
      console.log(this.currentData);
      this.searchGrade = this.currentData.class.major.grade;
      this.searchDepartment = this.currentData.class.major.department;
      this.searchMajorName = this.currentData.class.major.majorName;
      this.searchClassNumber = this.currentData.class.classNumber;
    });
  }

  searchInfo() {
    this.managementService.searchClasses(this.searchGrade,
      this.searchDepartment, this.searchMajorName, this.searchClassNumber).subscribe(data => {
        this.searchClasses = data;
      });
  }
  choseClass(data: Class) {
    this.currentData.class = data;
    this.currentData.major = data.major;
    this.router.navigate(['/management/student/edit/0/studentInfo']);
  }
}

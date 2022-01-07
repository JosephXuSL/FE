import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
import { Business, businessList } from 'src/app/models/business';
import { Teacher } from 'src/app/models/teacher';

@Component({
  selector: 'pm-teacher-edit-associate',
  templateUrl: './teacher-edit-associate.component.html',
  styleUrls: ['./teacher-edit-associate.component.css']
})
export class TeacherEditAssociateComponent implements OnInit {
  searchName: string;
  searchTeachers: Teacher[];
  currentData: any;
  business: Business;

  constructor(private managementService: ManagementService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      this.currentData = data['infoResolvedData'].data;
      this.searchName = this.currentData.mentor.name;
    });
    this.business = businessList.find(b => b.name === this.activatedRoute.snapshot.parent.paramMap.get('business'));
  }

  searchInfo() {
    this.managementService.searchTeachers(this.searchName).subscribe(data => {
        this.searchTeachers = data;
      });
  }

  choseData(teacher: Teacher) {
    this.currentData.mentor = teacher;
    this.router.navigate(['/management', this.business.name, 'edit',
    this.currentData.id, this.business.subTab]);
  }

}

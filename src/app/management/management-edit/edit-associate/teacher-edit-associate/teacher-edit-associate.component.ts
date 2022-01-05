import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagementService } from 'src/app/management/service/management.service';
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

  constructor(private managementService: ManagementService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe(data => {
      this.currentData = data['infoResolvedData'].data;
      console.log(this.currentData);
      this.searchName = this.currentData.mentor.name;
    });
  }

  searchInfo() {
    this.managementService.searchTeachers(this.searchName).subscribe(data => {
        this.searchTeachers = data;
      });
  }

  choseMajor(teacher: Teacher) {
    this.currentData.mentor = teacher;
    this.router.navigate(['/management/class/edit/0/classInfo']);
  }

}

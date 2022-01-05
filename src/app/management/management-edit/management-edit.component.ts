import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { Major} from 'src/app/models/major';

import { businessList, Business } from '../../models/business';
import { ManagementService } from '../service/management.service';

@Component({
  selector: 'pm-management-edit',
  templateUrl: './management-edit.component.html',
  styleUrls: ['./management-edit.component.css']
})
export class ManagementEditComponent implements OnInit {
  pageTitle = '修改';
  errorMessage = '';
  business: Business;
  info: any;

  private dataIsValid: { [key: string]: boolean } = {};

  get isDirty(): boolean {
    return JSON.stringify(this.originalInfo) !== JSON.stringify(this.currentInfo);
  }

  private currentInfo: any;
  private originalInfo: any;

  get product(): any {
    return this.currentInfo;
  }
  set product(value: any) {
    this.currentInfo = value;
    // Clone the object to retain a copy
    this.originalInfo = { ...value };
  }

  constructor(private activatedRoute: ActivatedRoute,
              private managementService: ManagementService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(param => {
      this.business = businessList.find(b => b.name === param.business);
    });
    this.activatedRoute.data.subscribe(data => {
      const infoResolvedData: any = data['infoResolvedData'];
      this.errorMessage = infoResolvedData.error;
      this.onInfoRetrieved(infoResolvedData.data);
    });
  }

  onInfoRetrieved(data: any): void {
    this.info = data;

    if (!this.info) {
      this.pageTitle = '暂无';
    } else {
      if (this.info.id === 0) {
        this.pageTitle = `添加${this.business.nameForShow}`;
      } else {
        this.pageTitle = `修改${this.business.nameForShow} : ${this.info.majorName}`;
      }
    }
  }

  isValid(path?: string): boolean {
    this.validate();
    if (path) {
      return this.dataIsValid[path];
    }
    return (this.dataIsValid &&
      Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
  }

  validate(): void {
    // Clear the validation object
    this.dataIsValid = {};
    this.validateTab(this.business.name);
  }

  validateTab(business: string): void {
    switch (business) {
      case 'course':
        if (this.info.courseName) {
          this.dataIsValid[this.business.subTab] = true;
        } else {
          this.dataIsValid[this.business.subTab] = false;
        }
        return;
      case 'major':
        if (this.info.department &&
          this.info.grade &&
          this.info.majorName) {
          this.dataIsValid[this.business.subTab] = true;
        } else {
          this.dataIsValid[this.business.subTab] = false;
        }
        return;
       case 'teacher':
        if (this.info.name &&
          this.info.teacherNumber) {
          this.dataIsValid[this.business.subTab] = true;
        } else {
          this.dataIsValid[this.business.subTab] = false;
        }
        return;
      case 'class':
        if (this.info.classNumber &&
          this.info.major.id &&
          this.info.mentor.id) {
          this.dataIsValid[this.business.subTab] = true;
        } else {
          this.dataIsValid[this.business.subTab] = false;
        }
        this.business.subAssociateTab.forEach(a => {
          this.validateAssociateTab(a.name);
        });
        return;
    }
  }

  validateAssociateTab(tab: string): void {
    switch (tab) {
      case 'majorAssociate':
        if (this.info.major.id > 0) {
          this.dataIsValid[tab] = true;
        } else {
          this.dataIsValid[tab] = false;
        }
        return;
      case 'teacherAssociate':
        if (this.info.mentor.id > 0) {
          this.dataIsValid[tab] = true;
        } else {
          this.dataIsValid[tab] = false;
        }
        return;
    }
  }

  saveInfo() {
    if (this.isValid()) {
      if (this.info.id === 0) {
        this.managementService.addInfo(this.business.name, this.info).subscribe({
          next: () => this.onSaveComplete(`The new ${this.info.majorName} was saved`)
        });
      } else {
        this.managementService.addInfo(this.business.name, this.info).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.info.majorName} was saved`)
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      // this.messageService.addMessage(message);
    }
    this.reset();

    // Navigate back to the product list
    this.router.navigate(['/management', this.business.name]);
  }

  reset(): void {
    this.dataIsValid = null;
    this.currentInfo = null;
    this.originalInfo = null;
  }
}

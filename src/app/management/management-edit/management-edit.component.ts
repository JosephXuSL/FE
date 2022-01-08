import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, ColumnApi, GridApi } from 'ag-grid-community';
import { Course } from 'src/app/models/course';
import { Major } from 'src/app/models/major';
import { Score, StudentNumberAndScore } from 'src/app/models/score';

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
  isBasicInformationPage: boolean;
  hiddenInsertTable = true;

  columnDefs: ColDef[] = [
    {
      lockPosition: true,
      headerName: '序号',
      field: 'id',
      cellClass: 'locked-col',
      width: 60,
      suppressNavigable: true
    },
    {headerName: '学号', field: 'studentNumber', lockPosition: true, editable: true},
    {headerName: '分数', field: 'score', lockPosition: true, editable: true,  valueParser: this.numberParser}
  ];
  rowData = [];
  count = 0 ;
  private dataIsValid: { [key: string]: boolean } = {};
  private gridApi: GridApi;
  private gridColumnApi: ColumnApi;

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
    this.isBasicInformationPage = this.business.name === 'information';
  }

  onInfoRetrieved(data: any): void {
    this.info = data;

    if (!this.info) {
      this.pageTitle = '暂无';
    } else {
      if (this.info.id === 0) {
        this.pageTitle = `添加${this.business.nameForShow}`;
      } else {
        this.pageTitle = `修改${this.business.nameForShow}`;
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
      case 'student':
        if (this.info.name && this.info.sex && this.info.identityCardNumber &&
          this.info.studentNumber && this.info.homeAddress && this.info.phoneNumber &&
          this.info.major.id > 0 && this.info.class.id > 0) {
          this.dataIsValid[this.business.subTab] = true;
        } else {
          this.dataIsValid[this.business.subTab] = false;
        }
        this.business.subAssociateTab.forEach(a => {
          this.validateAssociateTab(a.name);
        });
        return;
      case 'score':
        if (this.info.semester && this.info.course.id > 0 && this.info.major.id > 0 ) {
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
      case 'classAssociate':
        if (this.info.class.id > 0) {
          this.dataIsValid[tab] = true;
        } else {
          this.dataIsValid[tab] = false;
        }
        return;
        case 'courseAssociate':
          if (this.info.course.id > 0) {
            this.dataIsValid[tab] = true;
          } else {
            this.dataIsValid[tab] = false;
          }
          return;
    }
  }

  saveInfo() {
    if (this.isValid()) {
      this.managementService.saveInfo(this.business.name, this.info).subscribe({
        next: () => this.onSaveComplete(`保存成功`)
      });
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

  numberParser(params) {
    return Number(params.newValue);
  }

  generateTable() {
    this.hiddenInsertTable = false;
    this.rowData = [];
    for (let i = 0; i < this.count; i++) {
      const data = new StudentNumberAndScore();
      data.id = i + 1;
      this.rowData.push(data);
    }
    this.gridApi.setRowData(this.rowData);
    this.gridApi.sizeColumnsToFit();
  }

  importInfo() {
    if (this.rowData.find(d => !d.studentNumber)) {
      if (!confirm('数据中有学号为空项， 继续保存将从数据中移除')) {
          return;
          }
      const scoreList = [];
      for (const data of this.rowData) {
        if (data.studentNumber) {
          const scoreData = new Score();
          scoreData.major = this.info.major;
          scoreData.semester = this.info.semester;
          scoreData.course = this.info.course;
          scoreData.student.studentNumber = data.studentNumber;
          scoreData.score = data.score;
          scoreList.push(scoreData);
        }
      }
      this.managementService.addScores(this.info).subscribe({
        next: () => this.onSaveComplete(`The new ${this.info.majorName} was saved`)
      });
    }
  }

  onCellValueChanged(event) {
    const updateDate = this.rowData.find(d => d.id === event.data.id);
    updateDate.studentNumber = event.data.studentNumber;
    updateDate.score = event.data.score;
  }

  closeTable() {
    this.hiddenInsertTable = true;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
  }
}

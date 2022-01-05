import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Business } from 'src/app/models/business';
import { Class } from 'src/app/models/class';
import { Course } from 'src/app/models/course';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { ApiClient, ClassInfoRequestBody, GetMajorRequestBody} from '../../api-client';
import { Major } from '../../models/major';
import { ManagementServiceMapper } from './management.service.mapper';

@Injectable({ providedIn: 'root' })
export class ManagementService {
  constructor(private apiClient: ApiClient) { }

  getAllListData(business: string): Observable<any> {
    switch (business) {
      case 'course':
        return this.getAllCourses();
      case 'major':
        return this.getAllMajors();
      case 'teacher':
        return this.getAllTeachers();
      case 'class':
        return this.getAllClasses();
      case 'student':
        return this.getAllStudents();
    }
  }

  getAllCourses(): Observable<Course[]> {
    return this.apiClient.getAllCourses().pipe(map(courses => {
      return courses.map(c => {
        return ManagementServiceMapper.mapCourseInput(c);
      });
    }));
  }

  getAllMajors(): Observable<Major[]> {
    return this.apiClient.getAllMajors().pipe(map(majors => {
      return majors.map(m => {
        return ManagementServiceMapper.mapMajorInput(m);
      });
    }));
  }

  getAllTeachers(): Observable<Teacher[]> {
    return this.apiClient.getAllTeachers().pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapTeacherInput(d);
      });
    }));
  }

  getAllClasses(): Observable<Class[]> {
    return this.apiClient.getAllClasses().pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapClassInput(d);
      });
    }));
  }

  getAllStudents(): Observable<Student[]> {
    return this.apiClient.getAllStudents().pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapStudentInput(d);
      });
    }));
  }

  getInfoData(business: string, id: number): Observable<any> {
    if (id === 0) {
      return of(this.initializeInfo(business));
    }
    switch (business) {
      case 'course':
        return this.getCourse(id);
      case 'major':
        return this.getMajor(id);
      case 'teacher':
        return this.getTeacher(id);
      case 'class':
        return this.getClass(id);
      // case 'student':
      //   return this.getStudent(id);
    }

  }

  getCourse(id: number): Observable<Course> {
    const idList = [];
    idList.push(id);
    return this.apiClient.getCoursesByIds(idList).pipe(map(data => {
      return ManagementServiceMapper.mapCourseInput(data[0]);
    }));
  }

  getMajor(id: number): Observable<Major> {
    const idList = [];
    idList.push(id);
    return this.apiClient.getMajorByIds(idList).pipe(map(data => {
      return ManagementServiceMapper.mapMajorInput(data[0]);
    }));
  }

  getTeacher(id: number): Observable<Teacher> {
    const idList = [];
    idList.push(id);
    return this.apiClient.getTeacherByIds(idList).pipe(map(data => {
      return ManagementServiceMapper.mapTeacherInput(data[0]);
    }));
  }

  getClass(id: number): Observable<Class> {
    const idList = [];
    idList.push(id);
    return this.apiClient.getClassesByIds(idList).pipe(map(data => {
      return ManagementServiceMapper.mapClassInput(data[0]);
    }));
  }

  // getStudent(id: number): Observable<Student> {
  //   const idList = [];
  //   idList.push(id);
  //   return this.apiClient.getStudnetByIds(idList).pipe(map(data => {
  //     return ManagementServiceMapper.mapClassInput(data[0]);
  //   }));
  // }

  addInfo(business: string, info: any): Observable<any> {
    switch (business) {
      case 'course':
        return this.addCourse(info);
      case 'major':
        return this.addMajor(info);
      case 'teacher':
        return this.addTeacher(info);
      case 'class':
        return this.addClass(info);
      case 'student':
        return this.addStudent(info);
    }
  }

  addCourse(course: Course): Observable<any> {
    const courses = [];
    courses.push(ManagementServiceMapper.mapCourseOutput(course));
    return this.apiClient.addCourses(courses);
  }

  addMajor(major: Major): Observable<any> {
    const majors = [];
    majors.push(ManagementServiceMapper.mapMajorOutput(major));
    return this.apiClient.addMajors(majors);
  }

  addTeacher(data: Teacher): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapTeacherOutput(data));
    return this.apiClient.addTeachers(saveData);
  }

  addClass(data: Class): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapClassOutput(data));
    return this.apiClient.addClasses(saveData);
  }

  addStudent(data: Student): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapStudentOutput(data));
    return this.apiClient.addStudents(saveData);
  }

  // saveInfo(business: string, info: any): Observable<any> {
  //   switch (business) {
  //     case 'course':
  //       return this.saveCourse(info);
  //     case 'major':
  //       return this.saveMajor(info);
  //     case 'teacher':
  //       return this.saveTeacher(info);
  //     case 'class':
  //       return this.saveClass(info);
  //   }
  // }

  // saveCourse(course: Course): Observable<any> {
  //   const courses = [];
  //   courses.push(ManagementServiceMapper.mapCourseOutput(course));
  //   return this.apiClient.updateCourses(courses);
  // }

  // saveMajor(major: Major): Observable<any> {
  //   const majors = [];
  //   majors.push(ManagementServiceMapper.mapMajorOutput(major));
  //   return this.apiClient.updateMajors(majors);
  // }

  // saveTeacher(info: Teacher): Observable<any> {
  //   const data = [];
  //   data.push(ManagementServiceMapper.mapTeacherOutput(info));
  //   return this.apiClient.updateTeachers(data);
  // }

  // saveClass(info: Class): Observable<any> {
  //   const data = [];
  //   data.push(ManagementServiceMapper.mapClassOutput(info));
  //   return this.apiClient.updateClasses(data);
  // }

  searchMajors(grade: string, department: string, majorName: string): Observable<Major[]> {
    const data = new GetMajorRequestBody();
    data.grade = grade;
    data.department = department;
    data.majorName = majorName;
    return this.apiClient.getMajors(data).pipe(map(majors => {
      return majors.map(m => {
        return ManagementServiceMapper.mapMajorInput(m);
      });
    }));
  }

  searchTeachers(name: string): Observable<Teacher[]> {
    return this.apiClient.findTeachersByName(name).pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapTeacherInput(d);
      });
    }));
  }

  searchClasses(grade: string, department: string, majorName: string, classNumber: string): Observable<Class[]> {
    const data = new ClassInfoRequestBody();
    data.grade = grade;
    data.department = department;
    data.majorName = majorName;
    data.classNumber = classNumber;
    return this.apiClient.getClassesByClassInfo(data).pipe(map(majors => {
      return majors.map(m => {
        return ManagementServiceMapper.mapClassInput(m);
      });
    }));
  }

  private handleError(err) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }

  private initializeInfo(business: string): any {
    switch (business) {
      case 'course':
        return new Course();
      case 'major':
        return new Major();
      case 'teacher':
        return new Teacher();
      case 'class':
        return new Class();
      case 'student':
        return new Student();
    }
  }


}

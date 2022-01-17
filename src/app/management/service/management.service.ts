import { Injectable } from '@angular/core';
import { forkJoin, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Business } from 'src/app/models/business';
import { Class } from 'src/app/models/class';
import { Course } from 'src/app/models/course';
import { CourseSchedule } from 'src/app/models/courseSchedule';
import { Score } from 'src/app/models/score';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { ApiClient, ClassInfoRequestBody, GetMajorRequestBody, TeacherAccount } from '../../api-client';
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
      case 'score':
        return this.getAllScore();
      case 'courseSchedule':
        return this.getAllCourseSchedule();
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

  getAllScore(): Observable<Score[]> {
    return this.apiClient.getAllExaminations().pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapScoreInput(d);
      });
    }));
  }

  getAllCourseSchedule(): Observable<CourseSchedule[]> {
    return this.apiClient.getAllCourseSchedule().pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapCourseScheduleInput(d);
      });
    }));
  }

  mapGetInfoData(info: Observable<any>): Observable<any> {
    return info.pipe(
      map(data => ({ data: data })),
      catchError(error => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ data: null, error: message });
      })
    );
  }

  getInfoData(business: string, id: number): Observable<any> {
    if (id === 0) {
      return this.initializeInfo(business);
    }
    switch (business) {
      case 'course':
        return this.mapGetInfoData(this.getCourse(id));
      case 'major':
        return this.mapGetInfoData(this.getMajor(id));
      case 'teacher':
        return this.mapGetInfoData(this.getTeacher(id));
      case 'class':
        return forkJoin([
          this.getClass(id),
          this.getAllMajors()
        ]).pipe(map(data => ({
          data : data[0],
          majors : data[1]
        })));
      case 'student':
        return forkJoin([
          this.getStudent(id),
          this.getAllClasses()
        ]).pipe(map(data => ({
          data : data[0],
          classes : data[1]
        })));
      case 'score':
        return forkJoin([
          this.getScore(id),
          this.getAllMajors()
        ]).pipe(map(data => ({
          data : data[0],
          majors : data[1]
        })));
      case 'courseSchedule':
        return forkJoin([
          this.getCourseSchedule(id),
          this.getAllClasses()
        ]).pipe(map(data => ({
          data : data[0],
          classes : data[1]
        })));
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

  getStudent(id: number): Observable<Student> {
    const idList = [];
    idList.push(id);
    return this.apiClient.getStudentsByIds(idList).pipe(map(data => {
      return ManagementServiceMapper.mapStudentInput(data[0]);
    }));
  }

  getScore(id: number): Observable<Score> {
    const idList = [];
    idList.push(id);
    return this.apiClient.getExaminationsByIds(idList).pipe(map(data => {
      return ManagementServiceMapper.mapScoreInput(data[0]);
    }));
  }

  getCourseSchedule(id: number): Observable<CourseSchedule> {
    const idList = [];
    idList.push(id);
    return this.apiClient.getCourseScheduleByIds(idList).pipe(map(data => {
      return ManagementServiceMapper.mapCourseScheduleInput(data[0]);
    }));
  }

  getListDataById(business: string, associate: string, id: number): Observable<any> {
    switch (business + associate) {
      case 'classstudent':
        return this.getStudentsByClassID(id);
      case 'classcourseSchedule':
        return this.getCourseScheduleByClassID(id);
    }
  }

  getStudentsByClassID(id: number) {
    return this.apiClient.getStudentsByClassId(id).pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapStudentInput(d);
      });
    }));
  }
  getCourseScheduleByClassID(id: number) {
    return this.apiClient.getCourseScheduleByClassId(id).pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapCourseScheduleInput(d);
      });
    }));
  }

  saveInfo(business: string, info: any): Observable<any> {
    switch (business) {
      case 'course':
        if (info.id === 0) {
          return this.addCourse(info);
        } else {
          return this.saveCourse(info);
        }
      case 'major':
        if (info.id === 0) {
          return this.addMajor(info);
        } else {
          return this.saveMajor(info);
        }
      case 'teacher':
        if (info.id === 0) {
          return this.addTeacher(info);
        } else {
          return this.saveTeacher(info);
        }
      case 'class':
        if (info.id === 0) {
          return this.addClass(info);
        } else {
          return this.saveClass(info);
        }
      case 'student':
        if (info.id === 0) {
          return this.addStudent(info);
        } else {
          return this.saveStudent(info);
        }
      case 'score':
        if (info.id === 0) {
          return of(null);
        } else {
          return this.saveScore(info) ;
        }
      case 'courseSchedule':
        if (info.id === 0) {
          return this.addCourseSchedule(info);
        } else {
          return this.saveCourseSchedule(info);
        }
    }
  }

  addCourse(course: Course): Observable<any> {
    const courses = [];
    courses.push(ManagementServiceMapper.mapCourseOutput(course));
    return this.apiClient.addCourses(courses);
  }

  saveCourse(course: Course): Observable<any> {
    const courses = [];
    courses.push(ManagementServiceMapper.mapCourseOutput(course));
    return this.apiClient.updateCourses(courses);
  }

  addMajor(major: Major): Observable<any> {
    const majors = [];
    majors.push(ManagementServiceMapper.mapMajorOutput(major));
    return this.apiClient.addMajors(majors);
  }

  saveMajor(major: Major): Observable<any> {
    const majors = [];
    majors.push(ManagementServiceMapper.mapMajorOutput(major));
    return this.apiClient.updateMajors(majors);
  }

  addTeacher(data: Teacher): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapTeacherOutput(data));
    return this.apiClient.addTeachers(saveData);
  }

  saveTeacher(info: Teacher): Observable<any> {
    const data = [];
    data.push(ManagementServiceMapper.mapTeacherOutput(info));
    return this.apiClient.updateTeachers(data);
  }

  addClass(data: Class): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapClassOutput(data));
    return this.apiClient.addClasses(saveData);
  }

  saveClass(info: Class): Observable<any> {
    const data = [];
    data.push(ManagementServiceMapper.mapClassOutput(info));
    return this.apiClient.updateClasses(data);
  }

  addStudent(data: Student): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapStudentOutput(data));
    return this.apiClient.addStudents(saveData);
  }

  saveStudent(data: Student): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapStudentOutput(data));
    return this.apiClient.updateStudents(saveData);
  }

  addScores(data: Score[]): Observable<string[]> {
    return this.apiClient.importExaminations(ManagementServiceMapper.mapScoreListOutput(data));
  }

  saveScore(data: Score): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapScoreOutput(data));
    return this.apiClient.updateExaminations(saveData);
  }

  addCourseSchedule(data: CourseSchedule): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapCourseScheduleOutput(data));
    return this.apiClient.addCourseSchedule(saveData);
  }

  addCourseScheduleList(data: CourseSchedule[]): Observable<any> {
    return this.apiClient.addCourseSchedule(ManagementServiceMapper.mapCourseScheduleListOutput(data));
  }

  saveCourseSchedule(data: CourseSchedule): Observable<any> {
    const saveData = [];
    saveData.push(ManagementServiceMapper.mapCourseScheduleOutput(data));
    return this.apiClient.updateCourseSchedule(saveData);
  }

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

  searchCourses(name: string): Observable<Course[]> {
    return this.apiClient.getCoursesByCourseName(name).pipe(map(data => {
      return data.map(d => {
        return ManagementServiceMapper.mapCourseInput(d);
      });
    }));
  }

  checkTeacherExistByTeacherNumber(teacherNumber: string) {
    return this.apiClient.checkTeacherByteacherNumber(teacherNumber);
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

  private initializeInfo(business: string): Observable<any> {
    switch (business) {
      case 'course':
        return this.mapGetInfoData(of(new Course()));
      case 'major':
        return this.mapGetInfoData(of(new Major()));
      case 'teacher':
        return this.mapGetInfoData(of(new Teacher()));
      case 'class':
        return forkJoin([
          of(new Class()),
          this.getAllMajors()
        ]).pipe(map(data => ({
          data : data[0],
          majors : data[1]
        })));
      case 'student':
        return forkJoin([
          of(new Student()),
          this.getAllClasses()
        ]).pipe(map(data => ({
          data : data[0],
          classes : data[1]
        })));
      case 'score':
        return forkJoin([
          of(new Score()),
          this.getAllMajors()
        ]).pipe(map(data => ({
          data : data[0],
          majors : data[1]
        })));
      case 'courseSchedule':
        return forkJoin([
          of(new CourseSchedule()),
          this.getAllClasses()
        ]).pipe(map(data => ({
          data : data[0],
          classes : data[1]
        })));
    }
  }
  searchTeacherAccountByName(name: string): Observable<TeacherAccount> {

    return this.apiClient

      .getTeacherAccountByTeacherNm(name)

      .pipe(map((res: TeacherAccount) => ManagementServiceMapper.mapTeacherAccountInput(res)));

  }

  public updateTeacherAccountPassword(name: string, passWord: string): boolean {
    let isscuess: boolean;
    this.apiClient
      .updateTeacherAccountPassWord(name, passWord, 'details')
      .subscribe(t => {
        if (t) {
          isscuess = true;
        } else {
          isscuess = false;
        }
      });
    return isscuess;

  }


}

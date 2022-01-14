import {
    Class as ClientClass, ClassRequestBody,
    Course as ClientCourse, CourseRequestBody,
    CourseResponsibleByTeacher,
    CourseResponsibleByTeacherRequestBody,
    CourseSchedule as ClientCourseSchedule,
    CourseScheduleRequestBody,
    Examination, ExaminationImportBody,
    ExaminationRequestBody,
    Major as ClientMajor, MajorRequestBody,
    Student as ClientStudent, StudentRequestBody,
    Teacher as ClientTeacher, TeacherAccount, TeacherRequestBody
} from 'src/app/api-client';
import { Class } from 'src/app/models/class';
import { Course } from 'src/app/models/course';
import { CourseSchedule } from 'src/app/models/courseSchedule';
import { Major } from 'src/app/models/major';
import { Score } from 'src/app/models/score';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';
import { TeacherCourseInfo } from 'src/app/models/teacherCourseInfo';

export class ManagementServiceMapper {

    static mapCourseOutput(course: Course): CourseRequestBody {
        const output = new CourseRequestBody();
        output.id = course.id;
        output.courseName = course.courseName;
        output.textbook = course.textbook;
        return output;
    }

    static mapCourseInput(course: ClientCourse): Course {
        const input = new Course();
        input.id = course.id;
        input.courseName = course.courseName;
        input.textbook = course.textbook;
        return input;
    }

    static mapMajorOutput(data: Major): MajorRequestBody {
        const output = new MajorRequestBody();
        output.id = data.id;
        output.department = data.department;
        output.grade = data.grade;
        output.majorName = data.majorName;
        return output;
    }

    static mapMajorInput(data: ClientMajor): Major {
        const input = new Major();
        input.id = data.id;
        input.department = data.department;
        input.grade = data.grade;
        input.majorName = data.majorName;
        return input;
    }

    static mapTeacherOutput(data: Teacher): TeacherRequestBody {
        const output = new TeacherRequestBody();
        output.id = data.id;
        output.name = data.name;
        output.teacherNumber = data.teacherNumber;
        output.teacherStatus = data.teacherStatus;
        output.teacherComment = data.teacherComment;
        output.phoneNumber = data.phoneNumber;
        output.isMentor = data.isMentor;
        return output;
    }

    static mapTeacherInput(data: ClientTeacher): Teacher {
        const input = new Teacher();
        input.id = data.id;
        input.name = data.name;
        input.teacherNumber = data.teacherNumber;
        input.teacherStatus = data.teacherStatus;
        input.teacherComment = data.teacherComment;
        input.phoneNumber = data.phoneNumber;
        input.isMentor = data.isMentor;
        return input;
    }

    static mapClassOutput(data: Class): ClassRequestBody {
        const output = new ClassRequestBody();
        output.id = data.id;
        output.classNumber = data.classNumber;
        output.majorId = data.major.id;
        output.teacherId = data.mentor.id;
        return output;
    }

    static mapClassInput(data: ClientClass): Class {
        const input = new Class();
        input.id = data.id;
        input.classNumber = data.classNumber;
        input.major = data.major ? this.mapMajorInput(data.major) : null;
        input.mentor = data.mentor ? this.mapTeacherInput(data.mentor) : null;
        return input;
    }

    static mapStudentOutput(data: Student): StudentRequestBody {
        const output = new StudentRequestBody();
        output.id = data.id;
        output.name = data.name;
        output.sex = data.sex;
        output.identityCardNumber = data.identityCardNumber;
        output.studentNumber = data.studentNumber;
        output.studentStatus = data.studentStatus;
        output.homeAddress = data.homeAddress;
        output.phoneNumber = data.phoneNumber;
        output.portrait = data.portrait;
        output.majorId = data.major.id;
        output.apartment = data.apartment;
        output.chamber = data.chamber;
        output.bed = data.bed;
        output.classId = data.class.id;
        return output;
    }

    static mapStudentInput(data: ClientStudent): Student {
        const input = new Student();
        input.id = data.id;
        input.name = data.name;
        input.sex = data.sex;
        input.identityCardNumber = data.identityCardNumber;
        input.studentNumber = data.studentNumber;
        input.studentStatus = data.studentStatus;
        input.homeAddress = data.homeAddress;
        input.phoneNumber = data.phoneNumber;
        input.portrait = data.portrait;
        input.major = data.major ? this.mapMajorInput(data.major) : null;
        input.apartment = data.apartment;
        input.chamber = data.chamber;
        input.bed = data.bed;
        input.class = data.class ? this.mapClassInput(data.class) : null;
        return input;
    }

    static mapScoreListOutput(data: Score[]): ExaminationImportBody[] {
        const output = [];
        data.forEach(d => output.push(this.mapScoreImportOutput(d)));
        return output;
    }

    static mapScoreImportOutput(data: Score): ExaminationImportBody {
        const output = new ExaminationImportBody();
        output.id = data.id;
        output.semester = data.semester;
        output.score = data.score;
        output.majorId = data.major.id;
        output.studentNumber = data.student.studentNumber;
        output.courseId = data.course.id;
        return output;
    }

    static mapScoreOutput(data: Score): ExaminationRequestBody {
        const output = new ExaminationRequestBody();
        output.id = data.id;
        output.semester = data.semester;
        output.score = data.score;
        output.majorId = data.major.id;
        output.studentId = data.student.id;
        output.courseId = data.course.id;
        return output;
    }

    static mapScoreInput(data: Examination): Score {
        const input = new Score();
        input.id = data.id;
        input.major = data.major ? this.mapMajorInput(data.major) : null;
        input.course = data.course ? this.mapCourseInput(data.course) : null;
        input.score = data.score;
        input.semester = data.semester;
        input.student = data.student ? this.mapStudentInput(data.student) : null;
        return input;
    }

    static mapTeacherCourseOutput(data: TeacherCourseInfo): CourseResponsibleByTeacherRequestBody {
        const output = new CourseResponsibleByTeacherRequestBody();
        output.id = data.id;
        output.semester = data.semester;
        output.teacherId = data.teacher.id;
        output.courseId = data.course.id;
        output.classId = data.class.id;
        return output;
    }

    static mapTeacherCourseInput(data: CourseResponsibleByTeacher): TeacherCourseInfo {
        const input = new TeacherCourseInfo();
        input.id = data.id;
        input.semester = data.semester;
        input.teacher = data.teacher ? this.mapTeacherInput(data.teacher) : null;
        input.course = data.course ? this.mapCourseInput(data.course) : null;
        input.class = data.class ? this.mapClassInput(data.class) : null;
        return input;
    }

    static mapCourseScheduleOutput(data: CourseSchedule): CourseScheduleRequestBody {
        const output = new CourseScheduleRequestBody();
        output.id = data.id;
        output.teacherCourseInfo = data.teacherCourseInfo ? this.mapTeacherCourseOutput(data.teacherCourseInfo) : null;
        output.scheduledWeekday = data.scheduledWeekday;
        output.scheduledTime = data.scheduledTime;
        return output;
    }

    static mapCourseScheduleListOutput(data: CourseSchedule[]): CourseScheduleRequestBody[] {
        const output = [];
        data.forEach(d => output.push(this.mapCourseScheduleOutput(d)));
        return output;
    }

    static mapCourseScheduleInput(data: ClientCourseSchedule): CourseSchedule {
        const input = new CourseSchedule();
        input.id = data.id;
        input.teacherCourseInfo = data.teacherCourseInfo ? this.mapTeacherCourseInput(data.teacherCourseInfo) : null;
        input.scheduledWeekday = data.scheduledWeekday;
        input.scheduledTime = data.scheduledTime;
        return input;
    }

    static mapTeacherAccountInput(teacherAccount: TeacherAccount): TeacherAccount {
        const input = new TeacherAccount();
        if (teacherAccount) {
            input.id = teacherAccount.id;
            input.accountName = teacherAccount.accountName;
            input.password = teacherAccount.password;
            input.isAdminAccount = teacherAccount.isAdminAccount;
            input.accountStatus = teacherAccount.accountStatus;
            input.teacher = teacherAccount.teacher;
            input.teacherId = teacherAccount.teacherId;

        }
        return input;
    }
}

import {
    Class as ClientClass, ClassRequestBody,
    Course as ClientCourse, CourseRequestBody,
    Major as ClientMajor, MajorRequestBody,
    Student as ClientStudent, StudentRequestBody,
    Teacher as ClientTeacher, TeacherRequestBody
} from 'src/app/api-client';
import { Class } from 'src/app/models/class';
import { Course } from 'src/app/models/course';
import { Major } from 'src/app/models/major';
import { Student } from 'src/app/models/student';
import { Teacher } from 'src/app/models/teacher';

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
        input.major = this.mapMajorInput(data.major);
        input.mentor = this.mapTeacherInput(data.mentor) ;
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
        input.major = this.mapMajorInput(data.major);
        input.apartment = data.apartment;
        input.chamber = data.chamber;
        input.bed = data.bed;
        input.class = this.mapClassInput(data.class);
        return input;
    }
}

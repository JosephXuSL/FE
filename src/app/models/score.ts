import { Course } from './course';
import { Major } from './major';
import { Student } from './student';

export class Score {
    id: number;
    semester: string;
    score: number;
    student: Student;
    major: Major;
    course: Course;

    constructor() {
        this.id = 0;
        this.semester = null;
        this.score = null;
        this.student = new Student();
        this.major = new Major();
        this.course = new Course();
    }
}

export class StudentNumberAndScore {
    studentNumber: string;
    score: number;

    constructor() {
        this.studentNumber = null;
        this.score = 0;
    }
}

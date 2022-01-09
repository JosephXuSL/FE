import { Class } from './class';
import { Course } from './course';
import { Teacher } from './teacher';


export class TeacherCourseInfo {
    id: number;
    semester: string;
    teacher: Teacher;
    course: Course;
    class: Class;

    constructor() {
        this.id = 0;
        this.semester = null;
        this.teacher = new Teacher();
        this.course = new Course();
        this.class = new Class();
    }
}

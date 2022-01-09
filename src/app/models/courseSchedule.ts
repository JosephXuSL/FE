import { TeacherCourseInfo } from './teacherCourseInfo';

export class CourseSchedule {
    id: number;
    teacherCourseInfo: TeacherCourseInfo;
    scheduledWeekday: string;
    scheduledTime: string;

    constructor() {
        this.id = 0;
        this.teacherCourseInfo = new TeacherCourseInfo();
        this.scheduledWeekday = null;
        this.scheduledTime = null;
    }
}

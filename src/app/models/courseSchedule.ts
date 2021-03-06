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


export class Schedule {
    scheduledTime: string;
    scheduledDay: string;
    value: boolean;

    constructor(time: string, day: string) {
        this.scheduledTime = time;
        this.scheduledDay = day;
        this.value = false;
    }

    public static newScheduleTable(): Schedule[] {
        const table = [];
        table.push(new Schedule(courseSequence.First, Weekday.Mon));
        table.push(new Schedule(courseSequence.First, Weekday.Tues));
        table.push(new Schedule(courseSequence.First, Weekday.Wed));
        table.push(new Schedule(courseSequence.First, Weekday.Thur));
        table.push(new Schedule(courseSequence.First, Weekday.Fri));
        table.push(new Schedule(courseSequence.Second, Weekday.Mon));
        table.push(new Schedule(courseSequence.Second, Weekday.Tues));
        table.push(new Schedule(courseSequence.Second, Weekday.Wed));
        table.push(new Schedule(courseSequence.Second, Weekday.Thur));
        table.push(new Schedule(courseSequence.Second, Weekday.Fri));
        table.push(new Schedule(courseSequence.Third, Weekday.Mon));
        table.push(new Schedule(courseSequence.Third, Weekday.Tues));
        table.push(new Schedule(courseSequence.Third, Weekday.Wed));
        table.push(new Schedule(courseSequence.Third, Weekday.Thur));
        table.push(new Schedule(courseSequence.Third, Weekday.Fri));
        table.push(new Schedule(courseSequence.Fourth, Weekday.Mon));
        table.push(new Schedule(courseSequence.Fourth, Weekday.Tues));
        table.push(new Schedule(courseSequence.Fourth, Weekday.Wed));
        table.push(new Schedule(courseSequence.Fourth, Weekday.Thur));
        table.push(new Schedule(courseSequence.Fourth, Weekday.Fri));

        return table;
    }
}

enum Weekday {
    Mon = '??????',
    Tues = '??????',
    Wed = '??????',
    Thur = '??????',
    Fri = '??????',
}

enum courseSequence {
    First = '??????/??????',
    Second = '??????/??????',
    Third = '??????/??????',
    Fourth = '??????/??????'
}



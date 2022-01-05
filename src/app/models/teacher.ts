export class Teacher {
    id: number;
    name: string;
    teacherNumber: string;
    teacherStatus: string;
    teacherComment: string;
    phoneNumber: string;
    isMentor: boolean;

    constructor() {
        this.id = 0;
        this.name = null;
        this.teacherNumber = null;
        this.teacherStatus = null;
        this.teacherComment = null;
        this.phoneNumber = null;
        this.isMentor = false;
    }
}

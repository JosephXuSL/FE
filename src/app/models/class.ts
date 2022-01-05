import { Major } from './major';
import { Teacher } from './teacher';

export class Class {
    id: number;
    classNumber: string;
    major: Major;
    mentor: Teacher;

    constructor() {
        this.id = 0;
        this.classNumber = null;
        this.major = new Major();
        this.mentor = new Teacher();
    }
}

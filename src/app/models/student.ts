import { Class } from './class';
import { Major } from './major';

export class Student {
    id: number;
    name: string;
    sex: string;
    identityCardNumber: string;
    studentNumber: string;
    studentStatus: string;
    homeAddress: string;
    phoneNumber: string;
    portrait: string;
    major: Major;
    apartment: string;
    chamber: string;
    bed: string;
    class: Class;

    constructor() {
        this.id = 0;
        this.name = null;
        this.sex = null;
        this.identityCardNumber = null;
        this.studentNumber = null;
        this.studentStatus = null;
        this.homeAddress = null;
        this.phoneNumber = null;
        this.portrait = null;
        this.major = new Major();
        this.apartment = null;
        this.chamber = null;
        this.bed = null;
        this.class = new Class();
    }
}

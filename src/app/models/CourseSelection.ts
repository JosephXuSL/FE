import { Class } from "./class";
import { Course } from "./course";
import { Student } from "./student";
import { Teacher } from "./teacher";

/* Defines the product entity */
export interface CourseSelection {
  id: number;
  studentid: number;
  student:Student;
  teacherid: number;
  teacher:Teacher;
  courseid: number;
  course:Course;
  classid: number;
  class: Class;
}

export interface ProductResolved {
  product: CourseSelection;
  error?: any;
}

import { CourseInterface } from 'interfaces/course';
import { TeacherInterface } from 'interfaces/teacher';
import { GetQueryInterface } from 'interfaces';

export interface CourseTeacherInterface {
  id?: string;
  course_id?: string;
  teacher_id?: string;
  created_at?: any;
  updated_at?: any;

  course?: CourseInterface;
  teacher?: TeacherInterface;
  _count?: {};
}

export interface CourseTeacherGetQueryInterface extends GetQueryInterface {
  id?: string;
  course_id?: string;
  teacher_id?: string;
}

import { CourseTeacherInterface } from 'interfaces/course-teacher';
import { SchoolInterface } from 'interfaces/school';
import { GetQueryInterface } from 'interfaces';

export interface CourseInterface {
  id?: string;
  name: string;
  description?: string;
  school_id?: string;
  created_at?: any;
  updated_at?: any;
  course_teacher?: CourseTeacherInterface[];
  school?: SchoolInterface;
  _count?: {
    course_teacher?: number;
  };
}

export interface CourseGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  school_id?: string;
}

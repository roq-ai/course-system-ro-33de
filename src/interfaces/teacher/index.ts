import { CourseTeacherInterface } from 'interfaces/course-teacher';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface TeacherInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  course_teacher?: CourseTeacherInterface[];
  user?: UserInterface;
  _count?: {
    course_teacher?: number;
  };
}

export interface TeacherGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}

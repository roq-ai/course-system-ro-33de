import axios from 'axios';
import queryString from 'query-string';
import { CourseTeacherInterface, CourseTeacherGetQueryInterface } from 'interfaces/course-teacher';
import { GetQueryInterface } from '../../interfaces';

export const getCourseTeachers = async (query?: CourseTeacherGetQueryInterface) => {
  const response = await axios.get(`/api/course-teachers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCourseTeacher = async (courseTeacher: CourseTeacherInterface) => {
  const response = await axios.post('/api/course-teachers', courseTeacher);
  return response.data;
};

export const updateCourseTeacherById = async (id: string, courseTeacher: CourseTeacherInterface) => {
  const response = await axios.put(`/api/course-teachers/${id}`, courseTeacher);
  return response.data;
};

export const getCourseTeacherById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/course-teachers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCourseTeacherById = async (id: string) => {
  const response = await axios.delete(`/api/course-teachers/${id}`);
  return response.data;
};

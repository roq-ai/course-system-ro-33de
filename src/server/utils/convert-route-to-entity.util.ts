const mapping: Record<string, string> = {
  courses: 'course',
  'course-teachers': 'course_teacher',
  schools: 'school',
  teachers: 'teacher',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}

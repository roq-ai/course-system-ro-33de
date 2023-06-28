import * as yup from 'yup';

export const courseTeacherValidationSchema = yup.object().shape({
  course_id: yup.string().nullable(),
  teacher_id: yup.string().nullable(),
});

import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCourseTeacher } from 'apiSdk/course-teachers';
import { Error } from 'components/error';
import { courseTeacherValidationSchema } from 'validationSchema/course-teachers';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CourseInterface } from 'interfaces/course';
import { TeacherInterface } from 'interfaces/teacher';
import { getCourses } from 'apiSdk/courses';
import { getTeachers } from 'apiSdk/teachers';
import { CourseTeacherInterface } from 'interfaces/course-teacher';

function CourseTeacherCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CourseTeacherInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCourseTeacher(values);
      resetForm();
      router.push('/course-teachers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CourseTeacherInterface>({
    initialValues: {
      course_id: (router.query.course_id as string) ?? null,
      teacher_id: (router.query.teacher_id as string) ?? null,
    },
    validationSchema: courseTeacherValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Course Teacher
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<CourseInterface>
            formik={formik}
            name={'course_id'}
            label={'Select Course'}
            placeholder={'Select Course'}
            fetcher={getCourses}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<TeacherInterface>
            formik={formik}
            name={'teacher_id'}
            label={'Select Teacher'}
            placeholder={'Select Teacher'}
            fetcher={getTeachers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'course_teacher',
  operation: AccessOperationEnum.CREATE,
})(CourseTeacherCreatePage);

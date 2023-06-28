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
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCourseTeacherById, updateCourseTeacherById } from 'apiSdk/course-teachers';
import { Error } from 'components/error';
import { courseTeacherValidationSchema } from 'validationSchema/course-teachers';
import { CourseTeacherInterface } from 'interfaces/course-teacher';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { CourseInterface } from 'interfaces/course';
import { TeacherInterface } from 'interfaces/teacher';
import { getCourses } from 'apiSdk/courses';
import { getTeachers } from 'apiSdk/teachers';

function CourseTeacherEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CourseTeacherInterface>(
    () => (id ? `/course-teachers/${id}` : null),
    () => getCourseTeacherById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CourseTeacherInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCourseTeacherById(id, values);
      mutate(updated);
      resetForm();
      router.push('/course-teachers');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CourseTeacherInterface>({
    initialValues: data,
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
            Edit Course Teacher
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'course_teacher',
  operation: AccessOperationEnum.UPDATE,
})(CourseTeacherEditPage);

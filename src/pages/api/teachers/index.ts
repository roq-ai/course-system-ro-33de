import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { teacherValidationSchema } from 'validationSchema/teachers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTeachers();
    case 'POST':
      return createTeacher();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTeachers() {
    const data = await prisma.teacher
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'teacher'));
    return res.status(200).json(data);
  }

  async function createTeacher() {
    await teacherValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.course_teacher?.length > 0) {
      const create_course_teacher = body.course_teacher;
      body.course_teacher = {
        create: create_course_teacher,
      };
    } else {
      delete body.course_teacher;
    }
    const data = await prisma.teacher.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}

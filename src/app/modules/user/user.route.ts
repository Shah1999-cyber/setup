import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.zodValidation';
import validateRequest from '../../utils/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidations.createStudentValidationSchema),
  UserControllers.createStudent,
);

router.get('', UserControllers.getAllUsers);
export const userRoutes = router;

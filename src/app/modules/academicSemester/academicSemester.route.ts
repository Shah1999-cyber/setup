import { academicSemesterValidation } from './academicSemester.validation';
import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../utils/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    academicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemester);

router.get('/:id', AcademicSemesterControllers.getSingleAcademicSemester);

router.patch(
  '/:id',
  validateRequest(
    academicSemesterValidation.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateSingleAcademicSemester,
);

// router.get('/', StudentControllers.getAllStudents);

// router.get('/:studentId', StudentControllers.getSingleStudent);

// router.delete('/:studentId', StudentControllers.deleteSingleStudent);

export const AcademicSemesterRoutes = router;

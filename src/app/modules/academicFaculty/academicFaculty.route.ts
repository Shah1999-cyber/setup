
import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';


const router = express.Router();

router.post('/create-academic-Faculty',validateRequest(academicFacultyValidation.createAcademicFacultyValidationschema), AcademicFacultyControllers.createAcademicFaculty);

router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

router.get("/:id", AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch("/:id",validateRequest(academicFacultyValidation.createAcademicFacultyValidationschema),AcademicFacultyControllers.updateSingleAcademicFaculty);

export const AcademicFacultyRoutes = router;
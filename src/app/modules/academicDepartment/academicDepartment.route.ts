import express from 'express';
import validateRequest from '../../utils/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentControllers } from './academiDepartment.controller';


const router = express.Router()

router.post('/create-academic-department',validateRequest(academicDepartmentValidation.createAcademicDepartmentValidation), academicDepartmentControllers.createAcademicDepartment);

router.get("/", academicDepartmentControllers.getAllAcademicDepartments);

router.get("/:id", academicDepartmentControllers.getSingleAcademicDepartment);

router.patch("/:id",validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidation),academicDepartmentControllers.updateSingleAcademicDepartment);

export const AcademicDepartmentRoutes = router;
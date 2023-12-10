import { z } from 'zod';

const createAcademicFacultyValidationschema = z.object({
  body: z.object({
    name: z.string(),
  }),
});

export const academicFacultyValidation = {
  createAcademicFacultyValidationschema,
};

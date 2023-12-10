import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payLoad: TAcademicSemester) => {
  //semester name --> semester code

  if (academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payLoad);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleSingleAcademicSemesterFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateSingleAcademicSemesterFromDB = async (
  _id: string,
  payLoad: Partial<TAcademicSemester>,
) => {
  if (
    payLoad.name &&
    payLoad.code &&
    academicSemesterNameCodeMapper[payLoad.name] !== payLoad.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.updateOne({ _id }, payLoad, {
    new: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};

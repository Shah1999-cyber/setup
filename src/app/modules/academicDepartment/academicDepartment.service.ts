import { TAcademicDepartment } from './academiDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payLoad);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleSingleAcademicDepartmentFromDB = async (id: string) => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');
  return result;
};

const updateSingleAcademicDepartmentIntoDB = async (
  payLoad: Partial<TAcademicDepartment>,
  _id: string,
) => {
  const result = await AcademicDepartment.findOneAndUpdate({ _id }, payLoad, {
    new: true,
  });
  return result;
};

export const academicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleSingleAcademicDepartmentFromDB,
  updateSingleAcademicDepartmentIntoDB,
};

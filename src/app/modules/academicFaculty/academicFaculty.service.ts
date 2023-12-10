import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicfaculty.model';

const createAcademicFacultyIntoDB = async (payLoad: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payLoad);
  return result;
};

const getAllAcademicFacultesFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};

const getSingleSingleAcademicFacultyFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateSingleAcademicFacultyFromDB = async (
  _id: string,
  payLoad: Partial<TAcademicFaculty>,
) => {
  const result = await AcademicFaculty.updateOne({ _id }, payLoad, {
    new: true,
  });
  return result;
};

export const AcademicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultesFromDB,
  getSingleSingleAcademicFacultyFromDB,
  updateSingleAcademicFacultyFromDB,
};

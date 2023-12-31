import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async (query: Record<string,unknown>) => {
  console.log('base query', query)
  const queryObj = {...query}; //copy
  // {email: { $regex : query.serachTerm, $option : i}}
  const studentSearchableFields = ['email','name.firstName', 'presentAddress'];

  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query.searchTerm as string;
  }

  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field] : { $regex : searchTerm, $options : 'i'},
    })),
  })
  

  //filtering
  const excludeFields = ['searchTerm','sort','limit']
  excludeFields.forEach(el => delete queryObj[el])
  const filterQuery = searchQuery.find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

    let sort = 'createdAt';
    if(query.sort){
      sort = query.sort as string;
    }
    const sortQuery = filterQuery.sort(sort);
    let limit =1;
    if(query.limit){
      limit = query.limit as number;
    }

    const limitQuery = await sortQuery.limit(limit);

  return limitQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  //const result = await Student.findOne({ id });
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Delete Studnet');
    }

    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'failed to delete Student');
  }
};

const updateSingleStudentFromDB = async (
  id: string,
  payLoad: Partial<TStudent>,
) => {
  const { name, guardian, localGuardian, ...remainigStudentData } = payLoad;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainigStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  //const result = await Student.findOne({ id });
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData);
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateSingleStudentFromDB,
};

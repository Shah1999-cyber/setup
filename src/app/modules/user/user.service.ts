import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use a default password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );
  if (admissionSemester === null) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'The academic Semester you are referencing is not available',
    );
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //set auto generated id
    userData.id = await generateStudentId(admissionSemester);

    //create a user (transaction-1)
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
    }
    //set id, _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id;
    //(transaction-2) creating student
    const newStudent = await Student.create([payLoad], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Student');
  }
};

const getAllUsersFromDB = async () => {
  const result = await User.find();
  return result;
};

export const userServices = {
  createStudentIntoDB,
  getAllUsersFromDB,
};

import httpStatus from 'http-status';
import { userServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  //   const zodParseValidation = studentValidationSchemaZod.parse(studentData);
  const result = await userServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Student created successfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Users are retrieved succesfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  getAllUsers,
};

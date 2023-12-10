import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicDepartmentServices } from "./academicDepartment.service";


const createAcademicDepartment = catchAsync(async (req,res) => {
    const result = await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty is created successfully',
      data: result,
    });
});
const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result = await academicDepartmentServices.getAllAcademicDepartmentFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All Academic Faculties are retrieved succesfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicDepartmentServices.getSingleSingleAcademicDepartmentFromDB(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Single Academic Faculty is retrieved succesfully',
    data: result,
  });
});

const updateSingleAcademicDepartment = catchAsync(async (req, res) => {
  const {id} = req.params;
  const result = await academicDepartmentServices.updateSingleAcademicDepartmentIntoDB(req.body, id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty is updated succesfully',
    data: result,
  });
});

export const academicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateSingleAcademicDepartment,
}
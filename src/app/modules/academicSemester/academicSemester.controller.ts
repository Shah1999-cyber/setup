import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const createAcademicSemester = catchAsync(async (req,res) => {
    //const { password, student: studentData } = req.body;
    //   const zodParseValidation = studentValidationSchemaZod.parse(studentData);
    // const result = await userServices.createStudentIntoDB(
    //   password,
    //   studentData,
    // );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student created successfully',
      data: result,
    });
});

export const AcademicSemesterControllers = {
    createAcademicSemester,
};

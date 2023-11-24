import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import { studentValidationSchemaZod } from './student.zodValidation';
// import studentValidationSchema  from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using joi
    const { student: studentData } = req.body;
    //data validation using joi
    // const { error,value } = studentValidationSchema.validate(studentData);

    //data validation using zod
    const zodParseValidation = studentValidationSchemaZod.parse(studentData);
    const result =
      await StudentServices.createStudentIntoDB(zodParseValidation);
    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     error : error,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students are retrieved succesfully',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrieved succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is deleted succesfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
};

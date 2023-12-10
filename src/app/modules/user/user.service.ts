
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //create a user object
  const userData : Partial<TUser>= {};
 

  //if password is not given , use a default password
  userData.password = password || (config.default_password as string)

  //set student role
  userData.role = 'student';



  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(payLoad.admissionSemester)
  if(admissionSemester === null){
    throw new Error('The academic Semester you are referencing is not available')
  }
  //set auto generated id
    userData.id = await generateStudentId(admissionSemester);

  //create a user 
  const newUser = await User.create(userData); 

  //create a student
    if(Object.keys(newUser).length){
        //set id, _id as user
        payLoad.id = newUser.id;
        payLoad.user = newUser._id;

        const newStudent = await Student.create(payLoad)
        return newStudent;
    }
};

export const userServices = {
  createStudentIntoDB,
};

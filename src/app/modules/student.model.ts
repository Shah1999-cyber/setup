import { Schema, model } from 'mongoose';
import validator from 'validator';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student/student.interface';

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim : true,
    minLength: [8,'First Name cannot be less then 8 character'],
    maxlength: [20,'First Name cannot be more then 20 character'],
    validate: {
      validator : function(value : string){
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message : '{VALUE} is not in a  capitalize formate'
    }
  },
  middleName: {
    type: String,
    trim : true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim : true,
    validate: {
      validator : function(value : string){
        const lastNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return lastNameStr === value;
      },
      message : '{VALUE} is not in a  capitalize formate'
    }
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    trim : true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim : true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
    trim : true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    trim : true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
    trim : true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
    trim : true,
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is required'],
    trim : true,
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
    trim : true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
    trim : true,
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
    trim : true,
  },
});

const studentSchema = new Schema<Student>({
  id: { type: String, required: [true, 'Student ID is required'], unique: true },
  name: {
    type: userNameSchema,
    required: [true, 'Student Name is required'],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message: '{VALUE} is not valid',
    },
    required: [true, 'Gender is required'],
  },
  dateOfBirth: { type: String },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  contactNo: { type: String, required: [true, 'Contact Number is required'] },
  emergencyContactNo: { type: String, required: [true, 'Emergency Contact Number is required'] },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  presentAddress: { type: String, required: [true, 'Present Address is required'],trim : true, },
  permanentAddress: { type: String, required: [true, 'Permanent Address is required'],trim : true, },
  guardian: {
    type: guardianSchema,
    required: [true, 'Guardian details are required'],
    trim : true,
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'Local Guardian details are required'],
    trim : true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
});

export const StudentModel = model<Student>('Student', studentSchema);

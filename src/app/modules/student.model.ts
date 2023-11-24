import { Schema, model } from 'mongoose';
// import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TUserName,
} from './student/student.interface';
import bcrypt from 'bcrypt';
import config from '../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    minLength: [8, 'First Name cannot be less then 8 character'],
    maxlength: [20, 'First Name cannot be more then 20 character'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not in a  capitalize formate',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last Name is required'],
    trim: true,
    // validate: {
    //   validator: function (value: string) {
    //     return validator.isAlpha(value);
    //   },
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father Name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father Contact Number is required'],
    trim: true,
  },
  motherName: {
    type: String,
    required: [true, 'Mother Name is required'],
    trim: true,
  },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
    trim: true,
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact Number is required'],
    trim: true,
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [true, 'Local Guardian Name is required'],
    trim: true,
  },
  occupation: {
    type: String,
    required: [true, 'Local Guardian Occupation is required'],
    trim: true,
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian Contact Number is required'],
    trim: true,
  },
  address: {
    type: String,
    required: [true, 'Local Guardian Address is required'],
    trim: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: {
      type: String,
      required: [true, 'Student ID is required'],
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxlength: [20, 'pass word must be under 20 character'],
    },
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
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      // validate: {
      //   validator: (value: string) => validator.isEmail(value),
      //   message: '{VALUE} is not a valid email type',
      // },
    },
    contactNo: { type: String, required: [true, 'Contact Number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency Contact Number is required'],
    },
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    },
    presentAddress: {
      type: String,
      required: [true, 'Present Address is required'],
      trim: true,
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent Address is required'],
      trim: true,
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian details are required'],
      trim: true,
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local Guardian details are required'],
      trim: true,
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual

studentSchema.virtual('fullName').get(function () {
  return (
    this.name.firstName + ' ' + this.name.middleName + ' ' + this.name.lastName
  );
});

//pre save middlware/hook : will work on create function and save function

studentSchema.pre('save', async function (next) {
  //hashing password and save into DB
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this; //doc
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

//post save middleware /hook

studentSchema.post('save', function (doc, next) {
  doc.password = '';

  next();
});

//query middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('findOne', function (next) {
  this.findOne({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instace method

// studentSchema.methods.isUserExist = async function (id:string) {
//   const existingUser = await Student.findOne({id});
//   return existingUser;
// }

export const Student = model<TStudent, StudentModel>('Student', studentSchema);

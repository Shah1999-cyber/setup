import Joi from 'Joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .min(8)
    .max(20)
    .regex(/^[A-Z][a-z]*$/, { name: 'capitalize' })
    .message(
      'First Name must start with a capital letter and contain only letters',
    ),

  middleName: Joi.string().trim(),

  lastName: Joi.string()
    .required()
    .trim()
    .regex(/^[a-zA-Z]+$/, { name: 'alphabet' })
    .message('Last Name must contain only letters'),
});
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().required().trim(),
  fatherOccupation: Joi.string().required().trim(),
  fatherContactNo: Joi.string().required().trim(),
  motherName: Joi.string().required().trim(),
  motherOccupation: Joi.string().required().trim(),
  motherContactNo: Joi.string().required().trim(),
});
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().required().trim(),
  occupation: Joi.string().required().trim(),
  contactNo: Joi.string().required().trim(),
  address: Joi.string().required().trim(),
});
const studentValidationSchema = Joi.object({
  id: Joi.string().required(),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required(),
  dateOfBirth: Joi.string(),
  email: Joi.string().email().required(),
  contactNo: Joi.string().required(),
  emergencyContactNo: Joi.string().required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  presentAddress: Joi.string().required().trim(),
  permanentAddress: Joi.string().required().trim(),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
  isDeleted: Joi.boolean().default(false),
});

export default studentValidationSchema;

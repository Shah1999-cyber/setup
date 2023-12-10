export type TMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TacademicSemesterName = 'Autumn' | 'Summar' | 'Fall';
export type TacademicSemesterCode = '01' | '02' | '03';
export type TAcademicSemesterNameCodeMapper = {
  [key: string]: string;
};
export type TAcademicSemester = {
  name: TacademicSemesterName;
  code: TacademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
};

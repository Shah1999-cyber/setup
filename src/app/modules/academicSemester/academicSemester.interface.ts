export type TMonths = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December';

export type TacademicSemesterName = 'Autumn' | 'Summer' | 'Fall';
export type TacademicSemesterCode = '01' | '02' | '03';

export type TAcademicSemester = {
    name : TacademicSemesterName,
    code : TacademicSemesterCode,
    year : Date,
    startMonth : TMonths,
    endMonth : TMonths
};
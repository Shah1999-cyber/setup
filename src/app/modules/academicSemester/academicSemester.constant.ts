import { TAcademicSemesterNameCodeMapper, TMonths, TacademicSemesterCode, TacademicSemesterName } from "./academicSemester.interface";

export const Months : TMonths[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const AcademicSemesterName : TacademicSemesterName[] = [ 'Autumn' , 'Summar' , 'Fall'];
export const AcademicSemesterCode : TacademicSemesterCode[] = ['01' , '02' , '03'];
export const academicSemesterNameCodeMapper : TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summar: "02",
    Fall: "03",
}
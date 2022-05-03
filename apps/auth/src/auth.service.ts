import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {

  grade(exp: number, grade: number) {
    const temp = { grade, experience: exp + 10 };
    if (exp > 21900) {
      temp.grade = 6;
    } else if (exp > 14600 && exp < 18250) {
      temp.grade = 5;
    } else if (exp > 10950 && exp < 14600) {
      temp.grade = 4;
    } else if (exp > 7300 && exp < 10950) {
      temp.grade = 3;
    } else if (exp > 3650 && exp < 7300) {
      temp.grade = 2;
    } else if (exp < 3650) {
      temp.grade = 1;
    } else {
      temp;
    }
    return temp;
  }
}

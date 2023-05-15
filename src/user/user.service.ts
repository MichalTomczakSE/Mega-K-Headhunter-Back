import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserInterface } from "./interfaces/userInterface";
import { Student } from "../student/student.entity";
import { StudentDegrees } from "../student/student-degrees.entity";
import { Str } from '@supercharge/strings/dist';
import { HR } from '../hr/hr.entity';

@Injectable()
export class UserService {
  async findOne(username: string): Promise<User> {
    return await User.findOne({
      where: { email: username },
      select: {
        id: true,
        role: true,
        email: true,
        password: true,
      },
    });
  }

  async addUsers(users:UserInterface){
    if(users.type==='student')
    {
      try {
        users.data.forEach(user => {
          let newStudentDegress = new StudentDegrees();
          newStudentDegress.email = user.email;
          newStudentDegress.courseCompletion = user.courseCompletion;
          newStudentDegress.courseEngagement = user.courseEngagement;
          newStudentDegress.projectDegree = user.projectDegree;
          newStudentDegress.teamProjectDegree = user.teamProjectDegree;
          newStudentDegress.bonusProjectUrls = user.bonusProjectUrls;
          newStudentDegress.activationToken = Str.random(36)
          newStudentDegress.save().then(()=>{
            let newStudent = new Student()
            newStudent.degrees=newStudentDegress
            newStudent.email=user.email
            newStudent.firstName=""
            newStudent.lastName=""
            newStudent.githubUsername=""
            newStudent.projectUrls=""
            newStudent.monthsOfCommercialExp=0
            newStudent.expectedTypeWork=0
            newStudent.expectedContractType=0
            newStudent.expectedSalary=0
            newStudent.canTakeApprenticeship=false
            newStudent.isActive=false
            newStudent.status=0
            newStudent.save().then(()=>{
              let newUser = new User()
              newUser.email = newStudent.email
              newUser.role = 3
              newUser.currentToken = Str.random(255)
              newUser.password = Str.random(8)
              newUser.student=newStudent
              newUser.save()
            })
          })


          })
      }
      catch (e)
      {
        console.log(e.message)
      }
    }
    else if(users.type==='hr')
    {
      users.data.forEach(user => {
        let newHr=new HR()
        newHr.email=user.email
        newHr.company=user.company
        newHr.fullName=user.fullName
        newHr.maxReservedStudents=30
        newHr.save()
        let newUser=new User()
        newUser.email=user.email
        newUser.role=2
        newUser.currentToken=Str.random(255)
        newUser.password=Str.random(8)
        newUser.save()
      })
    }
  }
}

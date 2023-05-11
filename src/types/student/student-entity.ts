import { ApiProperty } from '@nestjs/swagger';
import { StudentDegreesEntity } from './student-degrees-entity';
import { UserEntity } from '../user';
import { StudentListItem } from './students-list-response';

export enum StudentStatus {
  available = 1,
  awaiting = 2,
  hired = 3,
}
export class StudentEntity {
  @ApiProperty({
    description: 'Student Id',
    example: 'saldks3450948r9fudj-+8sd',
  })
  id: string;
  @ApiProperty({
    description: 'The uniqe email of the Student',
    example: 'jankowalski@test.test',
  })
  email: string;
  @ApiProperty({
    description: 'The phone number of the Student',
    example: '666666666',
    nullable: true,
  })
  phoneNumber: string | null;
  @ApiProperty({
    description: 'The first name of the Student',
    example: 'Jan',
  })
  firstName: string;
  @ApiProperty({
    description: 'The last name of the Student',
    example: 'Kowalski',
  })
  lastName: string;
  @ApiProperty({
    description: 'Github user name of the Student',
    example: 'Kowal',
  })
  githubUsername: string;
  @ApiProperty({
    description: 'Portfolio urls of the Student',
    example: 'https://Loremipsum/dolor/sit/amet',
    nullable: true,
  })
  portfolioUrls: string | null;
  @ApiProperty({
    description: 'Projects urls of the Student',
    example:
      'https://github.com/Ami777/MegaKursTest/pulls?q=is%3Apr+reviewed-by%3AAmi777',
  })
  projectUrls: string;
  @ApiProperty({
    description: 'Bio of the Student',
    example:
      'Jan Kowalski is a highly skilled programmer with over 1 year of experience in software development.',
    nullable: true,
  })
  bio: string | null;
  @ApiProperty({
    description: 'Expected type work of the Student',
    example: 1,
    nullable: true,
  })
  expectedTypeWork: number;
  @ApiProperty({
    description: 'Destination city of work',
    example: 'Gdynia',
    nullable: true,
  })
  targetWorkCity: string | null;
  @ApiProperty({
    description: 'Expected contract type',
    example: 2,
  })
  expectedContractType: number;
  @ApiProperty({
    description: 'Expected salary monthly net',
    example: 1000,
    nullable: true,
  })
  expectedSalary: number | null;
  @ApiProperty({
    description: 'Agreement for free practice',
    example: false,
  })
  canTakeApprenticeship: boolean;
  @ApiProperty({
    description: 'Work experience in months',
    example: 10,
  })
  monthsOfCommercialExp: number;
  @ApiProperty({
    description: 'Education',
    example: 'Szkoła Wyższa Informatyki',
    nullable: true,
  })
  education: string | null;
  @ApiProperty({
    description: 'Professional experience',
    example: 'Description professional experience',
    nullable: true,
  })
  workExperience: string | null;
  @ApiProperty({
    description: 'Courses',
    example: 'MegaK',
    nullable: true,
  })
  courses: string | null;
  @ApiProperty({
    description: 'Active',
    example: true,
  })
  isActive: boolean;
  status: StudentStatus;
  user: UserEntity;
}

export class OneStudentResponse {
  @ApiProperty({
    description: 'Student Id',
    example: 'saldks3450948r9fudj-+8sd',
  })
  id: string;
  @ApiProperty({
    description: 'Github user name of the Student',
    example: 'Kowal',
  })
  githubUsername: string;
  @ApiProperty({
    description: 'The first name of the Student',
    example: 'Jan',
  })
  firstName: string;
  @ApiProperty({
    description: 'The last name of the Student',
    example: 'Kowalski',
  })
  lastName: string;
  @ApiProperty({
    description: 'Expected type work of the Student',
    example: 1,
  })
  expectedTypeWork: number;
  @ApiProperty({
    description: 'Destination city of work',
    nullable: true,
    example: 'Gdynia',
  })
  targetWorkCity: string | null;
  @ApiProperty({
    description: 'Expected salary monthly net',
    example: 1000,
  })
  expectedSalary: number | null;
  @ApiProperty({
    description: 'Agreement for free practice',
    example: true,
    nullable: true,
  })
  canTakeApprenticeship: boolean;
  @ApiProperty({
    description: 'Professional experience',
    example: 'Space to describe the experience',
    nullable: true,
  })
  workExperience: string | null;
  @ApiProperty({
    description: 'Degrees',
    type: [StudentListItem],
    example: [
      {
        courseCompletion: 5,
        courseEngagement: 3,
        projectDegree: 1,
        teamProjectDegree: 2,
        bonusProjectUrls: 'https://Loremipsum/dolor/sit/amet',
      },
    ],
  })
  degrees: Omit<StudentDegreesEntity, 'id' | 'activationToken'>;
}
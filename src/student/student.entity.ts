import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { StudentEntity, StudentListItem } from '../types';
import { StudentDegrees } from './student-degrees.entity';
import { HR } from '../hr/hr.entity';
import { User } from '../user/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Student extends BaseEntity implements StudentEntity {
  @ApiProperty({
    description: 'Id student',
    example: 'Idfdfkdjvkcvnvc',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The uniqe email of the Student',
    example: 'jankowalski@test.test',
  })
  @Column({
    unique: true,
    length: 100,
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the Student',
    example: '666666666',
  })
  @Column({
    nullable: true,
    length: 11,
  })
  phoneNumber: string | null;

  @ApiProperty({
    description: 'The first name of the Student',
    example: 'Jan',
  })
  @Column({
    length: 30,
  })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the Student',
    example: 'Kowalski',
  })
  @Column({
    length: 50,
  })
  lastName: string;

  @ApiProperty({
    description: 'Github user name of the Student',
    example: 'Kowal',
  })
  @Column({
    unique: true,
    length: 50,
  })
  githubUsername: string;

  @ApiProperty({
    description: 'Portfolio urls of the Student',
    example: 'https://Loremipsum/dolor/sit/amet',
  })
  @Column({
    length: 2000,
    nullable: true,
  })
  portfolioUrls: string | null;

  @ApiProperty({
    description: 'Projects urls of the Student',
    example:
      'https://github.com/Ami777/MegaKursTest/pulls?q=is%3Apr+reviewed-by%3AAmi777',
  })
  @Column({
    length: 500,
  })
  projectUrls: string;

  @ApiProperty({
    description: 'Bio of the Student',
    example:
      'Jan Kowalski is a highly skilled programmer with over 1 year of experience in software development.',
  })
  @Column({
    length: 1000,
    nullable: true,
  })
  bio: string | null;

  @ApiProperty({
    description: 'Expected type work of the Student',
    example: 1,
  })
  @Column({
    type: 'tinyint',
  })
  expectedTypeWork: number;

  @ApiProperty({
    description: 'Destination city of work',
    example: 'Gdynia',
  })
  @Index()
  @Column({
    nullable: true,
    length: 41,
  })
  targetWorkCity: string | null;

  @ApiProperty({
    description: 'Expected contract type',
    example: 2,
  })
  @Column({
    type: 'tinyint',
  })
  expectedContractType: number;

  @ApiProperty({
    description: 'Expected salary monthly net',
    example: 1000,
  })
  @Column({
    type: 'decimal',
    precision: 7,
    scale: 2,
  })
  expectedSalary: number | null;

  @ApiProperty({
    description: 'Agreement for free practice',
    example: true,
  })
  @Column({
    default: false,
  })
  canTakeApprenticeship: boolean;

  @ApiProperty({
    description: 'Work experience in months',
    example: 10,
  })
  @Column({
    type: 'tinyint',
  })
  monthsOfCommercialExp: number;

  @ApiProperty({
    description: 'Education',
    example: 'Szkoła Wyższa Informatyki',
  })
  @Column({
    nullable: true,
    type: 'longtext',
  })
  education: string | null;

  @ApiProperty({
    description: 'Professional experience',
    example: null,
  })
  @Column({
    nullable: true,
    type: 'longtext',
  })
  workExperience: string | null;

  @ApiProperty({
    description: 'Courses',
    example: null,
  })
  @Column({
    nullable: true,
    type: 'longtext',
  })
  courses: string | null;

  @ApiProperty({
    description: 'Active',
    example: true,
  })
  @Index()
  @Column({
    default: false,
  })
  isActive: boolean;

  @Index()
  @Column({
    type: 'tinyint',
  })
  status: number;

  @ApiProperty({
    description: 'Schedule at',
    example: '2022-01-01',
  })
  @Column({
    type: 'date',
    nullable: true,
    default: null,
  })
  scheduledAt: Date | null;

  @ApiProperty({
    description: 'Degrees',
    type: [StudentListItem],
    example: [
      {
        email: 'jan.kowalski@example.com',
        courseCompletion: 5,
        courseEngagement: 3,
        projectDegree: 1,
        teamProjectDegree: 2,
        bonusProjectUrls: 'https://Loremipsum/dolor/sit/amet',
      },
    ],
  })
  @OneToOne((type) => StudentDegrees)
  @JoinColumn()
  degrees: StudentDegrees;

  @ManyToOne(() => HR, (hr) => hr.students)
  hr: HR;

  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  user: User;
}

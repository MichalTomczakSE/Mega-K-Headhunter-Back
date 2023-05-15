import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDetailsDto {
  @ApiProperty({
    description: 'The uniqe email of the Student',
    example: 'jankowalski@test.test',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The phone number of the Student',
    example: '666666666',
    nullable: true,
  })
  @IsPhoneNumber('PL')
  @ValidateIf((object, value) => value !== null)
  phoneNumber: string | null;

  @ApiProperty({
    description: 'The first name of the Student',
    example: 'Jan',
  })
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    description: 'The last name of the Student',
    example: 'Kowalski',
  })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    description: 'Github user name of the Student',
    example: 'Kowal',
  })
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  githubUsername: string;

  @ApiProperty({
    description: 'Portfolio urls of the Student',
    example: ['https://Loremipsum/dolor/sit/amet'],
    nullable: true,
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  portfolioUrls: string | null;

  @ApiProperty({
    description: 'Projects urls of the Student',
    example: [
      'https://github.com/Ami777/MegaKursTest/pulls?q=is%3Apr+reviewed-by%3AAmi777',
    ],
    nullable: true,
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  projectUrls: string;

  @ApiProperty({
    description: 'Bio of the Student',
    example:
      'Jan Kowalski is a highly skilled programmer with over 1 year of experience in software development.',
    nullable: true,
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  bio: string | null;

  @ApiProperty({
    description: 'Expected type work of the Student',
    example: 1,
  })
  @IsNumber()
  @Max(4)
  @Min(0)
  expectedTypeWork: number;

  @ApiProperty({
    description: 'Destination city of work',
    example: 'Gdynia',
    nullable: true,
  })
  @IsString()
  @MaxLength(41)
  @ValidateIf((object, value) => value !== null)
  targetWorkCity: string | null;

  @ApiProperty({
    description: 'Expected contract type',
    example: 2,
  })
  @IsNumber()
  @Max(3)
  @Min(0)
  expectedContractType: number;

  @ApiProperty({
    description: 'Expected salary monthly net',
    example: 1000,
    nullable: true,
  })
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @ValidateIf((object, value) => value !== null)
  expectedSalary: number | null;

  @ApiProperty({
    description: 'Agreement for free practice',
    example: true,
  })
  @IsBoolean()
  canTakeApprenticeship: boolean;

  @ApiProperty({
    description: 'Work experience in months',
    example: 10,
  })
  @IsNumber()
  monthsOfCommercialExp: number;

  @ApiProperty({
    description: 'Education',
    example: 'Szkoła Wyższa Informatyki',
    nullable: true,
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  education: string | null;

  @ApiProperty({
    description: 'Professional experience',
    example: 'Company IT',
    nullable: true,
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  workExperience: string | null;

  @ApiProperty({
    description: 'Courses',
    example: 'MegaK',
    nullable: true,
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  courses: string | null;

  @ApiProperty({
    description: 'Bonus project urls',
    example:
      'https://github.com/Ami777/MegaKursTest/commits?author=Ami777, https://github.com/Ami777/MegaKursTest/pulls?q=is%3Apr+reviewed-by%3AAmi777',
    nullable: true,
  })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  bonusProjectUrls: string | null;
}

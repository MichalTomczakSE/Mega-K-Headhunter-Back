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
    ValidateIf
} from "class-validator";

export class UpdateStudentDetailsDto {

    @IsEmail()
    email: string;

    @IsPhoneNumber("PL")
    @ValidateIf((object, value) => value !== null)
    phoneNumber: string | null;

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @MaxLength(50)
    @IsNotEmpty()
    githubUsername: string;

    @IsString()
    @ValidateIf((object, value) => value !== null)
    portfolioUrls: string | null;

    @IsString()
    @ValidateIf((object, value) => value !== null)
    projectUrls: string;

    @IsString()
    @ValidateIf((object, value) => value !== null)
    bio: string | null

    @IsNumber()
    @Max(4)
    @Min(0)
    expectedTypeWork: number;

    @IsString()
    @MaxLength(41)
    @ValidateIf((object, value) => value !== null)
    targetWorkCity: string | null;

    @IsNumber()
    @Max(3)
    @Min(0)
    expectedContractType: number

    @IsNumber({
        maxDecimalPlaces: 2,
    })
    @ValidateIf((object, value) => value !== null)
    expectedSalary: number | null;

    @IsBoolean()
    canTakeApprenticeship: boolean;

    @IsNumber()
    monthsOfCommercialExp: number;

    @IsString()
    @ValidateIf((object, value) => value !== null)
    education: string | null;

    @IsString()
    @ValidateIf((object, value) => value !== null)
    workExperience: string | null;

    @IsString()
    @ValidateIf((object, value) => value !== null)
    courses: string | null;

    @IsString()
    @ValidateIf((object, value) => value !== null)
    bonusProjectUrls: string | null;
}


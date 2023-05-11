import { StudentDegreesEntity } from './student-degrees-entity';
import { UserEntity } from '../user';

export enum StudentStatus {
  available = 1,
  awaiting = 2,
  hired = 3,
}
export interface StudentEntity {
  id: string;
  email: string;
  phoneNumber: string | null;
  firstName: string;
  lastName: string;
  githubUsername: string;
  portfolioUrls: string | null;
  projectUrls: string;
  bio: string | null;
  expectedTypeWork: number;
  targetWorkCity: string | null;
  expectedContractType: number;
  expectedSalary: number | null;
  canTakeApprenticeship: boolean;
  monthsOfCommercialExp: number;
  education: string | null;
  workExperience: string | null;
  courses: string | null;
  isActive: boolean;
  status: StudentStatus;
  user: UserEntity;
}

export interface OneStudentResponse {
  id: string;
  githubUsername: string;
  firstName: string;
  lastName: string;
  expectedTypeWork: number;
  targetWorkCity: string | null;
  expectedSalary: number | null;
  canTakeApprenticeship: boolean;
  workExperience: string | null;
  expectedContractType: number;
  monthsOfCommercialExp: number;
  degrees: Omit<StudentDegreesEntity, 'id' | 'activationToken'>;
}

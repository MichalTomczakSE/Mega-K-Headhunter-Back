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
  status: number;
}

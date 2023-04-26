import { Test, TestingModule } from '@nestjs/testing';
import { StudentService } from './student.service';
import { GetSingleStudentFullDetailsResponse } from "../types";


const longText = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'

describe('StudentService', () => {
    let service: StudentService;
    let studentDetails: GetSingleStudentFullDetailsResponse

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StudentService],
        }).compile();

        service = module.get<StudentService>(StudentService);
    });

    beforeAll(async () => {
        studentDetails = await StudentService.prototype.getSingleStudentFullDetails('f9751776-9ed4-42c5-9e4a-930f9d8bc9gg')
    })

    jest
        .spyOn(StudentService.prototype, 'getSingleStudentFullDetails')
        .mockImplementation(async (id: string): Promise<GetSingleStudentFullDetailsResponse> => {
            return {
                id: id,
                email: 'test@test.com',
                phoneNumber: '123123129',
                firstName: 'Jan',
                lastName: 'Niezbędny',
                githubUsername: 'obySięUdało',
                portfolioUrls: '["1","2","3"]',
                projectUrls: '["1","2","3"]',
                bio: null,
                expectedTypeWork: 1,
                targetWorkCity: 'Kołobrzeg',
                expectedContractType: 3,
                expectedSalary: 5555.00,
                canTakeApprenticeship: true,
                monthsOfCommercialExp: 0,
                education: null,
                workExperience: null,
                courses: longText,
                isActive: true,
                status: 1,
                degrees: {
                    id: 'f9751776-9ed4-42c5-9e4a-930f9d8bc9ff',
                    courseCompletion: 5,
                    courseEngagement: 5,
                    projectDegree: 5,
                    teamProjectDegree: 5,
                    bonusProjectUrls: null,
                }
            }
        })

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('getSingleStudentFullDetails() should return student details', async () => {
        expect(studentDetails.id).toEqual('f9751776-9ed4-42c5-9e4a-930f9d8bc9gg');
        expect(studentDetails.firstName).toEqual('Jan');
        expect(studentDetails.lastName).toEqual('Niezbędny');
        expect(typeof studentDetails.expectedContractType).toBe('number');
        expect(studentDetails.expectedTypeWork).toBeGreaterThanOrEqual(0);
        expect(studentDetails.isActive).toEqual(1);
        expect((studentDetails as any).activationToken).toBeUndefined();
    });
});

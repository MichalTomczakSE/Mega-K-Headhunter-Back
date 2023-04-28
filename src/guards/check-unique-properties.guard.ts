import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Student } from "../student/student.entity";
import { UpdateStudentDetailsDto } from "../student/dto/update-student-details.dto";
import { Not } from "typeorm";

@Injectable()
export class CheckUniquePropertiesGuard implements CanActivate {
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const payload = context.switchToHttp().getRequest().body as UpdateStudentDetailsDto;
        const studentId = context.switchToHttp().getRequest().params.id as string;

        const studentsWithGivenData = await Student.find({
            where: [
                {
                    email: payload.email,
                    id: Not(studentId)
                },
                {
                    githubUsername: payload.githubUsername,
                    id: Not(studentId)
                }
            ]
        });

        return !(studentsWithGivenData.length > 0);
    }
}
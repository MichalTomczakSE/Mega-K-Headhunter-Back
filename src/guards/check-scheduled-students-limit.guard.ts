import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { HR } from '../hr/hr.entity';
import { Student } from '../student/student.entity';

@Injectable()
export class CheckScheduledStudentsLimitGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { hrId } = context.switchToHttp().getRequest().body;

        const { maxReservedStudents: hrLimit } = await HR.findOneOrFail({
            select: ['maxReservedStudents'],
            where: {
                hrId,
            },
        });

        const [, scheduledStudentsCount] = await Student.findAndCount({
            where: {
                hr: { hrId },
            },
        });

        return scheduledStudentsCount < hrLimit;
    }
}
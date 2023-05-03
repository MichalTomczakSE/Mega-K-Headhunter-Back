import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan } from 'typeorm';
import * as moment from 'moment';
import { Student } from '../student/student.entity';
import { StudentStatus } from '../types';

@Injectable()
export class CronService {
  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async ClearUnhiredStudents(): Promise<void> {
    const lastValidDate = new Date(
      moment().subtract(10, 'd').format('YYYY-MM-DD'),
    );

    const unhiredStudents = await Student.find({
      select: ['id'],
      where: {
        status: StudentStatus.awaiting,
        isActive: true,
        scheduledAt: LessThan(lastValidDate),
      },
    });
    const unhiredStudentsIdList = unhiredStudents.map((student) => student.id);
    console.log(unhiredStudentsIdList);

    if (unhiredStudents.length < 1) return;

    await Student.update(unhiredStudentsIdList, {
      status: StudentStatus.available,
      scheduledAt: null,
      hr: null,
    });
  }
}

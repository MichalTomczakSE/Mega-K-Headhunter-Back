import { ApiProperty } from '@nestjs/swagger';

export class StudentListItem {

    id: string;
    firstName: string;
    lastName: string;
    githubUsername?: string;
    scheduledAt?: Date;
}

export class StudentsListResponse {
  @ApiProperty({
    description: 'Students list',
    type: [StudentListItem],
    example: [
      {
        id: 2,
        firstName: 'Jan',
        lastName: 'Kowalski',
        githubUsername: 'Kowal',
        scheduledAt: new Date(),
      },
  })
    students: StudentListItem[];
    @ApiProperty({
        description: 'Total',
        example: '22',
    })
    totalPages: number;
}
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStudentDetailsResponse {
  @ApiProperty({ description: 'Student status', example: 'changed'})
  status: string;
}

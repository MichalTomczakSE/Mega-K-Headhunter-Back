import { StudentEntity } from './student-entity';
import { StudentDegreesEntity } from './student-degrees-entity';

export class GetSingleStudentFullDetailsResponse extends StudentEntity {
  degrees: Omit<StudentDegreesEntity, 'id' | 'activationToken'>;
}

import { StudentEntity } from "./student-entity";
import { StudentDegreesEntity } from "./student-degrees-entity";

export interface GetSingleStudentFullDetailsResponse extends StudentEntity {
    degrees: Omit<StudentDegreesEntity, 'activationToken'>;
}

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../student/student.entity';

@Entity()
export class HR extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  hrId: string;

  @Column({
    unique: true,
    length: 100,
  })
  email: string;

  @Column({
    length: 80,
  })
  fullName: string;

  @Column({
    length: 163,
  })
  company: string;

  @Column({
    type: 'smallint',
    zerofill: false,
  })
  maxReservedStudents: number;

  @OneToMany(() => Student, (student) => student.hr)
  students: Student[];
}

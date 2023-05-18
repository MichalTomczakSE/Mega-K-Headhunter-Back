import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Student } from '../student/student.entity';
import { User } from '../user/user.entity';

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

  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  user: User;

  @OneToMany(() => Student, (student) => student.hr)
  students: Student[];
}

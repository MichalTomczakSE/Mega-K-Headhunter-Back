import {
  BaseEntity,
  Column,
  Entity, Index,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { UserEntity, UserRole } from '../types';
import { Student } from '../student/student.entity';
import { HR } from "../hr/hr.entity";

@Entity()
export class User extends BaseEntity implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  password: string;

  @Column()
  currentToken: string;

  @Column({
    type: 'tinyint',
  })
  role: UserRole;

  @Column({
    length: 100,

  })
  email: string;

  @OneToOne(() => Student, { nullable: true })
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  student: Student;

  @OneToOne(() => HR, { nullable:true })
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  hr: HR;
}

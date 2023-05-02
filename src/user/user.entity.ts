import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity, UserRole } from '../types';
import { Student } from '../student/student.entity';

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
    unique: true,
    length: 100,
  })
  email: string;

  @OneToOne((type) => Student)
  @JoinColumn({ name: 'email', referencedColumnName: 'email' })
  student: Student;
}

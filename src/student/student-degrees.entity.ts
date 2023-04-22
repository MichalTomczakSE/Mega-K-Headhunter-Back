import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GradingScale, StudentDegreesEntity } from '../types';

@Entity()
export class StudentDegrees extends BaseEntity implements StudentDegreesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
    length: 100,
  })
  email: string;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  courseCompletion: GradingScale;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  courseEngagement: GradingScale;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  projectDegree: GradingScale;

  @Column({
    type: 'tinyint',
    default: 0,
  })
  teamProjectDegree: GradingScale;

  @Column({
    length: 90,
    nullable: true,
  })
  bonusProjectUrls: string | null;
  @Column({
    length: 36,
    nullable: true,
  })
  activationToken: string | null;
}

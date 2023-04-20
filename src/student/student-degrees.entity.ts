import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StudentDegreesEntity } from "../types";

@Entity()
export class StudentDegrees extends BaseEntity implements StudentDegreesEntity{

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        length: 100
    })
    email: string;

    @Column({
        type: "tinyint",
        default: 0
    })
    courseCompletion: 0 | 1 | 2 | 3 | 4 | 5;

    @Column({
        type: "tinyint",
        default: 0
    })
    courseEngagement: 0 | 1 | 2 | 3 | 4 | 5;

    @Column({
        type: "tinyint",
        default: 0
    })
    projectDegree: 0 | 1 | 2 | 3 | 4 | 5;

    @Column({
        type: "tinyint",
        default: 0
    })
    teamProjectDegree: 0 | 1 | 2 | 3 | 4 | 5;

    @Column({
        length: 90,
        nullable: true,
    })
    bonusProjectUrls: string | null;
    @Column({
        length: 36,
        nullable: true
    })
    activationToken: string | null;
}
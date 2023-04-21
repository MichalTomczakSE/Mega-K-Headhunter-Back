import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { StudentEntity } from "../types";
import { StudentDegrees } from "./student-degrees.entity";


@Entity()
export class Student extends BaseEntity implements StudentEntity  {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true,
        length: 100,
    })
    email: string;

    @Column({
        nullable: true,
        length: 11,
    })
    phoneNumber: string | null;

    @Column({
        length: 30,
    })
    firstName: string;

    @Column({
        length: 50,
    })
    lastName: string;

    @Column({
        unique: true,
        length: 50,
    })
    githubUsername: string;

    @Column({
        length: 2000,
        nullable: true,
    })
    portfolioUrls: string | null;

    @Column({
        length: 500,
    })
    projectUrls: string;

    @Column({
        length: 1000,
        nullable: true,
    })
    bio: string | null

    @Column({
        type: 'tinyint',
    })
    expectedTypeWork: number;

    @Column({
        nullable: true,
        length: 41,
    })
    targetWorkCity: string | null;

    @Column({
        type: 'tinyint',
    })
    expectedContractType: number

    @Column({
        type: 'decimal',
        precision: 7,
        scale: 2,
    })
    expectedSalary: number | null;

    @Column({
        default: false,
    })
    canTakeApprenticeship: boolean;

    @Column({
        type: 'tinyint'
    })
    monthsOfCommercialExp: number;

    @Column({
        nullable: true,
        type: 'longtext'
    })
    education: string | null;

    @Column({
        nullable: true,
        type: 'longtext'
    })
    workExperience: string | null;

    @Column({
        nullable: true,
        type: 'longtext'
    })
    courses: string | null;

    @Column({
        default: false,
    })
    isActive: boolean;

    @Column({
        type: "tinyint",
    })
    status: number;

    //@TODO relation for HR worker

    @OneToOne(() => StudentDegrees)
    @JoinColumn()
    degrees: StudentDegrees
}
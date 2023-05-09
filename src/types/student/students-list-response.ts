export class StudentListItem {
    id: string;
    firstName: string;
    lastName: string;
    githubUsername?: string;
    scheduledAt?: Date;
}

export class StudentsListResponse {
    students: StudentListItem[];
    totalPages: number;
}
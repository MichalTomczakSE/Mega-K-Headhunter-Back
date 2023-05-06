export interface StudentListItem {
    id: string;
    firstName: string;
    lastName: string;
    githubUsername?: string;
    scheduledAt?: Date;
}

export interface StudentsListResponse {
    students: StudentListItem[];
    totalPages: number;
}
export enum UserRole {
  admin = 1,
  hr = 2,
  student = 3,
}
export class UserEntity {
  id: string;
  email?: string;
  password: string;
  role: UserRole;
  currentToken: string;
}

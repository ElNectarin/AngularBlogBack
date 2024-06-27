export class CreateUserDto {
  id!: number;
  name!: string;
  userName!: string;
  email!: string;
  password!: string;
  profilePhoto?: string;
  status?: string;
  work?: string;
  location: string;
  education?: string;
  birthDay?: string;
  skills?: string;
}

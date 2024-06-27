export class CreatePostDto {
  id!: number;
  userId: number;
  postPhoto: File;
  title!: string;
  text!: string;
  tag: string;
}

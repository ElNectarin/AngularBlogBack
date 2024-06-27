export class CreateCommentDto {
  authorName: string;
  authorComment: string;
  userId: number;
  postId?: number;
}

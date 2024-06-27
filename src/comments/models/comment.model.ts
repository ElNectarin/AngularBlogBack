import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Post } from 'src/posts/models/post.model';
import { User } from 'src/users/models/user.model';

@Table
export class Comment extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column
  id!: number;

  @Column
  authorName: string;

  @Column
  authorComment: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Post)
  @Column
  postId: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Post)
  post: Post;
}

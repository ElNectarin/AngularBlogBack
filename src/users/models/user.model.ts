import {
  Column,
  Model,
  Table,
  AutoIncrement,
  PrimaryKey,
  Unique,
  AllowNull,
  HasMany,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/models/comment.model';
import { Post } from 'src/posts/models/post.model';

@Table
export class User extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column
  id: number;

  @Column
  name: string;

  @Column
  userName: string;

  @Column
  email: string;

  @Column
  password: string;

  @AllowNull
  @Column
  profilePhoto: string;

  @AllowNull
  @Column
  status: string;

  @AllowNull
  @Column
  work: string;

  @AllowNull
  @Column
  location: string;

  @AllowNull
  @Column
  education: string;

  @AllowNull
  @Column
  birthDay: string;

  @AllowNull
  @Column
  skills: string;

  @HasMany(() => Post)
  posts: Post[];

  @HasMany(() => Comment)
  comments: Comment[];
}

import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Comment } from 'src/comments/models/comment.model';
import { User } from 'src/users/models/user.model';

@Table
export class Post extends Model {
  @AutoIncrement
  @PrimaryKey
  @Unique
  @Column
  id!: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @AllowNull
  @Column
  postPhoto: string;

  @Column
  title!: string;

  @Column({
    type: DataType.TEXT,
  })
  text!: string;

  @AllowNull
  @Column
  tag: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comments: Comment[];
}

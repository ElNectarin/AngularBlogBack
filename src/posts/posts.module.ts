import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { User } from 'src/users/models/user.model';
import { Comment } from 'src/comments/models/comment.model';

@Module({
  imports: [SequelizeModule.forFeature([Post, User, Comment])],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}

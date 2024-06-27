import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { User } from './users/models/user.model';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { Post } from './posts/models/post.model';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/models/comment.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'Blog',
      models: [User, Post, Comment],
      autoLoadModels: true,
      synchronize: true,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

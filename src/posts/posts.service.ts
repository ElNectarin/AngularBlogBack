import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './models/post.model';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { Comment } from 'src/comments/models/comment.model';
import { join } from 'path';
import { readFile } from 'fs/promises';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async createPost(
    createPostDto: Partial<CreatePostDto>,
    userId: number,
  ): Promise<Post> {
    const post = new Post({ ...createPostDto, userId });
    return await post.save();
  }

  async findAllPosts(): Promise<any> {
    const posts: Post[] = await this.postModel.findAll({
      include: [
        {
          model: this.userModel,
          attributes: ['id', 'userName', 'profilePhoto'],
        },
        {
          model: this.commentModel,
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    for (const post of posts) {
      const user = post.user as User;
      const imagePath = join(process.cwd(), 'src/upload', user.profilePhoto);

      const buffer = await readFile(imagePath);
      const imageBase64 = buffer.toString('base64');

      post.user.profilePhoto = imageBase64;
    }
    return posts;
  }

  async findOnePost(id: number) {
    return await this.postModel.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: this.userModel,
          attributes: { exclude: ['password'] },
        },
        {
          model: this.commentModel,
        },
      ],
    });
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}

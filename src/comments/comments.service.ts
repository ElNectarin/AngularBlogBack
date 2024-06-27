import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from 'src/posts/models/post.model';
import { User } from 'src/users/models/user.model';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Comment)
    private commentModel: typeof Comment,
  ) {}

  async create(createCommentDto: Partial<CreateCommentDto>): Promise<Comment> {
    const foundedPost = await this.postModel.findOne({
      where: {
        id: createCommentDto.postId,
      },
    });
    if (!foundedPost) {
      console.error('No post');
    } else {
      console.log('foundedPost', foundedPost);
      return await this.commentModel.create({
        ...createCommentDto,
        postId: foundedPost.dataValues.id,
      });
    }
  }

  // findAllCommentsOnPost(postId: number) {
  //   const allComments = this.commentModel.findAll({
  //     where: {
  //       postId: postId,
  //     },
  //   });
  //   return allComments;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} comment`;
  // }

  // update(id: number, updateCommentDto: UpdateCommentDto) {
  //   return `This action updates a #${id} comment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} comment`;
  // }
}

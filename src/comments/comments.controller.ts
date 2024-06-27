import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './models/comment.model';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Req() req,
    @Body() comment: CreateCommentDto,
  ): Promise<Comment> {
    console.log(req.user);
    return await this.commentsService.create({
      ...comment,
      userId: req.user.userId,
      authorName: req.user.username,
    });
  }

  // @Get()
  // findAll(@Body() postId: number) {
  //   return this.commentsService.findAllCommentsOnPost(JSON.stringify(postId));
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.commentsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
  //   return this.commentsService.update(+id, updateCommentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.commentsService.remove(+id);
  // }
}

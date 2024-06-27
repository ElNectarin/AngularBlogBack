import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(
    FileInterceptor('profilePhoto', {
      dest: '/home/miri/Документы/Blog/blog-back/src/upload',
    }),
  )
  @Post('create')
  create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.usersService.createUser({
      ...createUserDto,
      profilePhoto: file ? file.filename : null,
    });
  }

  @Get()
  async findAll() {
    // const users: User[] = await this.usersService.findAll();
    // for (const user of users) {
    //   const imagePath = join(process.cwd(), 'src/upload', user.profilePhoto);
    //   const imageStream = createReadStream(imagePath);

    //   res.setHeader('Content-Type', 'image/jpeg');

    //   imageStream.pipe(res);
    // }

    // return users;
    return this.usersService.findAll();
  }

  @Get(':userName')
  findOne(@Param('userName') userName: string) {
    return this.usersService.findOneByUserNameWithoutPass(userName);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}

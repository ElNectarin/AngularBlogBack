import { UpdateUserDto } from './dto/update-user.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { Post } from 'src/posts/models/post.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
    @InjectModel(Post)
    private postModel: typeof Post,
  ) {}

  async createUser(createUserDto: Partial<CreateUserDto>): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: {
        email: createUserDto.email,
      },
    });
    if (existingUser) {
      console.error('User already exists');
    } else {
      const userPassword = await bcrypt.hash(createUserDto.password, 10);
      const user = new User({ ...createUserDto, password: userPassword });
      return await user.save();
    }
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll({
      attributes: { exclude: ['password'] },
    });
  }

  async findOneByUserNameWithoutPass(userName: string): Promise<any> {
    const user = await this.userModel.findOne({
      where: { userName },
      attributes: { exclude: ['password'] },
      include: {
        model: this.postModel,
        order: [['createdAt', 'DESC']],
      },
    });

    if (user.profilePhoto !== null) {
      const imagePath = join(process.cwd(), 'src/upload', user.profilePhoto);
      const buffer = await readFile(imagePath);
      const imageBase64 = buffer.toString('base64');

      user.profilePhoto = imageBase64;
    }

    return user;
  }

  async findOneByUserName(userName: string): Promise<User> {
    return this.userModel.findOne({
      where: { userName },
    });
  }

  async updateUser(id: number, UpdateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userModel.findOne({
      where: { id },
    });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }

    return await existingUser.update({ ...UpdateUserDto });
  }

  async removeUser(id: number) {
    return this.userModel.destroy({
      where: { id },
    });
  }
}

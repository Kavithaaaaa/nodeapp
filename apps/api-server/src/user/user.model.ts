import { AuthService } from './../auth/auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from '../schemas/';
import { BaseModel } from '../common/models/baseModel';
import { CreateUserDto } from './dto/createUser.dto';
import { ERROR } from '../common/constants';
import { isEmptyObj } from '../common/helpers/helper';

@Injectable()
export class UserModel extends BaseModel {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly authService: AuthService,
  ) {
    super(userModel);
  }
  async create(createUserDto: CreateUserDto) /*: Promise<User> */ {
    try {
      /*
       * Checking user is already exists or Not
       */
      const userExists = await this.findOne({ email: createUserDto.email });
      if (!isEmptyObj(userExists)) {
        throw new ForbiddenException(ERROR.USER_EXISTS);
      }
      await this.authService.signUpUser(createUserDto);

      return this.save(createUserDto);
    } catch (error) {
      console.log('error-->', error);
      throw new InternalServerErrorException(error.response);
    }
  }
}

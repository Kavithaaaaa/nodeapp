import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [UserModel, UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

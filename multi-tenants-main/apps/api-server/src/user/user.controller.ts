import { confirmNewPasswordDto } from './dto/confirmNewPassword.dto';
import { ConfirmUserDto } from './dto/confirmUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { forgotPasswordDto } from './dto/forgotPassword.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Login
   *
   * @param body Object
   * @returns object
   */
  @Post('signup')
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  /**
   * Confirm signup
   *
   * @param confirmUser object
   * @returns object
   */
  @Post('confirm-signup')
  async confirmSignup(@Body() confirmUser: ConfirmUserDto) {
    try {
      return await this.userService.confirmSignUp(confirmUser);
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Login user
   *
   * @param loginUser Object
   * @returns object
   */
  @Post('login')
  async loginUser(@Body() loginUser: LoginUserDto): Promise<any> {
    return await this.userService.loginUser(loginUser);
  }

  /**
   * Forgot password
   *
   * @param forgotPasswordData object
   * @returns object
   */
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordData: forgotPasswordDto) {
    return await this.userService.forgotPassword(forgotPasswordData);
  }

  /**
   * Confirm password
   *
   * @param confirmNewPasswordData Object
   * @returns object
   */
  @Post('confirm-password')
  async confirmNewPassword(
    @Body() confirmNewPasswordData: confirmNewPasswordDto,
  ) {
    return await this.userService.confirmPassword(confirmNewPasswordData);
  }

  /**
   * Rest password
   *
   * @param forgotPasswordData Object
   * @returns object
   */
  @Post('reset-password')
  async resetPassword(@Body() forgotPasswordData: confirmNewPasswordDto) {
    return await this.userService.confirmPassword(forgotPasswordData);
  }
}

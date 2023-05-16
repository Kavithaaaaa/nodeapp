import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserModel } from './user.model';
import { ConfirmUserDto } from './dto/confirmUser.dto';
import { AuthService } from '../auth/auth.service';
import { LoginUserDto } from './dto/loginUser.dto';

import { CONSTS, ERROR } from '../common/constants';
import { forgotPasswordDto } from './dto/forgotPassword.dto';
import { confirmNewPasswordDto } from './dto/confirmNewPassword.dto';
const { USER_REG_CONFIRM, SUCCESS_OTP, CHANGE_PASSWORD } = CONSTS;
const {
  USER_CONFIRM_FAILED,
  UNABLE_TO_LOGIN,
  EMAIL_NOT_VALID,
  NOT_VALID_EMAIL,
} = ERROR;
@Injectable()
export class UserService {
  constructor(
    private readonly userModel: UserModel,
    private readonly authService: AuthService,
  ) {}

  /**
   * Create user
   *
   * @param body object
   * @returns string
   */
  createUser(body): Promise<any> {
    return this.userModel.create(body);
  }

  /**
   * Confirm signup
   *
   * @param confirmUser object
   * @returns object
   */

  async confirmSignUp(confirmUser: ConfirmUserDto) {
    try {
      const user = await this.userModel.findOne({ email: confirmUser.email });
      const res = await this.authService.confirmSignUp(user, confirmUser.code);

      if (res) {
        return USER_REG_CONFIRM;
      } else {
        throw new ForbiddenException(USER_CONFIRM_FAILED);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.response);
    }
  }

  /**
   *Login user
   *
   * @param loginUserDto Object
   * @returns object
   */
  async loginUser(loginUserDto: LoginUserDto): Promise<any> {
    try {
      const res = await this.authService.signInUser(
        loginUserDto.email,
        loginUserDto.password,
      );
      if (res) {
        const userInfo = await this.userModel.findOne({
          email: loginUserDto.email,
        });
        return {
          user: userInfo,
          accessToken: res['AuthenticationResult'].AccessToken,
        };
      } else {
        throw new ForbiddenException(UNABLE_TO_LOGIN);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.response);
    }
  }

  /**
   * Validate user
   *
   * @param username sting
   * @param pass string
   * @returns object
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userModel.findOne({ email: username });
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   *Forgot password
   *
   * @param verifyUserEmailData Object
   * @returns string
   */
  async forgotPassword(verifyUserEmailData: forgotPasswordDto) {
    try {
      const res = await this.authService.forgotPassword(
        verifyUserEmailData.email,
      );
      if (res) {
        return `${SUCCESS_OTP} ` + verifyUserEmailData.email;
      } else {
        throw new ForbiddenException(EMAIL_NOT_VALID);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.response);
    }
  }

  /**
   * Confirm password
   *
   * @param confirmNewPasswordData object
   * @returns object
   */
  async confirmPassword(confirmNewPasswordData: confirmNewPasswordDto) {
    try {
      const { username, password, code } = confirmNewPasswordData;
      const res = this.authService.confirmNewPassword(username, password, code);
      if (res) {
        return {
          message: CHANGE_PASSWORD,
        };
      } else {
        throw new ForbiddenException(NOT_VALID_EMAIL);
      }
    } catch (error) {
      throw new InternalServerErrorException(error.response);
    }
  }
}

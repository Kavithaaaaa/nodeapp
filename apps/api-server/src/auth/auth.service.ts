import { CognitoIdentityProvider } from '@aws-sdk/client-cognito-identity-provider';
import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import { Observable } from 'rxjs';
import { CreateUserDto } from '../user/dto/createUser.dto';
import { CONSTS } from '../common/constants';
import { ConfigService } from '@nestjs/config';

const { ADMIN_USER_ROLE } = CONSTS;

@Injectable()
export class AuthService {
  private config = {
    apiVersion: this.configService.get('AWS_API_VERSION'),
    region: this.configService.get('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
    },
  };
  private secretHash = this.configService.get('AWS_SECRET_HASH');
  private clientId = this.configService.get('AWS_CLIENT_ID');
  private userPoolId = this.configService.get('AWS_USER_POOL_ID');
  private cognitoIdentity;

  constructor(private readonly configService: ConfigService) {
    this.cognitoIdentity = new CognitoIdentityProvider(this.config);
  }

  public async signUpUser(
    createUserDto: CreateUserDto,
  ): Promise<Observable<any>> {
    const { phonenumber, email, password } = createUserDto;

    const userAttr = phonenumber
      ? [
          {
            Name: 'phone_number',
            Value: phonenumber,
          },
        ]
      : [];

    const params = {
      ClientId: this.clientId /* required */,
      Password: password /* required */,
      Username: email /* required */,
      SecretHash: this.hashSecret(email),
      UserAttributes: userAttr,
    };

    return await this.cognitoIdentity
      .signUp(params)
      .then(async (response) => {
        console.log('User Sign up - Success ', response);
        await this.addUserToGrp(email, '1');
      })
      .catch((error) => {
        console.log('User Sign up - Failed', error);
      });
  }

  public async createGroup(group_name: string): Promise<boolean> {
    try {
      const params = {
        GroupName: group_name, //Description - role name
        UserPoolId: this.userPoolId,
      };
      console.log(params);
      await this.cognitoIdentity.createGroup(params);
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public async addUserToGrp(
    username: string,
    group_name: string,
  ): Promise<boolean> {
    try {
      const params = {
        GroupName: group_name,
        UserPoolId: this.userPoolId,
        Username: username,
      };
      console.log(params);
      await this.cognitoIdentity.adminAddUserToGroup(params);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  public async signInUser(
    email: string,
    password: string,
  ): Promise<Observable<any>> {
    console.log('AuthsignInUser ', email, password);

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH' /* required */,
      ClientId: this.clientId /* required */,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: this.hashSecret(email),
      },
    };

    return await this.cognitoIdentity
      .initiateAuth(params)
      .then((response) => {
        console.log('User Sign IN - Success ', response);
        return response;
      })
      .catch((error) => {
        console.log('User Sign IN - Failed', error);
        return false;
      });
  }

  // private cognitoConfirmSignUp(user, code) {}

  public async confirmSignUp(user: any, code: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const params = {
        ClientId: this.clientId,
        ConfirmationCode: code,
        Username: user.email,
        SecretHash: this.hashSecret(user.email),
      };
      return await this.cognitoIdentity
        .confirmSignUp(params)
        .then((response) => {
          if (
            user.roles.split(',').indexOf(ADMIN_USER_ROLE) >= 0 &&
            user.phonenumber
          ) {
            /*   this.cognitoIdentity
              .adminSetUserMFAPreference({
                Username: 'kartheej@gmail.com',
                UserPoolId: 'ap-south-1_qn4mxY371',
                SMSMfaSettings: {
                  Enabled: true,
                  PreferredMfa: true,
                },
                SoftwareTokenMfaSettings: {
                  Enabled: false,
                  PreferredMfa: false,
                },
              })
              .then((response) => {
                console.log('MFA Added - success ', response);
              })
              .catch((error) => {
                console.log('MFA Added - failed ', error);
              }); */
          }

          resolve(response);
          //console.log('User Verification - Success ', response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  public async forgotPassword(email): Promise<boolean> {
    const params = {
      ClientId: this.clientId /* required */,
      Username: email /* required */,
      SecretHash: this.hashSecret(email),
    };

    return await this.cognitoIdentity
      .forgotPassword(params)
      .then((response) => {
        console.log('Forgot Password - Success ', response);
        return true;
      })
      .catch((error) => {
        console.log('Forgot Password - Failed', error);
        return false;
      });
  }

  public async confirmNewPassword(
    username: string,
    password: string,
    code: string,
  ): Promise<boolean> {
    const params = {
      ClientId: this.clientId /* required */,
      ConfirmationCode: code /* required */,
      Password: password /* required */,
      Username: username /* required */,
      SecretHash: this.hashSecret(username),
    };

    return await this.cognitoIdentity
      .confirmForgotPassword(params)
      .then((response) => {
        console.log('Forgot Password - Success ', response);
        return true;
      })
      .catch((error) => {
        console.log('Forgot Password - Failed', error);
        return false;
      });
  }

  private hashSecret(username: string): string {
    return crypto
      .createHmac('SHA256', this.secretHash)
      .update(username + this.clientId)
      .digest('base64');
  }
}

import { ERROR } from './../common/constants/errorMessages';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { HttpService } from '@nestjs/axios';
import * as jwkToPem from 'jwk-to-pem';
import { UserService } from '../user/user.service';
import { ExpressRequest } from '../types/expressRequest.interface';
const pems: { [key: string]: any } = {};

const { REQUEST_NOT_SUCC, UNABLE_TO_LOAD } = ERROR;
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async use(req: ExpressRequest, _: Response, next: NextFunction) {
    console.log('MIDDLEWARE');
    const cognitoPromise = new Promise(async (resolve, reject) => {
      const URL = this.configService.get('AWS_COGNITO_JWK_URL');
      try {
        this.httpService.get(URL).subscribe((response) => {
          if (response.status !== 200) {
            throw REQUEST_NOT_SUCC;
          }
          const { keys } = response.data;
          for (let i = 0; i < keys.length; i++) {
            const key_id = keys[i].kid;
            const modulus = keys[i].n;
            const exponent = keys[i].e;
            const key_type = keys[i].kty;
            const jwk = { kty: key_type, n: modulus, e: exponent };
            const pem = jwkToPem(jwk);
            pems[key_id] = pem;
          }
          resolve(pems);
        });
      } catch (error) {
        reject(UNABLE_TO_LOAD);
      }
    });

    if (!req.headers['authorization']) {
      req.user = null;
      next();
      return;
    }
    const resultCognito = await cognitoPromise;

    const token = req.headers['authorization'].split(' ')[1];
    try {
      const publicKey = resultCognito[Object.keys(resultCognito).pop()];
      req.user = await verify(token, publicKey, { algorithms: ['RS256'] });
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}

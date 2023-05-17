import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import axios from 'axios';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}
  s3 = new S3();

  /**
   *Generating presigned url
   *
   * @param fileName sting
   * @returns Promise
   */
  generateS3PresignedUrl(fileName) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Key: `${this.configService.get('S3_FOLDER_NAME')}/${fileName}`,
      };
      return this.s3.getSignedUrlPromise('putObject', params).then(
        (result) => resolve(result),
        (error) => reject(error),
      );
    });
  }

  /**
   * Getting presigned url
   *
   * @param fileName string
   * @returns Promise
   */
  getSignedUrl(fileName) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Key: `${this.configService.get('S3_FOLDER_NAME')}/${fileName}`,
      };

      return this.s3.getSignedUrlPromise('getObject', params).then(
        (result) => resolve(result),
        (error) => reject(error),
      );
    });
  }

  /**
   * Upload image by using presigned url
   *
   * @param url string
   * @param imageContents  object
   * @returns promise
   */
  uploadImageByPresignedUrl(url, imageContents) {
    return new Promise((res, rej) => {
      const { mimetype, buffer } = imageContents;
      const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: url,
        headers: {
          'Content-Type': mimetype,
        },
        data: buffer,
      };
      return axios
        .request(config)
        .then((response) => {
          res(JSON.stringify(response.data));
        })
        .catch((error) => {
          rej(error);
        });
    });
  }

  /**
   * Upload file in S3 bucket
   *
   * @param fileName string
   * @param blob object
   * @returns string
   */
  async uploadFileInS3(fileName, blob) {
    try {
      const { mimetype, buffer } = blob;

      const params = {
        ContentType: mimetype,
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Key: `${this.configService.get('S3_FOLDER_NAME')}/${fileName}`,
        Body: buffer,
      };

      const data = await this.s3.upload(params).promise();
      const { Location } = data;
      return Location;
    } catch (error) {
      return error;
    }
  }

  s3ListObject(fileName) {
    return new Promise((resolve, reject) => {
      const params = {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Prefix: `${this.configService.get('S3_FOLDER_NAME')}/${fileName}`,
      };
      return this.s3.listObjectsV2(params, (err, data) => {
        if (err) {
          reject(err);
        }

        resolve(
          data.Contents.map((i) => {
            return { Key: i.Key };
          }),
        );
      });
    });
  }

  s3DeleteObject(deleteArray) {
    return new Promise((resolve, reject) => {
      const deleteParam = {
        Bucket: this.configService.get('S3_BUCKET_NAME'),
        Delete: {
          Objects: deleteArray,
        },
      };
      return this.s3.deleteObjects(deleteParam, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
}

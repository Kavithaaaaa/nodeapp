import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TenantModel } from './tenant.model';
import { S3Service } from '../common/s3/s3.service';
import { generateNewFileName, trimStringArray } from '../common/helpers/helper';
import { ERROR } from './../common/constants';

const { ONLY_ARCHIVAL } = ERROR;

@Injectable()
export class TenantService {
  constructor(
    private readonly tenantModel: TenantModel,
    private readonly s3Service: S3Service,
  ) {}

  /**
   * tenant List
   *
   * @returns Object
   */
  tenantList() {
    return this.tenantModel.tenantList();
  }

  /**
   * Save tenant data
   *
   * @param tenantBody Object
   * @returns  Object
   */
  async saveTenant(file, tenantBody) {
    try {
      const { originalname } = file || {};
      const { programs, additionalFeature } = tenantBody;

      if (additionalFeature) {
        /**
         * Convert string to array and remove white space
         */
        tenantBody.additionalFeature = trimStringArray(additionalFeature);
      }
      if (programs) {
        /**
         * Convert string to array and remove white space
         */
        tenantBody.programs = trimStringArray(programs);
      }

      /**
       * Renaming file name
       */
      const renameImageName = generateNewFileName(originalname);
      const tenantInfo = await this.tenantModel.saveTenant(tenantBody);
      const { _id } = tenantInfo;
      let s3Location = '';

      if (typeof file !== 'undefined') {
        /**
         * Uploading image in s3 bucket
         */
        s3Location = await this.s3Service.uploadFileInS3(
          `${_id}/${renameImageName}`,
          file,
        );
      }
      /**
       * Updating tenant data in db
       */
      return this.updateById(_id, { clientLogo: s3Location });
    } catch (error) {
      return error;
    }
  }

  /**
   * Find tenant by Object id
   *
   * @param id String
   * @returns Object
   */
  findById(id: string): Promise<any> {
    return this.tenantModel.findById({ _id: id, isDelete: false });
  }

  /**
   * Search
   *
   * @param query String
   * @returns Object
   */
  findInAllColumn(query: string): Promise<any> {
    return this.tenantModel.findInAllColumn(query);
  }

  /**
   * Update tenant By Object id
   *
   * @param id String
   * @param data  Object
   * @returns Object
   */
  async updateById(id: string, data: any): Promise<any> {
    const { acknowledged } = await this.tenantModel.updateById(id, data);

    if (acknowledged) {
      return this.findById(id);
    }
    return [];
  }

  /**
   * Delete Tenant by Object id
   *
   * @param id String
   * @returns Object
   */
  removeById(id: string): Promise<any> {
    return this.tenantModel.removeById(id);
  }

  /**
   * Get archive list
   *
   * @returns Object
   */

  getArchiveList(): Promise<any> {
    return this.tenantModel.getArchiveList();
  }

  /**
   *Search archive
   *
   * @param query string
   * @returns Object
   */
  searchArchive(query: string): Promise<any> {
    return this.tenantModel.searchArchive(query);
  }

  /**
   *get signed url
   *
   * @param key String
   * @returns object
   */
  getSignedUrl(key): Promise<any> {
    return this.s3Service.getSignedUrl(key);
  }

  /**
   * Update tenant
   *
   * @param id ObjectId
   * @param file Object
   * @param tenantBody object
   * @returns object
   */
  async updateTenants(id, file, tenantBody) {
    const { originalname } = file || {};
    const { isDelete } = tenantBody;
    if (isDelete) {
      const { isArchive } = await this.tenantModel.findOne(
        { _id: id },
        { isArchive: 1 },
      );
      if (typeof isArchive !== 'undefined' && !isArchive) {
        throw new HttpException(ONLY_ARCHIVAL, HttpStatus.BAD_REQUEST);
      }
    }

    /**
     * Fetch file and delete from s3 bucket
     */
    const s3ImageList: any = await this.s3Service.s3ListObject(id);
    if (s3ImageList.length) {
      await this.s3Service.s3DeleteObject(s3ImageList);
    }

    /**
     * Renaming file name
     */
    const renameImageName = generateNewFileName(originalname);

    if (typeof file !== 'undefined') {
      /**
       * Uploading image in s3 bucket
       */
      const s3Location = await this.s3Service.uploadFileInS3(
        `${id}/${renameImageName}`,
        file,
      );
      tenantBody.clientLogo = s3Location;
    }
    const { programs, additionalFeature } = tenantBody;
    if (additionalFeature) {
      /**
       * Convert string to array and remove white space
       */
      tenantBody.additionalFeature = trimStringArray(additionalFeature);
    }
    if (programs) {
      /**
       * Convert string to array and remove white space
       */
      tenantBody.programs = trimStringArray(programs);
    }

    /**
     * Updating tenant info in db with s3 location
     */
    return this.updateById(id, tenantBody);
  }
}

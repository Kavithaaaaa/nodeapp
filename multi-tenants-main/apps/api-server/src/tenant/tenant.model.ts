import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Tenants } from '../schemas';

@Injectable()
export class TenantModel {
  constructor(
    @InjectModel(Tenants.name)
    private readonly tenantModel: Model<Tenants>,
  ) {}

  find(id) {
    return this.tenantModel.find(
      { ...id, ...{ isActive: true } },
      { __v: 0, isActive: 0 },
    );
  }

  tenantList() {
    return this.tenantModel.find(
      { isDelete: false, isArchive: false },
      { __v: 0 },
    );
  }

  saveTenant(tenantBody) {
    const tenant = new this.tenantModel(tenantBody);
    return tenant.save();
  }

  findById(where) {
    return this.tenantModel.find(where);
  }

  updateById(id, data): Promise<any> {
    return this.tenantModel.updateOne({ _id: id }, { $set: data });
  }

  removeById(id) {
    return this.tenantModel.updateOne(
      { _id: id },
      { $set: { isDelete: true } },
    );
  }

  getArchiveList() {
    return this.tenantModel.find({ isDelete: false, isArchive: true });
  }

  searchArchive(query) {
    const columnName = ['name', 'state', 'email'];
    const columnWIthValue = columnName.map((i) => {
      return { [i]: { $regex: '.*' + query + '.*' } };
    });
    return this.findAll({
      $or: columnWIthValue,
      isDelete: false,
      isArchive: true,
    });
  }

  findAll(where) {
    return this.tenantModel.find(where);
  }

  findOne(where, projection = {}) {
    return this.tenantModel.findOne(where, projection).exec();
  }

  findInAllColumn(query) {
    const columnName = ['name', 'state', 'email'];
    const columnWIthValue = columnName.map((i) => {
      return { [i]: { $regex: '.*' + query + '.*' } };
    });

    return this.findAll({
      $or: columnWIthValue,
      isDelete: false,
      isArchive: false,
    });
  }
}

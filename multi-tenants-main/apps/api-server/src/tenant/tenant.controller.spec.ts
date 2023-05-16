import { Test, TestingModule } from '@nestjs/testing';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

import { tenantStub } from './stubs/tenant.stub';
import mongoose, { Types } from 'mongoose';
import { getByValue } from '../common/helpers/helper';

const MockTenantService = jest.fn().mockReturnValue({
  tenantList: jest.fn().mockReturnValue(tenantStub()),
  findById: jest.fn().mockImplementation((ele) => {
    return tenantStub().find((item) => (item._id = ele));
  }),
  saveTenant: jest.fn().mockImplementation(() => {
    return {
      _id: new mongoose.Types.ObjectId(),
    };
  }),
  findInAllColumn: jest.fn().mockImplementation((query) => {
    return getByValue(tenantStub(), query);
  }),
  removeById: jest.fn().mockImplementation((ele) => {
    return tenantStub().filter((item) => item._id !== ele);
  }),
  updateById: jest.fn().mockImplementation((objectId, data) => {
    const filterTenantData = tenantStub().find((item) => item._id === objectId);

    return { ...filterTenantData, ...data };
  }),
  getArchiveList: jest.fn().mockImplementation(() => {
    return tenantStub().filter((i) => {
      return i.isDelete === false && i.isArchive === true ? true : false;
    });
  }),
  searchArchive: jest.fn().mockImplementation((query) => {
    return getByValue(tenantStub(), query);
  }),
  updateTenants: jest.fn().mockImplementation((objectId, data) => {
    const filterTenantData = tenantStub().find((item) => item._id === objectId);

    return { ...filterTenantData, ...data };
  }),
});

describe('TenantController', () => {
  let controller: TenantController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantController],
      providers: [
        {
          provide: TenantService,
          useClass: MockTenantService,
        },
      ],
    }).compile();

    controller = module.get<TenantController>(TenantController);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be call tenantList method', () => {
    expect(controller.tenantList()).toBeDefined();
    expect(controller.tenantList()).toEqual(tenantStub());
  });

  it('should be call findById method', () => {
    const idObj = { id: '64391d05b9de5e7f1ad13d0e' };

    expect(controller.findById(idObj)).toBeDefined();
    expect(controller.findById(idObj)).toEqual(tenantStub()[0]);
  });

  it('should be call addTenant method', async () => {
    const body = tenantStub()[0];
    delete body._id;
    expect(controller.saveTenant('', body)).toBeDefined();

    const insertData = await controller.saveTenant('', body);
    expect(Types.ObjectId.isValid(insertData._id)).toBeTruthy();
  });

  it('should be call search method', async () => {
    expect(controller.search({ query: 'abc' })).toBeDefined();
  });

  it('should be call getArchive method', async () => {
    expect(controller.getArchive()).toBeDefined();
    expect(controller.getArchive()).toEqual(tenantStub());
  });

  it('should be call updateById method', async () => {
    const updatePayload = tenantStub()[0];
    const updateRes = await controller.updateById(
      { id: '64391d05b9de5e7f1ad13d0e' },
      {},
      updatePayload,
    );
    expect(updateRes).toBeDefined();
    expect(updateRes.type).toEqual(updatePayload.type);
  });

  it('should be call removeById method', async () => {
    const removeRes = await controller.removeById({
      id: '64391d05b9de5e7f1ad13d0e',
    });
    expect(removeRes).toBeDefined();
    expect(removeRes.length).toBeFalsy();
  });

  it('should be call searchArchive method', async () => {
    expect(controller.searchArchive({ query: 'abc' })).toBeDefined();
  });
});

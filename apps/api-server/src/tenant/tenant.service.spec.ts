import { Test, TestingModule } from '@nestjs/testing';
import { TenantService } from './tenant.service';
import { tenantStub } from './stubs/tenant.stub';
import { Types } from 'mongoose';
import { TenantModel } from './tenant.model';
import { S3Service } from '../common/s3/s3.service';

describe('TenantService', () => {
  let service: TenantService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: S3Service, useValue: { uploadFileInS3: jest.fn() } },
        {
          provide: TenantModel,
          useValue: {
            tenantList: jest.fn().mockResolvedValue(tenantStub()),
            saveTenant: jest.fn().mockResolvedValue(tenantStub()[0]),
            removeById: jest.fn().mockResolvedValue({ acknowledged: true }),
            updateById: jest.fn().mockResolvedValue({ acknowledged: true }),
            findInAllColumn: jest.fn().mockResolvedValue(tenantStub()[0]),
            searchArchive: jest.fn().mockResolvedValue(tenantStub()[0]),
            findById: jest.fn().mockImplementation((ele) => {
              return tenantStub().find((item) => item._id === ele._id);
            }),
            getArchiveList: jest.fn().mockImplementation(() => {
              return tenantStub().find(
                (i) => i.isDelete === false && i.isArchive === true,
              );
            }),
          },
        },
        TenantService,
      ],
    }).compile();

    service = module.get<TenantService>(TenantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be call tenantList method', async () => {
    const result = await service.tenantList();
    expect(result).toEqual(tenantStub());
  });

  it('should be call findById method', async () => {
    const findResult = await service.findById('64391d05b9de5e7f1ad13d0e');

    expect(findResult).toBeDefined();
    expect(findResult).toEqual(tenantStub()[0]);
  });

  it('should be call addTenant method', async () => {
    const body = tenantStub()[0];
    delete body._id;
    const saveData = await service.saveTenant({}, body);

    expect(Types.ObjectId.isValid(saveData._id)).toBeTruthy();
  });

  it('should be call findInAllColumn method', async () => {
    expect(service.findInAllColumn('abc')).toBeDefined();
  });
  it('should be call searchArchive method', async () => {
    expect(service.searchArchive('abc')).toBeDefined();
  });

  it('should be call removeById method', async () => {
    const outPut = await service.removeById('64391d05b9de5e7f1ad13d0e');
    expect(outPut).toBeDefined();
    expect(outPut.acknowledged).toBeTruthy();
  });
  it.only('should be call updateById method', async () => {
    const outPut = await service.updateById('64391d05b9de5e7f1ad13d0e', {
      ...tenantStub()[0],
    });

    expect(outPut).toBeDefined();
  });

  it('should be call getArchiveList method', async () => {
    const outPut = await service.getArchiveList();
    expect(outPut).toBeDefined();
    expect(outPut.isDelete).toBeFalsy();
    expect(outPut.isArchive).toBeTruthy();
  });
});

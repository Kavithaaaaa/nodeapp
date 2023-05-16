import { idDto } from './../common/dtos/query.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Put,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { TenantService } from './tenant.service';
import { EditTenantDto, SearchDto, TenantDto } from './dto/add-tenant.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('tenants')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  /**
   * Getting tenant list
   *
   * @returns Object
   */
  @Get()
  tenantList() {
    return this.tenantService.tenantList();
  }

  /**
   * Saving tenants
   *
   * @param tenantDto Object
   * @returns Object
   */
  @Post()
  @UseInterceptors(FileInterceptor('clientLogo'))
  saveTenant(@UploadedFile() file, @Body() tenantDto: TenantDto) {
    return this.tenantService.saveTenant(file, tenantDto);
  }

  /**
   * Search
   *
   * @param param Object
   * @returns Object
   */
  @Get('search')
  search(@Query() { query }: SearchDto) {
    return this.tenantService.findInAllColumn(query);
  }

  /**
   * Get archive list
   */
  @Get('/getArchive')
  getArchive() {
    return this.tenantService.getArchiveList();
  }

  /**
   * Search archive
   *
   * @param param string
   * @returns object
   */
  @Get('/searchArchive')
  searchArchive(@Query() { query }: SearchDto) {
    return this.tenantService.searchArchive(query);
  }

  /**
   * Update tenant by Object id
   *
   * @param param Object
   * @param body  Object
   * @returns Object
   */
  @Put(':id')
  @UseInterceptors(FileInterceptor('clientLogo'))
  updateById(
    @Param() { id }: idDto,
    @UploadedFile() file,
    @Body() body: EditTenantDto,
  ) {
    return this.tenantService.updateTenants(id, file, body);
  }

  @Get('getClientLogo')
  getPreSignedUrl(@Query() { id, clientLogo }: any) {
    return this.tenantService.getSignedUrl(`${id}/${clientLogo}`);
  }

  /**
   * Get  tenant by id
   * @param param Object
   * @returns Object
   */
  @Get(':id')
  findById(@Param() { id }: idDto) {
    return this.tenantService.findById(id);
  }

  /**
   * Delete tenant
   *
   * @param param  Object
   * @returns Object
   */
  @Delete(':id')
  removeById(@Param() { id }: idDto) {
    return this.tenantService.removeById(id);
  }
}

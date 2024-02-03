import * as c from '@nestjs/common';
import * as sw from '@nestjs/swagger';
import { Types } from 'mongoose';

import { TokenPairsService } from '@github.com/pavhov/price-oracle-service-task/price-oracle/token-pairs/token-pairs.service';
import * as dto from '@github.com/pavhov/price-oracle-service-task/price-oracle/token-pairs/dto/input';
import { ParseObjectIdPipe } from '@github.com/pavhov/price-oracle-service-task/service/pipe/parce-object-id.pipe';

@sw.ApiTags('Token pairs')
@c.Controller('token-pairs')
export class TokenPairsController {
  constructor(private readonly tokenPairsService: TokenPairsService) {}

  @sw.ApiOperation({ description: 'Token pair creation' })
  @c.Post()
  async create(@c.Body() inputDto: dto.CreateInput) {
    return this.tokenPairsService.create(inputDto);
  }
  @sw.ApiOperation({ description: 'Get token pair list' })
  @c.Get()
  async findAll(@c.Query() inputDto: dto.FilterInput) {
    return this.tokenPairsService.findAll(inputDto);
  }
  @sw.ApiOperation({ description: 'Get token pair' })
  @sw.ApiParam({ name: 'id', type: 'string' })
  @c.Get(':id')
  async findOne(@c.Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.tokenPairsService.findOne(id);
  }
  @sw.ApiOperation({ description: 'Token pair update' })
  @sw.ApiParam({ name: 'id', type: 'string' })
  @c.Patch(':id')
  async update(
    @c.Param('id', ParseObjectIdPipe) id: Types.ObjectId,
    @c.Body() inputDto: dto.UpdateInput,
  ) {
    return this.tokenPairsService.update(id, inputDto);
  }
  @sw.ApiOperation({ description: 'Token pair remove' })
  @sw.ApiParam({ name: 'id', type: 'string' })
  @c.Delete(':id')
  async remove(@c.Param('id', ParseObjectIdPipe) id: Types.ObjectId) {
    return this.tokenPairsService.remove(id);
  }
}

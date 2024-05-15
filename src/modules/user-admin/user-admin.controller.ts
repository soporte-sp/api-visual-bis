import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { UserAdminService } from './user-admin.service';
import { CreateUserAdminDto, createUserAdminSchema } from './user-admin.dto';
import { ZodValidationPipe } from 'src/common/ZodValidationPipe';

@Controller('user-admin')
export class UserAdminController {
  constructor(private readonly userAdminService: UserAdminService) {}
  @Post()
  @UsePipes(new ZodValidationPipe(createUserAdminSchema))
  async create(@Body() createUserAdminDto: CreateUserAdminDto) {
    return this.userAdminService.create(createUserAdminDto);
  }

  @Get()
  findAll() {
    return this.userAdminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAdminService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserAdminDto: CreateUserAdminDto,
  ) {
    return this.userAdminService.update(+id, updateUserAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAdminService.remove(+id);
  }
}

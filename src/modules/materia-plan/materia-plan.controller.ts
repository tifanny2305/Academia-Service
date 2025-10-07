import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { MateriaPlanService } from './materia-plan.service';
import { CreateMateriaPlanDto } from './dto/create-materia-plan.dto';
import { UpdateMateriaPlanDto } from './dto/update-materia-plan.dto';

@Controller('materia-plan')

export class MateriaPlanController {
  constructor(
    private readonly materiaPlanService: MateriaPlanService,
  ) {}

  @Post()
  async create(@Body() dto: CreateMateriaPlanDto) {
    return this.materiaPlanService.create(dto);
  }

  @Get()
  async findAll() {
    return this.materiaPlanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.materiaPlanService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMateriaPlanDto) {
    return this.materiaPlanService.update(+id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.materiaPlanService.remove(+id);
  }
}

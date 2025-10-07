import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MateriaPlan } from './entities/materia-plan.entity';
import { CreateMateriaPlanDto } from './dto/create-materia-plan.dto';
import { UpdateMateriaPlanDto } from './dto/update-materia-plan.dto';

@Injectable()
export class MateriaPlanService {
  constructor(
    @InjectRepository(MateriaPlan)
    private readonly repo: Repository<MateriaPlan>,
  ) {}

  async create(dto: CreateMateriaPlanDto) {
    const entity = this.repo.create({
      materia: { id: dto.materia_id },
      planEstudio: { id: dto.plan_estudio_id },
    });
    return this.repo.save(entity);
  }

  findAll() {
    return this.repo.find({ relations: ['planEstudio'] });
  }

  async findOne(id: number) {
    const e = await this.repo.findOne({ where: { id }, relations: ['planEstudio'] });
    if (!e) throw new NotFoundException(`MateriaPlan ${id} no encontrada`);
    return e;
  }

  async update(id: number, dto: UpdateMateriaPlanDto) {
    const e = await this.findOne(id);
    Object.assign(e, dto);
    return this.repo.save(e);
  }

  async remove(id: number) {
    const e = await this.findOne(id);
    await this.repo.remove(e);
    return { message: `MateriaPlan ${id} eliminada correctamente` };
  }
}

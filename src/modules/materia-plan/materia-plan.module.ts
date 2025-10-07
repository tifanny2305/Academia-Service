import { Module } from '@nestjs/common';
import { MateriaPlanService } from './materia-plan.service';
import { MateriaPlanController } from './materia-plan.controller';
import { MateriaPlan } from './entities/materia-plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MateriaPlan])],
  controllers: [MateriaPlanController],
  providers: [MateriaPlanService],
  exports: [MateriaPlanService],
})
export class MateriaPlanModule {}

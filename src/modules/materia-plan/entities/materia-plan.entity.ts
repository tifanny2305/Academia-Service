import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { PlanEstudio } from '../../plan-estudio/entities/plan-estudio.entity';

// Placeholder para Materia
@Entity('materias')
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
}

@Entity('materia_planes')
export class MateriaPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Materia)
  @JoinColumn({ name: 'materia_id' })
  materia: Materia;

  @ManyToOne(() => PlanEstudio, (plan) => plan.materias)
  @JoinColumn({ name: 'plan_estudio_id' })
  planEstudio: PlanEstudio;
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultadModule } from './modules/facultad/facultad.module';
import { CarreraModule } from './modules/carrera/carrera.module';
import { MateriaPlanModule } from './modules/materia-plan/materia-plan.module';
import { PlanEstudioModule } from './modules/plan-estudio/plan-estudio.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DATABASE_HOST'),
        port: config.get<number>('DATABASE_PORT') || 5432,
        username: config.get<string>('DATABASE_USER'),
        password: config.get<string>('DATABASE_PASSWORD'),
        database: config.get<string>('DATABASE_NAME'),
        autoLoadEntities: true,
        synchronize: config.get<string>('NODE_ENV') !== 'production', // solo en desarrollo
        ssl: config.get<string>('DB_SSL') === 'true', // útil para entornos cloud
        extra: {
          connectionLimit: 10,
          statement_timeout: 60000,
          idle_in_transaction_session_timeout: 60000,
        },
      }),
    }),
    PlanEstudioModule,
    MateriaPlanModule,
    FacultadModule,
    CarreraModule,
  ],
})
export class AppModule { }

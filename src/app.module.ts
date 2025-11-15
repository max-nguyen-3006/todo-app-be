import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Task } from './task/entities/task.entity';
import { ConflictEntity } from 'src/demo-conflict/entities/conflict.entity';
import { ConflictService } from 'src/demo-conflict/conflict.service';
import { ConflictModule } from 'src/demo-conflict/conflict.module';

@Module({
  imports: [ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'devops-playground-postgres-service',  //'db' 
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'mydb',
      entities: [Task, ConflictEntity],
      //synchronize: true, 
    }),
    TaskModule,
    ConflictModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

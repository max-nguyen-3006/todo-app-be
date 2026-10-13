import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
// DB tạm tắt: bỏ comment các dòng "DB" bên dưới để bật lại kết nối Postgres
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TaskModule } from './task/task.module';
// import { Task } from './task/entities/task.entity';
// import { ConflictEntity } from 'src/demo-conflict/entities/conflict.entity';
// import { ConflictService } from 'src/demo-conflict/conflict.service';
// import { ConflictModule } from 'src/demo-conflict/conflict.module';
import { MetricsModule } from 'src/metrics/metrics.module';

// const dbHost = process.env.DB_HOST || 'localhost';
// console.log('DB_HOST =', dbHost);

@Module({
  imports: [ConfigModule.forRoot(),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: dbHost,
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'mydb',
    //   entities: [Task, ConflictEntity],
    //   //synchronize: true,
    // }),
    // TaskModule,     // cần DB (TypeOrmModule.forFeature)
    // ConflictModule, // cần DB (onModuleInit chạy CREATE TABLE)
    MetricsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

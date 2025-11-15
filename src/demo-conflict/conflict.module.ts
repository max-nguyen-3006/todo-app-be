import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConflictEntity } from 'src/demo-conflict/entities/conflict.entity';
import { ConflictService } from 'src/demo-conflict/conflict.service';


@Module({
  imports: [TypeOrmModule.forFeature([ConflictEntity])],
  providers: [ConflictService],
  controllers: [],
})
export class ConflictModule {}

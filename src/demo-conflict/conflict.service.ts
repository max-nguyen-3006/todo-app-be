import { Injectable, OnModuleInit } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConflictEntity } from './entities/conflict.entity';
import * as os from 'os';

@Injectable()
export class ConflictService implements OnModuleInit {
  constructor(
    @InjectRepository(ConflictEntity)
    private readonly repo: Repository<ConflictEntity>,
    private readonly dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const pod = process.env.HOSTNAME || os.hostname();

    console.log(`-- [${pod}] INIT START`);

    // STEP 1: Create table
    await this.dataSource.query(`
      CREATE TABLE IF NOT EXISTS conflict_entity (
        id int PRIMARY KEY,
        pod_name varchar(255),
        created_at timestamp
      );
    `);

    console.log(`---- [${pod}] TABLE READY`);

    // STEP 2: Insert record
    try {
      await this.repo.insert({
        id: 1,
        podName: pod,
        createdAt: new Date(),
      });

      console.log(`---- [${pod}] INSERT SUCCESS`);
    } catch (err) {
      console.log(`---- [${pod}] INSERT FAILED → ${err.message}`);
    }
  }
}

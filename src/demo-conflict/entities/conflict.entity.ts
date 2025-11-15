import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class ConflictEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  podName: string;

  @Column()
  createdAt: Date;
}

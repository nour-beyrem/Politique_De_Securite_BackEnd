/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('sensibilisation')
export class ProgrammeSensibilisationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  theme: string;

  @Column({ type: 'varchar' })
  sujetPlotique: string;

  @Column({ type: 'varchar' })
  duree: string;

  @Column({ type: 'varchar' })
  lieu: string;

  @Column({})
  Date: Date;

  @Column({ type: 'varchar' })
  pv: string;

  @Column({ type: 'varchar' })
  etat: string;

  @Column({ type: 'varchar' })
  presence: string;

  @Column({ type: 'varchar' })
  publicConcerne: string;

  
}

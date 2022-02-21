/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ReunionEntity } from './reunion.entity';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('cellule')
export class CelluleEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  president: string;

  @Column({ type: 'varchar' })
  membre1: string;

  @Column({ type: 'varchar' })
  membre2: string;

  @OneToMany((type) => ReunionEntity, (reunion) => reunion.cellule, {
    cascade: true,
  })
  reunionC: ReunionEntity[];
}

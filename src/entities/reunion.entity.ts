/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CelluleEntity } from './cellule.entity';
import { TimestampEntity } from './timestamp.entity';

@Entity('reunion')
export class ReunionEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  ordreDuJour: string;

  @Column({ type: 'varchar' })
  discussion: string;

  @Column({ type: 'varchar' })
  decision: string;

  @Column({ type: 'varchar' })
  lieu: string;

  @Column({})
  Date: Date;

  @ManyToOne((type) => CelluleEntity, (cellule) => cellule.reunionC, {
    nullable: true,
    eager: true,
  })
  cellule: CelluleEntity;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
@Entity('incident')
export class IncidentEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  Date:string;

  @Column({ type: 'varchar' })
  nomIncident: string;

  @Column({ type: 'varchar' })
  source: string;

  @Column({ type: 'varchar' })
  destination: string;

  @Column({ type: 'varchar' })
  impact: string;

  @Column({ type: 'varchar' })
  dureePerturbation: string;

  @Column({ type: 'varchar' })
  intervention: string;

  @Column({ type: 'varchar' })
  dommage: string;

  @Column({ type: 'varchar' })
  demarcheRepartion: string;

  @Column({ type: 'varchar' })
  demarchePrevention: string;
}

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('incident')
export class IncidentEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({})
  Date: Date;

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

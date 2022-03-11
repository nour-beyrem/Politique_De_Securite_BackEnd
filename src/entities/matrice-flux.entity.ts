import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
@Entity('fluxmatrice')
export class MatriceFluxEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  ref: string;

  @Column({ type: 'varchar' })
  nom: string;

  @Column({ type: 'varchar' })
  VLANCompus: string;
  @Column({ type: 'varchar' })
  CloudServeur: string;
  @Column({ type: 'varchar' })
  ServeursSiege: string;
  @Column({ type: 'varchar' })
  FireWall: string;
  @Column({ type: 'varchar' })
  Proxy: string;
  @Column({ type: 'varchar' })
  Internet: string;
  @Column({ type: 'varchar' })
  PlateformeCP: string;
  @Column({ type: 'varchar' })
  TTN: string;
  @Column({ type: 'varchar' })
  Branches: string;
  @Column({ type: 'varchar' })
  CNI: string;
  @Column({ type: 'varchar' })
  RelaiS_MTP_DMZ: string;
  @Column({ type: 'varchar' })
  ServeurAntivirus: string;
}

/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('autorisation')
export class DemandeAutorisationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  lieuAffectation: string;

  @Column({})
  Date: Date;

  @Column({})
  DateOK: Date;

  @Column({})
  Definitive: Date;

  @Column({})
  temporaireDe: Date;

  @Column({})
  temporaireAu: Date;

  @Column()
  signature: boolean;

  @Column()
  internet: boolean;

  @Column()
  reseau: boolean;

  @Column()
  verif: boolean;
  @Column()
  verif1: boolean;
  @Column()
  verif2: boolean;

  @ManyToOne((type) => UserEntity, (user) => user.autorisationUser, {
    nullable: true,
    eager: true,
  })
  user: UserEntity;

  @ManyToOne((type) => UserEntity, (user) => user.autorisationResponsable, {
    nullable: true,
    eager: true,
  })
  responsable: UserEntity;
}

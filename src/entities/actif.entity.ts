/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';
import { UserEntity } from './user.entity';

@Entity('actif')
export class ActifEntity extends TimestampEntity {
  @PrimaryGeneratedColumn({
  })
  id: string;

  @Column({ type: 'varchar' })
  reference: string;
  @Column({ type: 'varchar' })
  nom: string;

  @Column({ type: 'varchar' })
  type: string;

  @Column({ type: 'varchar' })
  adresseIP: string;

  @Column({ type: 'varchar' })
  localisation: string;

  @Column({ type: 'varchar' })
  genre: string;

  @Column({ type: 'varchar' })
  serveurApplication: string;

  @Column({ type: 'varchar' })
  bd: string;

  @Column({ type: 'varchar' })
  os: string;

  @Column({ type: 'varchar' })
  dmia: string;

  @Column({})
  criticiteCID: number;

  @ManyToOne((type) => UserEntity, (user) => user.actif, {
    nullable: true,
    eager: true,
  })
  proprietaire: UserEntity;
}

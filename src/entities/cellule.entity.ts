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

  @Column({})
  reference: number;

  @ManyToOne((type) => UserEntity, (user) => user.presidentC, {
    nullable: true,
    eager: true,
  })
  president: UserEntity;

  @ManyToOne((type) => UserEntity, (user) => user.membre1C, {
    nullable: true,
    eager: true,
  })
  membre1: UserEntity;

  @ManyToOne((type) => UserEntity, (user) => user.membre2C, {
    nullable: true,
    eager: true,
  })
  membre2: UserEntity;

 

  @OneToMany((type) => ReunionEntity, (reunion) => reunion.cellule, {
    cascade: true,
  })
  reunionC: ReunionEntity[];
}

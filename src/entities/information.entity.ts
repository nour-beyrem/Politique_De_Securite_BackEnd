/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('information')
export class InformationEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({})
  reference: number;

  @Column({})
  criticiteCID: number;

  @Column({})
  criticiteBUSINESS: number;


  @Column({ type: 'varchar' })
  marquage: string;
}

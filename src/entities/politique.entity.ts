/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { DocumentRoleEnum } from 'src/user/enum/document-role.enum';

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from './timestamp.entity';

@Entity('politique')
export class PolitiqueEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  typeChapitre: string;

  @Column({ type: 'varchar' })
  document: string;

  @Column({ type: 'varchar' })
  commentaire: string;

 

  @Column({type: 'enum',
        enum: DocumentRoleEnum})
       qui: string;
}


import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { NoteStatus } from './notes.model';

@Entity()
export class Notes extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    note_title: string;

    @Column()
    description: string;

    @Column()
    status:  NoteStatus;

    @Column()
    dateCreated: Date;

}
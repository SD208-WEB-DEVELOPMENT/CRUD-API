/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException} from "@nestjs/common";
import { CreateNotesDto } from "./dto/createnotes.dto";
import {v4 as uuidv4} from 'uuid';
import { NoteStatus } from "./notes.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Notes } from './notes.entity'
import { Repository } from "typeorm";

@Injectable()
export class NotesService {

    constructor(@InjectRepository(Notes) private noteRepository: Repository<Notes>){
        
    }


    async addNote(createNote: CreateNotesDto): Promise<Notes> {
        try {
            const newNotes = this.noteRepository.create({
                ...createNote,
                status: NoteStatus.OPEN,
                dateCreated: new Date()        
            });
            const rs = await this.noteRepository.save(newNotes);
            return rs;
        } catch (error) {
            // throw error
        }
    }

    async getNotes(): Promise<Notes[]> {
        try {
            const rs = await this.noteRepository.find();
            return rs;
        } catch (error) {
            // throw error
        }
    }

    async getSingleNote(id: number): Promise<Notes> {
       try {
         const note = await this.noteRepository.findOneBy({id});
         if(!note){
            throw new NotFoundException("Note Not Found");
         }
         return note;
       } catch (error) {
        
       }
    }

    async updateNote(id: number, status: NoteStatus) {
       try {
        const notes = this.getSingleNote(id);
        const rs = await this.noteRepository.update({id},{status});
        return{
            messgae: "Successfully updated the note"
        }
       } catch (error) {
        
       }
    }

    async deleteNote(id: number): Promise<void> {
       try {
         const rs = this.getSingleNote(id);
         await this.noteRepository.delete({id});
       } catch (error) {
        
       }
    }

    // private findNote(id: string): [Note, number] {
    //     const noteIndex = this.notes.findIndex(n => n.id === id);
    //     const note = this.notes[noteIndex];
    //     if (!note) {
    //         throw new NotFoundException('Could not find notes.');
    //     }
    //     return [note, noteIndex];
    // }
}
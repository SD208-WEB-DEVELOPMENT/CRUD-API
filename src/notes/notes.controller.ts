/* eslint-disable prettier/prettier */
import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { Query } from '@nestjs/common/decorators/http/route-params.decorator';
import { NoteStatusValidationPipe } from 'src/pipes/notes-status-validation-filter.pipe';


import { CreateNotesDto } from './dto/createnotes.dto';
import { GetNotesFilterDto } from './dto/get-notes-filter.dto';
import { Note, NoteStatus } from './notes.model';

import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post('create')

    @UsePipes(ValidationPipe)//for validation
    
    addNote(
        @Body()body: CreateNotesDto): Note{
        return this.notesService.addNote(body);
    }
        // @Body('note_title') noteTitle: string,
        // @Body('description') noteDesc: string,
    // ): { id: string; } {
    //     const generatedId = this.notesService.addNote(
    //         noteTitle,
    //         noteDesc,
    //     );
    //     return { id: generatedId};
    // }

    @Get()
    getAllNotes(@Query(ValidationPipe)filterDto: GetNotesFilterDto) {
        return this.notesService.getNotes(filterDto );
    }

    @Get(':id')
    getProduct(@Param('id') noteId: string) {
        return this.notesService.getSingleNote(noteId);
    }

    @Patch(':id')
    updateNote(
        @Param('id') noteId: string,
        @Body('title') noteTitle: string,
        @Body('status', NoteStatusValidationPipe) status: NoteStatus,
    ) {
        this.notesService.updateNote(noteId, noteTitle, status);
        return null;
    }

    @Delete(':id')
    removeNote(@Param('id') noteId: string) {
        this.notesService.deleteNote(noteId);
        return null;
    }
}
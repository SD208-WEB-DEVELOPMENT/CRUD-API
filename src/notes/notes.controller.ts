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
    ParseIntPipe,
} from '@nestjs/common';
import { NoteStatusValidationPipe } from 'src/pipes/notes-status-validation-filter.pipe';
import { CreateNotesDto } from './dto/createnotes.dto';
import { NoteStatus } from './notes.model';

import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) { }

    @Post('create')
    @UsePipes(ValidationPipe)//for validation
    addNote(
        @Body() body: CreateNotesDto) {
        return this.notesService.addNote(body);
    }

    @Get()
    getAllNotes() {
        return this.notesService.getNotes();
    }

    @Get(':id')
    getSingleNote(@Param('id', ParseIntPipe) id: number) {
        return this.notesService.getSingleNote(id);
    }

    @Patch(':id')
    updateNote(
        @Param('id', ParseIntPipe) noteId: number,
        @Body('status', NoteStatusValidationPipe) status: NoteStatus,
    ) {
        this.notesService.updateNote(noteId, status);
        return null;
    }

    @Delete(':id')
    removeNote(@Param('id', ParseIntPipe) noteId: number) {
        this.notesService.deleteNote(noteId);
        return null;
    }
}
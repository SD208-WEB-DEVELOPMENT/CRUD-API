import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { NoteStatus } from "../notes.model";

export class GetNotesFilterDto{

    @IsOptional()
    @IsIn(Object.values(NoteStatus))
    status: NoteStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
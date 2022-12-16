import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { NoteStatus } from "src/notes/notes.model";

export class NoteStatusValidationPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`${value} is not a valid status`)
        }
        return value;
    }

    private isStatusValid(status: any){
        return Object.values(NoteStatus).includes(status.toUpperCase() as NoteStatus);
    }
}
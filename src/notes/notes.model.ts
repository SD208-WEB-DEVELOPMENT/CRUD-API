/* eslint-disable prettier/prettier */
export interface Notes {
  
     id: string,
     note_title: string,
     description: string,
     status: NoteStatus
}

export enum NoteStatus{
     OPEN = "OPEN",
     IN_PROGRESS = "IN_PROGRESS",
     DONE = "DONE",
}
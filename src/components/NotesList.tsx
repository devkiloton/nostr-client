
import { NotesListProps } from "../types/NotesListProps";
import { NoteCard } from "./NoteCard";

export const NotesList = ({ notes }: NotesListProps) => {
    return (
        <div className= "flex flex-col gap-16" >
        {notes.map((note) => (
            <NoteCard key={crypto.randomUUID()} content={note.content} />
        ))}
        </div>
    )
}

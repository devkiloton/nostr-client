
import { nip19 } from "nostr-tools";
import { NotesListProps } from "../types/NotesListProps";
import { NoteCard } from "./NoteCard";

export const NotesList = ({ notes, metadataPbKey }: NotesListProps) => {
    return (
        <div className= "flex flex-col gap-4" >
        {notes.map((note) => (
            <NoteCard
                key={crypto.randomUUID()}
                created_at={note.created_at}
                user={{
                    name: metadataPbKey[note.pubkey]?.name ??  `${nip19.npubEncode(note.pubkey).slice(0,12)}...`,
                    picture: metadataPbKey[note.pubkey]?.picture ?? `https://api.dicebear.com/5.x/identicon/svg?seed=${note.pubkey}`,
                    pubKey: note.pubkey,
                }}
                hashtags={note.tags.filter((hashtag) => hashtag[0] === 't').map((hashtag) => hashtag[1])}
                content={note.content} />
        ))}
        </div>
    )
}

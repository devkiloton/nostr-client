import { Event } from "nostr-tools/event";
import { MetadataPbKey } from "./MetadataPbKey";
export type NotesListProps = {
  notes: Array<Event>;
  metadataPbKey: Record<string, MetadataPbKey>;
};

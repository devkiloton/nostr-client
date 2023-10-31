
import { NoteCardProps } from "../types/NoteCardProps";

export const NoteCard = ({ content, user, created_at }: NoteCardProps) => {
  return (
    <div className="rounded p-8 border border-gray-600 bg-gray-700 flex flex-col gap-4 w-full">
      <div className="flex gap-4 items-center">
        <img src={user.picture} alt="note" className="rounded-full w-20 aspect-square bg-gray-100"/>
        <div>
          <a
            href={`https://nostr.guru/p/${user.pubKey}`}
            className="text-lg font-bold text-blue-400"
            target="_blank"
            rel="noreferrer"
          >{user.name}</a>
        </div>
        <p>
          {new Date(created_at * 1000).toLocaleDateString()}
        </p>
      </div>
      <p className="text-start break-words">{content }</p>
    </div>
  );
};

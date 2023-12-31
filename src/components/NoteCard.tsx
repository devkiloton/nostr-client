
import { NoteCardProps } from "../types/NoteCardProps";

export const NoteCard = ({ content, user, created_at, hashtags }: NoteCardProps) => {
  return (
    <div className="rounded-2xl p-8 border-[2px] border-teal-500 bg-gray-900 flex flex-col gap-4 w-full">
      <div className="flex gap-4 items-start">
        <img src={user.picture} alt="note" className="rounded-full w-20 aspect-square bg-gray-100"/>
        <div className="flex flex-col items-start">
          <a
            href={`https://nostr.guru/p/${user.pubKey}`}
            className="text-lg font-bold text-teal-500 break-words max-w-lg text-start"
            target="_blank"
            rel="noreferrer"
          >{user.name}</a>
        <p>
          {new Date(created_at * 1000).toLocaleDateString()}
        </p>
        </div>
      </div>
      <p className="text-start break-words">{content}</p>
      <ul className="flex justify-start flex-wrap">
        {
          hashtags.filter((hashtag) => hashtag !== "").map((hashtag) => (
            <li key={crypto.randomUUID()} className="bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-200 mr-2 mb-2">
              #{hashtag}
            </li>
          ))
        }
      </ul>
    </div>
  );
};


import { NoteCardProps } from "../types/NoteCardProps";

export const NoteCard = ({ content }: NoteCardProps) => {
  return (
    <div className="rounded p-16 border-gray-600 bg-gray-700 flex flex-col gap-16 break-words">
      <p>{content}</p>
    </div>
  );
};

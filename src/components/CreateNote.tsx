import { useState } from "react";
import { SimplePool } from "nostr-tools";

interface Props {
  pool: SimplePool;
  hashtags: string[];
}

export default function CreateNote() {
  const [input, setInput] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitting");
  };

  return (
    <div className="mb-4">
      <h2 className="text-start text-lg text-white font-semibold mb-2">What's In Your Mind??</h2>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="Write your note here..."
          className="w-full p-3 rounded-xl"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={6}
        />
        <div className="flex justify-end mt-2">
          <button className="bg-teal-500 px-8 py-2 rounded-8 font-bold hover:bg-violet-600 active:scale-90">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
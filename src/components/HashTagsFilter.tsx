import React, { useState } from "react";

interface Props {
  hashtags: string[];
  onChange: (hashtags: string[]) => void;
}

export default function HashtagsFilter({ hashtags, onChange }: Props) {
  const [input, setInput] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onChange([...hashtags, input.toLowerCase()]);
    setInput("");
  };

  const removeHashtag = (hashtag: string) => {
    onChange(hashtags.filter((h) => h !== hashtag));
  };

  return (
    <div className="flex flex-col gap-2 mb-4">
      <h3 className="text-lg font-bold text-start text-white">Filtering hashtags</h3>
      <form onSubmit={onSubmit} className="flex gap-8 mb-2">
        <input
          type="text"
          className="grow px-3 py-1 rounded-lg"
          placeholder="Write a hashtag"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="bg-teal-500 py-2 rounded-8 font-bold hover:bg-violet-600 active:scale-90">
            + Add
          </button>
      </form>
      <ul className="flex flex-wrap gap-8">
        {hashtags.map((hashtag) => (
          <li
            className="bg-gray-700 text-white font-medium text-sm rounded-full px-2 py-2 flex items-center justify-center gap-x-2"
            key={hashtag}
          >
           <p className="ml-2">{hashtag}{" "}</p> 
            <button className="rounded-full px-[6px] leading-4 py-[2px] bg-teal-500" onClick={() => removeHashtag(hashtag)}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
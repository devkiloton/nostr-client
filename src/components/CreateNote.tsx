import { useState } from "react";
import { Event, EventTemplate, SimplePool, getEventHash } from "nostr-tools";
import { RELAYS } from "../constants/relays";

interface Props {
  pool: SimplePool;
  hashtags: string[];
}

export default function CreateNote({pool}: Props) {
  const [input, setInput] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!window.nostr) {
      alert("Nostr extension not found");
      return;
    }
    // Construct the event object
    const _baseEvent = {
      content: input,
      created_at: Math.round(Date.now() / 1000),
      kind: 1,
      tags: [['t', 'nostr']],
    } as EventTemplate;

    // Sign this event (allow the user to sign it with their private key)
    // // check if the user has a nostr extension
    try {
      const pubkey = await window.nostr.getPublicKey();

      const sig =  (await window.nostr.signEvent(_baseEvent)).sig;

      const event: Event = {
        ..._baseEvent,
        sig,
        pubkey,
        id: getEventHash({ ..._baseEvent, pubkey }),
      };

      let isCleared = false;
        for await (const req of pool.publish(RELAYS, event)) {
            if (isCleared === false) {
                setInput("");
                isCleared = true
            }
        }
        
    } catch (error) {
      alert("User rejected operation");
    }
      
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
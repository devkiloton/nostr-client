import { useEffect, useRef, useState } from 'react'
import './Home.css'
import { Event, SimplePool } from 'nostr-tools'
import { useDebounce } from 'use-debounce'
import { MetadataPbKey } from '../types/MetadataPbKey'
import { RELAYS } from '../constants/relays'
import { binaryTreeDescendingDate } from '../helpers/binaryTreeDescendingDate'
import HashtagsFilter from '../components/HashTagsFilter'
import CreateNote from '../components/CreateNote'
import { NotesList } from '../components/NotesList'


export function Home() {
  const [pool, setPool] = useState<SimplePool | null>(null)
  const [eventsImmediate, setEvents] = useState<Event[]>([])
  const [metadata, setMetadata] = useState<Record<string, MetadataPbKey>>({})
  const [hashtags, setHashtags] = useState<string[]>([])
  const [events] = useDebounce(eventsImmediate, 400)
  const metadataFetched = useRef<Record<string, boolean>>({})

  /**
   * Settin up relays pool
   */
  useEffect(() => {
    const _pool = new SimplePool()
    setPool(_pool)
  
    return () => {
      _pool.close(RELAYS)
    }
  }, [])

  /**
   * Subscribing to events
   */
  useEffect(() => {
    if (!pool) return
    setEvents([])
    const sub = pool.sub(RELAYS, [{
      kinds: [1],
      limit: 10,
      '#t': hashtags.length > 0 ? hashtags : undefined,
    }])

    sub.on('event', (data: Event) => {
      setEvents((curr) => binaryTreeDescendingDate(curr, data))
    })

    return () => {
      sub.unsub()
    }
  }, [hashtags,pool])

  useEffect(() => {
    if (!pool) return;

    const pubKeysToFetch = events.filter((event) => metadataFetched.current[event.pubkey] !== true).map((event) => event.pubkey)
    
    pubKeysToFetch.map((pubKey) => metadataFetched.current[pubKey] = true)

    const sub = pool.sub(RELAYS, [{
      kinds: [0],
      authors: pubKeysToFetch,
    }])

    sub.on('event', (data: Event) => {
      const metadata = JSON.parse(data.content) as MetadataPbKey

      setMetadata((curr) => ({
        ...curr,
        [data.pubkey]: metadata,
      }))
    })


    // eose = end of stored events
    sub.on('eose', () => { 
      sub.unsub()
    })

    return () => { }
  }, [events, pool])

  if(!pool) return <h1>Loading...</h1>

  return (
    <>
    <h1 className='text-start font-bold mb-4'>Nostr Feed</h1>
      <CreateNote hashtags={hashtags} pool={pool} />
      <HashtagsFilter hashtags={hashtags} onChange={setHashtags}/>
    <NotesList metadataPbKey={metadata} notes={events} />
    </>
  )
}

export default Home

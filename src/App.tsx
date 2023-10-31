import { useEffect, useState } from 'react'
import './App.css'
import { Event, SimplePool } from 'nostr-tools'
import { RELAYS } from './constants/relays'
import { NotesList } from './components/NotesList'
import { MetadataPbKey } from './types/MetadataPbKey'
import { binaryTreeDescendingDate } from './helpers/binaryTreeDescendingDate'


function App() {
  const [pool, setPool] = useState<SimplePool | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [metadata, setMetadata] = useState<Record<string, MetadataPbKey>>({})

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

    const sub = pool.sub(RELAYS, [{
      kinds: [1],
      limit: 100,
      '#t': ['nostr']
    }])

    sub.on('event', (data: Event) => {
      setEvents((curr) => binaryTreeDescendingDate(curr, data))
    })

    return () => {
      sub.unsub()
    }
  }, [pool])

  useEffect(() => {
    if (!pool) return;

    const pubKeysToFetch = events.map((event) => event.pubkey)

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

  return (
    <NotesList metadataPbKey={metadata} notes={events} />
  )
}

export default App

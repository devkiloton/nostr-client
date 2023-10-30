import { useEffect, useState } from 'react'
import './App.css'
import { Event, SimplePool } from 'nostr-tools'
import { RELAYS } from './constants/relays'
import { NotesList } from './components/NotesList'

function App() {
  const [pool, setPool] = useState<SimplePool | null>(null)
  const [events, setEvents] = useState<Event[]>([])

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
      // Filtering words
      // '#t': ['https']
    }])

    sub.on('event', (data: Event) => {
      setEvents((prev) => [data, ...prev])
    })

    return () => {
      sub.unsub()
    }
  }, [pool])

  return (
    <NotesList notes={events} />
  )
}

export default App

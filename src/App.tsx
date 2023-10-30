import { useEffect, useState } from 'react'
import './App.css'
import { Event, SimplePool } from 'nostr-tools'
import { RELAYS } from './constants/relays'

function App() {

  const [pool, setPool] = useState<SimplePool | null>(null)

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
      '#t': ['https']
    }])

    sub.on('event', (data: Event) => {
      console.log('data', data)
    })

    return () => {
      sub.unsub()
    }
  }, [pool])

  return (
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
  )
}

export default App

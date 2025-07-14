import { useEffect, useState, useMemo } from 'react'
import './App.css'
// import Message from './components/message.jsx'
import { parentAnimation, childAnimation } from './data/animation.js'
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const [playerList, setPlayerList] = useState([])
  const [player, setPlayer] = useState('')
  const [newPlayer, setNewPlayer] = useState('')
  const [topRankers, setTopRankers] = useState([])
  const sortedPlayers = useMemo(() => {
    return [...playerList].sort((a, b) => b.points - a.points);
  }, [playerList]);

  useEffect(() => {
    const data = async () => {
      const c = await fetch('leaderboard-production-eafb.up.railway.app/api/data', {
        method: 'GET'
      })
      const res = await c.json()
      setPlayerList(res)
      if (res.length > 0) setPlayer(res[0].name)
    }
    data()
  }, [])
  useEffect(() => {
    let topR = playerList.slice(0, 3)
    setTopRankers(topR)
  }, [playerList])


  const boxes = () => {
    return playerList.map(item => (
      <option key={item.name} value={item.name}>{item.name}</option>
    ))
  }

  const topRankerBoxes = () => {
    return topRankers.map(item => (
      <div key={item.name}>
        <span className='points'>{item.points}</span>
        <span className='name'>{item.name}</span>
      </div>
    ))
  }
  const playerRank = () => {


    return sortedPlayers.map((item, i) => (
      <motion.div
        key={item.name}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        className="player"
      >
        <span>{i + 1}. {item.name}</span>
        <span>{item.points}</span>
      </motion.div>
    ));
  }

  async function handleClaim(name) {
    if (!name) return;

    const res = await fetch('leaderboard-production-eafb.up.railway.app/api/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ player: name })
    });
    const result = await res.json();
    setPlayerList(result.data)
    setNewPlayer('')
  }

  return (
    <motion.div variants={parentAnimation} initial='initial' animate='animate' exit='initial' className='container'>
      <motion.div variants={childAnimation} key={'title'} className='title'>
        XYZ Leaderboard
      </motion.div>
      <motion.div variants={childAnimation} key={'head'} className='head'>
        <select
          className='players'
          onChange={(e) => setPlayer(e.currentTarget.value)}
          name='players'
          id='players'
        >
          {playerList ? null : <option disabled value='' selected>No Player..</option>}
          {boxes()}
        </select>
        <input type='text' name='newPlayer' onChange={(e) => setNewPlayer(e.currentTarget.value)} id='newPlayer' placeholder='Add New Player' autoFocus value={newPlayer} />

        {newPlayer === '' ?
          <button
            type='button'
            className='claim'
            onClick={() => handleClaim(player)}>Claim</button> :
          <button type='button'
            onClick={() => handleClaim(newPlayer)}>+ Add</button>}

      </motion.div>
      <motion.div variants={childAnimation} key={'body'} className='body'>
        <div className='topRanker'>
          {topRankers.length === 0 ? null : topRankerBoxes()}
        </div>
        <section className='leaderboard'>

          {playerList.length === 0 ? <span className='noPlayers' style={{ color: 'rgba(255,255,255,0.4)' }}>No Players today...</span> : (
            <div className='boardhead'>
              <span>Name</span>
              <span>Points</span>
            </div>
          )}
          {player === '' ? null : (
            <AnimatePresence>
              {playerRank()}
            </AnimatePresence>
          )}

        </section>
      </motion.div>
    </motion.div>
  )
}

export default App

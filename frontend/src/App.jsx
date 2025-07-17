import {Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/home.jsx'
import { PlayPage } from './pages/playPage.jsx'
import { LeaderboardPage } from './pages/leaderboardPage.jsx'

export function App() {

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/:selected-game" element={<PlayPage />} />
          <Route path="/:selected-game/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>

    </>
  )
}



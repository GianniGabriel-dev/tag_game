import {Routes, Route} from 'react-router-dom'
import { HomePage } from './pages/home.jsx'
import { PlayPage } from './pages/playPage.jsx'
import { LeaderboardPage } from './pages/leaderboardPage.jsx'
import { Header } from './components/header.jsx'

export function App() {

  return (
    <>
      <Header/>
      <main>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/:selectedGame" element={<PlayPage />} />
          <Route path="/:selectedGame/leaderboard" element={<LeaderboardPage />} />
        </Routes>
      </main>

    </>
  )
}



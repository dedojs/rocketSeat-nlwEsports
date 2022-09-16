import './styles/main.css';
import { useState, useEffect } from 'react'
import logoImg from './assets/Logo.svg';
import { GameBanner } from './components/GameBanner';
import { Modal } from './components/Modal';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }
}

function App() {

  const [ games, setGames ] = useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games/')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
  }, [])

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">

      <img src={logoImg} alt="Logo NSW" />
      <h1 className='text-6xl text-white font-black mt-20 bg-nlw-gradient bg-clip-text '>
        Seu <span className='text-transparent'>duo</span> esta aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {
          games.map(({id, bannerUrl, title, _count}) => 
            <GameBanner
              key={ id }
              bannerUrl={ bannerUrl }
              title={ title }
              adsCount={ _count.ads }
            />
          )
        }
      </div>

      <Modal />
     
    </div>
  )
}

export default App

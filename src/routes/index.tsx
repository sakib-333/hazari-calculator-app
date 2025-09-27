import AddGameDialog from '@/components/AddGameDialog'
import GameCard from '@/components/GameCard'
import { Button } from '@/components/ui/button'
import type { InitState } from '@/interfaces/dataType'
import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const Route = createFileRoute('/')({
  component: MainComponent,
})

function MainComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const allGames = useSelector((state: InitState) => state.games ?? []);
  
  return (
    <section className='space-y-4 mt-4'>
      <div className='flex justify-end'>
        <Button size={"sm"} onClick={() => setOpen(true)}>
          <CirclePlus /><span>Add Game</span>
        </Button>
      </div>
      <AddGameDialog open={open} setOpen={setOpen} />
      <div>
        {
          allGames.map((game) => <GameCard key={game.gameId} game = {game}/>)
        }
      </div>
    </section>
  )
}

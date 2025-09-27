import AddScoreDialog from '@/components/AddScoreDialog'
import ScoreDetailsTable from '@/components/ScoreDetailsTable'
import ToalScoreTable from '@/components/ToalScoreTable'
import { Button } from '@/components/ui/button'
import type { InitState } from '@/interfaces/dataType'
import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const Route = createFileRoute('/games/$gameId')({
  component: GameDetails,
})

function GameDetails() {
  const [open, setOpen] = useState <boolean> (false);
  const { gameId } = Route.useParams();
  const game = useSelector((state: InitState) => state.games.find(g =>g.gameId === gameId));

  return (
    <section className='mt-4 space-y-4'>
      <div className='flex justify-end'>
        <Button size={"sm"} disabled = {game?.gameOver} onClick={() => setOpen(true)}>
          <CirclePlus /><span>Add Score</span>
        </Button>
      </div>
      <AddScoreDialog 
        open = {open}
        setOpen = {setOpen}
        gameId = {gameId}
      />
      <ToalScoreTable />
      <ScoreDetailsTable />
    </section>
  )
}

import AddScoreDialog from '@/components/AddScoreDialog'
import DeleteGameDialog from '@/components/DeleteGameDialog'
import ScoreDetailsTable from '@/components/ScoreDetailsTable'
import ToalScoreTable from '@/components/ToalScoreTable'
import { Button } from '@/components/ui/button'
import type { InitState } from '@/interfaces/dataType'
import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus, RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export const Route = createFileRoute('/games/$gameId')({
  component: GameDetails,
})

function GameDetails() {
  const [open, setOpen] = useState <boolean> (false);
  const { gameId } = Route.useParams();
  const game = useSelector((state: InitState) => state.games.find(g =>g.gameId === gameId));
  const [openGameDeleteDialog, setOpenGameDeleteDialog] = useState<boolean>(false);


  const handleClose = () => {
    setOpenGameDeleteDialog(false);
  }

  return (
    <section className='mt-4 space-y-4'>
      <div className='flex justify-end'>
        <div className='flex gap-2'>
          <Button size={"sm"} disabled = {game?.gameOver} onClick={() => setOpen(true)}>
            <CirclePlus /><span>Add Score</span>
          </Button>
          <Button size="sm" variant="destructive" onClick={() =>setOpenGameDeleteDialog(true)}>
            <Trash2 /> <span>Delete</span>
          </Button>
        </div>
      </div>
        <DeleteGameDialog 
          gameId={gameId}
          open = {openGameDeleteDialog}
          handleClose={handleClose}
        />
      <AddScoreDialog 
        open = {open}
        setOpen = {setOpen}
        gameId = {gameId}
      />
      <ToalScoreTable />
      <div className='flex justify-end'>
        <div className='space-x-2'>
          <Button size="sm" variant="destructive">
            <RotateCcw /> <span>Reset</span>
          </Button>
          <Button size="sm" variant="outline">
            <Trash2 /> <span>Delete Last Score</span>
          </Button>
        </div>
      </div>
      <ScoreDetailsTable />
    </section>
  )
}

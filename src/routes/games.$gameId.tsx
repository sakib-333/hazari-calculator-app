import AddScoreDialog from '@/components/AddScoreDialog'
import ConfirmDialog from '@/components/ConfirmDialog'
import ScoreDetailsTable from '@/components/ScoreDetailsTable'
import ToalScoreTable from '@/components/ToalScoreTable'
import { Button } from '@/components/ui/button'
import type { InitState } from '@/interfaces/dataType'
import { deleteGame, deleteLastScore, resetScores } from '@/redux/actions'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { CirclePlus, RotateCcw, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const Route = createFileRoute('/games/$gameId')({
  component: GameDetails,
})

function GameDetails() {
  const [open, setOpen] = useState <boolean> (false);
  const [open1, setOpen1] = useState <boolean> (false);
  const [open2, setOpen2] = useState <boolean> (false);
  const [open3, setOpen3] = useState <boolean> (false);
  const { gameId } = Route.useParams();
  const game = useSelector((state: InitState) => state.games.find(g =>g.gameId === gameId));
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleDeleteGame = () => {
    dispatch(deleteGame(gameId));
    setOpen1(false)
    navigate({to: "/"});
  }

  const handleResetScores = () => {
    dispatch(resetScores(gameId));
    setOpen2(false);
  }

  const handleDeleteLastScores = () => {
    dispatch(deleteLastScore(gameId));
    setOpen3(false);
  }

  return (
    <section className='mt-4 space-y-4'>
      <div className='flex justify-end'>
        <div className='flex gap-2'>
          <Button size={"sm"} disabled = {game?.gameOver} onClick={() => setOpen(true)}>
            <CirclePlus /><span>Add Score</span>
          </Button>
          <Button size="sm" variant="destructive" onClick={() =>setOpen1(true)}>
            <Trash2 /> <span>Delete</span>
          </Button>
        </div>
        {/* Delete game dialog */}
        <ConfirmDialog 
          open = {open1}
          description='This game will be deleted!'
          handleClose={() => setOpen1(false)}
          onConfirm={handleDeleteGame}
        />
      </div>
        
      <AddScoreDialog 
        open = {open}
        setOpen = {setOpen}
        gameId = {gameId}
      />
      <ToalScoreTable />
      <div className='flex justify-end'>
        <div className='space-x-2'>
          <Button size="sm" variant="destructive" onClick={() =>setOpen2(true)}>
            <RotateCcw /> <span>Reset</span>
          </Button>
          <Button size="sm" variant="outline" onClick={() => setOpen3(true)}>
            <Trash2 /> <span>Delete Last Score</span>
          </Button>
        </div>
        {/* Reset scores dialog */}
        <ConfirmDialog 
          open = {open2}
          description='All the scores will be deleted.'
          handleClose={() => setOpen2(false)}
          onConfirm={handleResetScores}
        />

        {/* Delete last scores dialog */}
        <ConfirmDialog 
          open = {open3}
          description='Only last scores will be deleted.'
          handleClose={() => setOpen3(false)}
          onConfirm={handleDeleteLastScores}
        />
      </div>
      <ScoreDetailsTable />
    </section>
  )
}

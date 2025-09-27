import AddScoreDialog from '@/components/AddScoreDialog'
import ScoreDetailsTable from '@/components/ScoreDetailsTable'
import ToalScoreTable from '@/components/ToalScoreTable'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/games/$gameId')({
  component: GameDetails,
})

function GameDetails() {
  const [open, setOpen] = useState <boolean> (false);
  // const { gameId } = Route.useParams()
  return (
    <section className='mt-4 space-y-4'>
      <div className='flex justify-end'>
        <Button size={"sm"} onClick={() => setOpen(true)}>
          <CirclePlus /><span>Add Score</span>
        </Button>
      </div>
      <AddScoreDialog 
        open = {open}
        setOpen = {setOpen}
      />
      <ToalScoreTable />
      <ScoreDetailsTable />
    </section>
  )
}

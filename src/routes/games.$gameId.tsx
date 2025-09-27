import ScoreDetailsTable from '@/components/ScoreDetailsTable'
import ToalScoreTable from '@/components/ToalScoreTable'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'

export const Route = createFileRoute('/games/$gameId')({
  component: GameDetails,
})

function GameDetails() {
  // const { gameId } = Route.useParams()
  return (
    <section className='mt-4 space-y-4'>
      <div className='flex justify-end'>
        <Button size={"sm"}>
          <CirclePlus /><span>Add Score</span>
        </Button>
      </div>
      <ToalScoreTable />
      <ScoreDetailsTable />
    </section>
  )
}

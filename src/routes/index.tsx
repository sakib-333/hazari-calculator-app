import AddGameDialog from '@/components/AddGameDialog'
import GameCard from '@/components/GameCard'
import { Button } from '@/components/ui/button'
import { createFileRoute } from '@tanstack/react-router'
import { CirclePlus } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/')({
  component: MainComponent,
})

function MainComponent() {
  const [open, setOpen] = useState<boolean>(false);
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
          [1,2,3,4,5,6].map((item) => <GameCard  key={item}/>)
        }
      </div>
    </section>
  )
}

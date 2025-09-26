import GameCard from '@/components/GameCard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: MainComponent,
})

function MainComponent() {
  return (
    <div>
      {
        [1,2,3,4,5,6].map((item) => <GameCard  key={item}/>)
      }
    </div>
  )
}

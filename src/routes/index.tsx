import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: MainComponent,
})

function MainComponent() {
  return (
    <div>
      <ul>
        <li>
          <Link to='/games/$gameId' params={{gameId: "1"}}>Game-1</Link>
        </li>
        <li>
          <Link to='/games/$gameId' params={{gameId: "2"}}>Game-2</Link>
        </li>
        <li>
          <Link to='/games/$gameId' params={{gameId: "3"}}>Game-3</Link>
        </li>
        <li>
          <Link to='/games/$gameId' params={{gameId: "4"}}>Game-4</Link>
        </li>
        <li>
          <Link to='/games/$gameId' params={{gameId: "5"}}>Game-5</Link>
        </li>
      </ul>
    </div>
  )
}

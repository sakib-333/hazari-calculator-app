import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { Game } from "@/interfaces/dataType";
import { Link } from "@tanstack/react-router";
import { Gamepad2, User, Clock } from "lucide-react";


export default function GameCard({ game }: { game: Game }) {
  // Static data for demo

  return (
     <Link to="/games/$gameId" params={{gameId: game.gameId}}>
          <Card className="w-full mx-auto hover:shadow-md mb-4">
               <CardHeader>
               <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    <Gamepad2 className="h-5 w-5" />
                    {game.gameName}
               </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
               <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <User className="h-4 w-4" /> Players
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm">
                    <li
                         className="flex items-center gap-2 px-3 py-2 text-foreground"
                    >
                         <User className="h-4 w-4 text-muted-foreground" /> {game.score1.playerName}
                    </li>
                    <li
                         className="flex items-center gap-2 px-3 py-2 text-foreground"
                    >
                         <User className="h-4 w-4 text-muted-foreground" /> {game.score2.playerName}
                    </li>
                    <li
                         className="flex items-center gap-2 px-3 py-2 text-foreground"
                    >
                         <User className="h-4 w-4 text-muted-foreground" /> {game.score3.playerName}
                    </li>
                    <li
                         className="flex items-center gap-2 px-3 py-2 text-foreground"
                    >
                         <User className="h-4 w-4 text-muted-foreground" /> {game.score4.playerName}
                    </li>
                    </ul>
               </div>
               <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-4 w-4" /> Created at: {game?.createdAt}
               </div>
               </CardContent>
          </Card>
     </Link>
  );
}
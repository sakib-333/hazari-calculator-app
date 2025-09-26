import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { Gamepad2, User, Clock } from "lucide-react";

export default function GameCard() {
  // Static data for demo
  const game = {
    name: "Hazari Knight",
    players: ["Player-1", "Player-2", "Player-3", "Player-4"],
    createdAt: "2025-09-26 10:30 AM",
  };

  return (
     <Link to="/games/$gameId" params={{gameId: "1"}}>
          <Card className="w-full max-w-2xl mx-auto shadow-md">
               <CardHeader>
               <CardTitle className="flex items-center gap-2 text-xl font-bold">
                    <Gamepad2 className="h-5 w-5" />
                    {game.name}
               </CardTitle>
               </CardHeader>
               <CardContent className="space-y-4">
               <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                    <User className="h-4 w-4" /> Players
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm">
                    {game.players.map((player) => (
                    <li
                         key={player}
                         className="flex items-center gap-2 px-3 py-2 text-foreground"
                    >
                         <User className="h-4 w-4 text-muted-foreground" /> {player}
                    </li>
                    ))}
                    </ul>
               </div>
               <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-4 w-4" /> Created at: {game.createdAt}
               </div>
               </CardContent>
          </Card>
     </Link>
  );
}
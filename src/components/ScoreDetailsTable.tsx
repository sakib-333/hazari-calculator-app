import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { InitState } from "@/interfaces/dataType";
import { useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";


export default function ScoreDetailsTable() {
     const location = useLocation();
     const gameId = location.pathname.split("/games/")[1] ?? "0";
     const game = useSelector((state:InitState) => state.games.find((g) => g.gameId === gameId));

     if(!game) {
          return <h1>No data Found</h1>
     }

     const rows = game.score1.scores.map((_, indx) =>({
          round: indx,
          score1: game.score1.scores[indx],
          score2: game.score2.scores[indx],
          score3: game.score3.scores[indx],
          score4: game.score4.scores[indx],
     }))

     return (
          <div className="w-full mx-auto text-center">
               <Table className="border border-border">
                    <TableHeader className="bg-muted/50">
                         <TableRow className="border-b border-border">
                              <TableHead className="w-[60px] border-r border-border text-center">Round</TableHead>
                              <TableHead className="border-r border-border text-center">{game.score1.playerName}</TableHead>
                              <TableHead className="border-r border-border text-center">{game.score2.playerName}</TableHead>
                              <TableHead className="border-r border-border text-center">{game.score3.playerName}</TableHead>
                              <TableHead className="text-center">{game.score4.playerName}</TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {rows.map((row) => (
                         <TableRow key={row.round} className="border-b border-border">
                              <TableCell className="font-medium border-r border-border">{row.round}</TableCell>
                              <TableCell className="border-r border-border">{row.score1}</TableCell>
                              <TableCell className="border-r border-border">{row.score2}</TableCell>
                              <TableCell className="border-r border-border">{row.score3}</TableCell>
                              <TableCell>{row.score4}</TableCell>
                         </TableRow>
                         ))}
                    </TableBody>
               </Table>
          </div>
     )
}
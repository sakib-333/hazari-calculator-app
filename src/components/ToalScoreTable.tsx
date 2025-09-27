import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { InitState } from "@/interfaces/dataType";
import { useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";

export default function ToalScoreTable() {
    const location = useLocation();
    const gameId = location.pathname.split("/games/")[1] ?? "0";
    const game = useSelector((state:InitState) => state.games.find((g) => g.gameId === gameId));

    if(!game) {
        return <h1>No data Found</h1>
    }

    function getTotal(score: number[]): number {
      return (score.reduce((acc, curr) => acc + curr, 0));
    }

  const rows = [
    { no: 1, player: game.score1.playerName, score: getTotal(game.score1.scores), require: 1000 - getTotal(game.score1.scores) < 0 ? 0 : 1000 - getTotal(game.score1.scores)},
    { no: 2, player: game.score2.playerName, score: getTotal(game.score2.scores), require: 1000 - getTotal(game.score2.scores) < 0 ? 0 : 1000 - getTotal(game.score2.scores)},
    { no: 3, player: game.score3.playerName, score: getTotal(game.score3.scores), require: 1000 - getTotal(game.score3.scores) < 0 ? 0 : 1000 - getTotal(game.score3.scores)},
    { no: 4, player: game.score4.playerName, score: getTotal(game.score4.scores), require: 1000 - getTotal(game.score4.scores) < 0 ? 0 : 1000 - getTotal(game.score4.scores)},
  ].sort((a, b) => b.score - a.score);

  return (
    <div className="w-full mx-auto text-center">
      <Table className="border border-border">
        <TableHeader className="bg-muted/50">
          <TableRow className="border-b border-border">
            <TableHead className="w-[60px] border-r border-border text-center">No.</TableHead>
            <TableHead className="border-r border-border text-center">Player</TableHead>
            <TableHead className="border-r border-border text-center">Score</TableHead>
            <TableHead className="text-center">Require</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.no} className="border-b border-border">
              <TableCell className="font-medium border-r border-border">{row.no}</TableCell>
              <TableCell className="border-r border-border">{row.player}</TableCell>
              <TableCell className="border-r border-border">{row.score}</TableCell>
              <TableCell>{row.require}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
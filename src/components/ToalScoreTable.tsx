import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function ToalScoreTable() {
  const rows = [
    { no: 1, player: "Player-1", score: 550, require: 450 },
    { no: 2, player: "Player-2", score: 550, require: 450 },
    { no: 3, player: "Player-3", score: 550, require: 450 },
    { no: 4, player: "Player-4", score: 550, require: 450 },
  ];

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
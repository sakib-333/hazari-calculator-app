import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function ScoreDetailsTable() {
     const rows = [
          { round: 1, score1: 180, score2: 90, score3: 90, score4: 0 },
          { round: 2, score1: 80, score2: 90, score3: 90, score4: 100 },
          { round: 3, score1: 80, score2: 90, score3: 90, score4: 100 },
          { round: 4, score1: 80, score2: 90, score3: 90, score4: 100 },
          { round: 5, score1: 80, score2: 90, score3: 90, score4: 100 },
     ];
     return (
          <div className="w-full mx-auto text-center">
               <Table className="border border-border">
                    <TableHeader className="bg-muted/50">
                         <TableRow className="border-b border-border">
                              <TableHead className="w-[60px] border-r border-border text-center">Round</TableHead>
                              <TableHead className="border-r border-border text-center">Player-1</TableHead>
                              <TableHead className="border-r border-border text-center">Player-2</TableHead>
                              <TableHead className="border-r border-border text-center">Player-3</TableHead>
                              <TableHead className="text-center">Player-4</TableHead>
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
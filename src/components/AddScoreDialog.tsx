import * as React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { addScore } from "@/redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import type { InitState } from "@/interfaces/dataType";

type Scores = { score1: string; score2: string; score3: string; score4: string };

interface AddScoreDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
  gameId: string;
}

export default function AddScoreDialog({ open, setOpen, gameId }: AddScoreDialogProps) {
  const [scores, setScores] = React.useState<Scores>({ score1: "", score2: "", score3: "", score4: "" });
  const [total, setTotal] = React.useState<string>("0");
  const dispatch = useDispatch();
  const game = useSelector((state: InitState) => state.games.find(g => g.gameId === gameId));

  React.useEffect(() => {
     const total = Number(scores.score1)+Number(scores.score2)+Number(scores.score3)+Number(scores.score4)
     setTotal(String(total));
  }, [scores])

  function setField<K extends keyof Scores>(key: K, value: string) {
    setScores((s) => ({ ...s, [key]: value }));
}


function handleClear(index: number) {
     const key = ("score" + (index + 1)) as keyof Scores;
     setField(key, "");
}

function handleAuto(index: number) {
     const key = ("score" + (index + 1)) as keyof Scores;
     const remaining = 360 - Number(total);
     setScores((s) => ({ ...s, [key]: String(remaining) }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const {score1, score2, score3, score4} = scores;

    const condition1 = Number(score1)%5 || Number(score2)%5 || Number(score3)%5 || Number(score4)%5;
    const condition2 = Number(score1) + Number(score2) + Number(score3) + Number(score4) === 360;

    if(!condition1 && condition2) {
    const newScores = [Number(score1), Number(score2), Number(score3), Number(score4)];

    // console.log(newScores);

    dispatch(addScore(gameId, newScores));
    } else {
     toast("Invaild score");
    }

//     if(scores.score1)
    setOpen(false);
    setScores({ score1: "", score2: "", score3: "", score4: "" });
  }

  const rows = [
    { id: "score1", label: game?.score1.playerName },
    { id: "score2", label: game?.score2.playerName },
    { id: "score3", label: game?.score3.playerName },
    { id: "score4", label: game?.score4.playerName },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-center">Add Score</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-3">
            {rows.map((row, idx) => (
              <div key={row.id} className="space-y-2">
                <Label htmlFor={row.id} className="text-sm font-medium">
                  {row.label}
                </Label>
                <div className="flex gap-2">
                  <Input
                    id={row.id}
                    inputMode="numeric"
                    type="number"
                    placeholder="0"
                    value={scores[row.id]}
                    onChange={(e) => setField(row.id, e.target.value)}
                    className="rounded"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      className="rounded"
                      onClick={() => handleAuto(idx)}
                    >
                      Auto
                    </Button>
                    <Button type="button" variant="outline" onClick={() => handleClear(idx)}>
                      Clear
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <DialogFooter className="gap-2 sm:space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

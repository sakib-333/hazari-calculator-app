import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Scores = { p1: string; p2: string; p3: string; p4: string };

interface AddScoreDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function AddScoreDialog({ open, setOpen }: AddScoreDialogProps) {
  const [scores, setScores] = React.useState<Scores>({ p1: "", p2: "", p3: "", p4: "" });

  function setField<K extends keyof Scores>(key: K, value: string) {
    setScores((s) => ({ ...s, [key]: value }));
  }


  function handleClear(index: number) {
    const key = ("p" + (index + 1)) as keyof Scores;
    setField(key, "");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setOpen(false);
    setScores({ p1: "", p2: "", p3: "", p4: "" });
  }

  const rows = [
    { id: "p1", label: "Player-1" },
    { id: "p2", label: "Player-2" },
    { id: "p3", label: "Player-3" },
    { id: "p4", label: "Player-4" },
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
              <div key={row.id} className="">
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

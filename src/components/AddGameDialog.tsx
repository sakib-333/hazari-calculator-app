// AddGameDialog.tsx
import React from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Game } from "@/interfaces/dataType";
import { v4 as randomId } from 'uuid';
import { useDispatch } from "react-redux";
import { addNewGame } from "@/redux/actions";

interface AddGameDialogProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

type FormState = {
  gameName: string;
  player1: string;
  player2: string;
  player3: string;
  player4: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export default function AddGameDialog({ open, setOpen }: AddGameDialogProps) {
  const [form, setForm] = React.useState<FormState>({
    gameName: "",
    player1: "",
    player2: "",
    player3: "",
    player4: "",
  });

  const [errors, setErrors] = React.useState<Errors>({});
  const dispatch = useDispatch();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    // Clear error for this field as user types
    setErrors((err) => ({ ...err, [name]: undefined }));
  }

  function validate(values: FormState): Errors {
    const next: Errors = {};
    if (!values.gameName.trim()) next.gameName = "Game name is required.";
    if (!values.player1.trim()) next.player1 = "Player-1 is required.";
    if (!values.player2.trim()) next.player2 = "Player-2 is required.";
    if (!values.player3.trim()) next.player3 = "Player-3 is required.";
    if (!values.player4.trim()) next.player4 = "Player-4 is required.";
    return next;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors = validate(form);
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      // Do NOT close the dialog
      return;
    }

    // Replace with your create-game logic
    const newGame: Game = {
      gameId: randomId(),
      score1: {
        playerName: form.player1,
        scores: [],
      },
      score2: {
        playerName: form.player2,
        scores: [],
      },
      score3: {
        playerName: form.player3,
        scores: [],
      },
      score4: {
        playerName: form.player4,
        scores: [],
      },
      gameOver: false,
    }
    // console.log("Create game: ", newGame);
    dispatch(addNewGame(newGame));

    // Close only on success
    setOpen(false);

    // Optionally reset
    setForm({
      gameName: "",
      player1: "",
      player2: "",
      player3: "",
      player4: "",
    });
    setErrors({});
  }

  const fieldClass = (key: keyof FormState) =>
    ` ${errors[key] ? "border-destructive focus-visible:ring-destructive" : ""}`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Create New Game</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="gameName">Game name</Label>
            <Input
              id="gameName"
              name="gameName"
              placeholder="Enter game name"
              value={form.gameName}
              onChange={handleChange}
              aria-invalid={!!errors.gameName}
              className={fieldClass("gameName")}
            />
            {errors.gameName && (
              <p className="text-xs text-destructive">{errors.gameName}</p>
            )}
          </div>

          <Separator />

          <div className="grid gap-3">
            <div className="grid gap-2">
              <Label htmlFor="player1">Player-1</Label>
              <Input
                id="player1"
                name="player1"
                placeholder="Enter player-1"
                value={form.player1}
                onChange={handleChange}
                aria-invalid={!!errors.player1}
                className={fieldClass("player1")}
              />
              {errors.player1 && (
                <p className="text-xs text-destructive">{errors.player1}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="player2">Player-2</Label>
              <Input
                id="player2"
                name="player2"
                placeholder="Enter player-2"
                value={form.player2}
                onChange={handleChange}
                aria-invalid={!!errors.player2}
                className={fieldClass("player2")}
              />
              {errors.player2 && (
                <p className="text-xs text-destructive">{errors.player2}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="player3">Player-3</Label>
              <Input
                id="player3"
                name="player3"
                placeholder="Enter player-3"
                value={form.player3}
                onChange={handleChange}
                aria-invalid={!!errors.player3}
                className={fieldClass("player3")}
              />
              {errors.player3 && (
                <p className="text-xs text-destructive">{errors.player3}</p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="player4">Player-4</Label>
              <Input
                id="player4"
                name="player4"
                placeholder="Enter player-4"
                value={form.player4}
                onChange={handleChange}
                aria-invalid={!!errors.player4}
                className={fieldClass("player4")}
              />
              {errors.player4 && (
                <p className="text-xs text-destructive">{errors.player4}</p>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2 sm:space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Game</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

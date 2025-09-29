import type React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useDispatch } from "react-redux";
import { deleteGame } from "@/redux/actions";

interface DeleteGameDialogProps {
     gameId: string;
     open: boolean;
     handleClose: () => void;
}

const DeleteGameDialog:React.FC<DeleteGameDialogProps> = ({gameId, open, handleClose }) => {
     const navigate = useNavigate();
     const dispatch = useDispatch();

     const onConfirm = () => {
          dispatch(deleteGame(gameId));
          navigate({to: "/"});
          handleClose();
     }
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. The game will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DeleteGameDialog
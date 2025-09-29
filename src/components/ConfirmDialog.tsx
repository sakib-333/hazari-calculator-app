import type React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";

interface ConfirmDialogProps {
     open: boolean;
     description: string;
     onConfirm: () => void;
     handleClose: () => void;
}

const ConfirmDialog:React.FC<ConfirmDialogProps> = ({open, description, onConfirm, handleClose }) => {
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
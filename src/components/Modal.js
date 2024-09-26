import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function Modal({ trigger, title, description, content, openModal, setOpenModal }) {
  const [internalOpen, setInternalOpen] = useState(false);

  useEffect(() => {
    if (openModal !== undefined) {
      setInternalOpen(openModal);
    }
  }, [openModal]);

  const handleOpenChange = (open) => {
    if (setOpenModal) {
      setOpenModal(open);
    }
    setInternalOpen(open);
  };

  return (
    <Dialog open={internalOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}

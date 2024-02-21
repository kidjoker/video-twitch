"use client";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps {
  userId: string;
}

export const UnblockButton = ({ userId }: UnblockButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((unblockUser) =>
          toast.success(`User ${unblockUser.blocked.userId} unblocked`)
        )
        .catch(() => toast.error("Something went wrong"));
    });
  };

  return (
    <Button
        disabled={isPending}
        onClick={onClick}
        variant="ghost"
        size="sm"
        className="text-blue-500 w-full"
    >
        Unblock
    </Button>
  )
};

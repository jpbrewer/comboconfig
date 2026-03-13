"use client";

import { useCallback } from "react";
import { SubmitButton } from "../../devlink/SubmitButton";

interface SubmitButtonWrapperProps {
  hasChanges: boolean;
  onSubmit: () => void;
}

export function SubmitButtonWrapper({
  hasChanges,
  onSubmit,
}: SubmitButtonWrapperProps) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (hasChanges) {
        onSubmit();
      }
    },
    [hasChanges, onSubmit]
  );

  return (
    <div onClick={handleClick}>
      <SubmitButton variant={hasChanges ? "Active" : "Inactive"} />
    </div>
  );
}

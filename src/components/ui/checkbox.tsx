"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void;
}

export function Checkbox({
  className,
  checked,
  onCheckedChange,
  onChange,
  ...props
}: CheckboxProps) {
  return (
    <input
      type="checkbox"
      checked={checked}
      className={cn(
        "size-4 rounded border border-input accent-primary",
        className,
      )}
      onChange={(e) => {
        onChange?.(e);
        onCheckedChange?.(e.target.checked);
      }}
      {...props}
    />
  );
}

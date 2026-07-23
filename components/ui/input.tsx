import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "flex h-12 w-full rounded-full border border-white/10 bg-[#0A0A0A] px-4 text-sm text-[#F5F5F5] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20",
      className,
    )}
    {...props}
  />
));
Input.displayName = "Input";

export { Input };

import * as React from "react";
import { cn } from "@/lib/utils";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[120px] w-full rounded-[24px] border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-[#F5F5F5] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20",
      className,
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };

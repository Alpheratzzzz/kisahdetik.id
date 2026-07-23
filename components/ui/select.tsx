import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, children, ...props }, ref) => (
  <div className="relative w-full">
    <select
      ref={ref}
      className={cn(
        "flex h-12 w-full appearance-none rounded-full border border-white/10 bg-[#0A0A0A] px-4 pr-10 text-sm text-[#F5F5F5] outline-none transition focus:border-[#C9A227] focus:ring-2 focus:ring-[#C9A227]/20",
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C9A227]" />
  </div>
));
Select.displayName = "Select";

export { Select };

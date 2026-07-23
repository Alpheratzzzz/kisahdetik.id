import * as React from "react";
import { cn } from "@/lib/utils";

const buttonVariants = {
  default: "bg-[#C9A227] text-[#0A0A0A] hover:bg-[#D7AF38]",
  outline:
    "border border-[#C9A227] bg-transparent text-[#F5F5F5] hover:bg-[#C9A227]/10",
  ghost: "bg-transparent text-[#F5F5F5] hover:bg-white/10",
} as const;

const buttonSizes = {
  default: "h-11 px-5 py-3",
  icon: "h-10 w-10 p-0",
} as const;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
}

const Button = React.forwardRef<HTMLElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, ...props }, ref) => {
    const baseClassName = cn(
      "inline-flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0A] disabled:pointer-events-none disabled:opacity-50",
      buttonVariants[variant],
      buttonSizes[size],
      className,
    );

    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: cn(baseClassName, children.props.className),
        ...props,
      });
    }

    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} type={props.type ?? "button"} className={baseClassName} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };

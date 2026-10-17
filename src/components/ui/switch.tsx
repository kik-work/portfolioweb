import * as React from "react";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

interface SwitchProps
  extends Omit<React.ComponentProps<"button">, "onChange" | "role" | "type"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

// Native button with role="switch" — keeps the theme toggle in the entry chunk
// free of the Radix switch primitive.
const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked = false, onCheckedChange, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) onCheckedChange?.(!checked);
        }}
        className={cn(
          "peer inline-flex h-6 w-12 shrink-0 items-center rounded-full border border-transparent bg-input shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span
          data-state={checked ? "checked" : "unchecked"}
          className="pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-6"
        >
          <span className="flex items-center justify-center h-full w-full">
            {checked ? (
              <Moon className="h-4 w-4 text-primary" />
            ) : (
              <Sun className="h-4 w-4 text-primary" />
            )}
          </span>
        </span>
      </button>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };

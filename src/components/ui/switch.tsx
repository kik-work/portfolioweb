import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";
import { Sun, Moon } from "lucide-react";

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, ...props }, ref) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        checked={checked}
        className={cn(
          "peer inline-flex h-6 w-12 items-center rounded-full border border-transparent bg-input shadow-sm transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-background shadow-sm ring-0 transition-transform data-[state=checked]:translate-x-6"
          )}
        >
          <div className="flex items-center justify-center h-full w-full">
            {checked ? (
              <Moon className="h-4 w-4 text-primary" />
            ) : (
              <Sun className="h-4 w-4 text-primary" />
            )}
          </div>
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] cursor-pointer select-none transition-[background-color,color,box-shadow,scale] duration-300 ease-apple active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-4 focus-visible:ring-ring/35 aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary-hover",
        violet:
          "bg-violet text-white hover:bg-violet/90 focus-visible:ring-violet/35 dark:text-[#1d1d1f]",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-foreground/[0.05]",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-foreground/[0.12]",
        ghost: "text-foreground hover:bg-foreground/[0.06]",
        link: "text-link rounded-md hover:underline underline-offset-4",
      },
      size: {
        default: "h-10 px-5 text-[0.9375rem] has-[>svg]:px-4",
        sm: "h-8 gap-1.5 px-3.5 text-sm has-[>svg]:px-3",
        lg: "h-12 px-7 text-[1.0625rem] has-[>svg]:px-6",
        icon: "size-10",
        "icon-sm": "size-8",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

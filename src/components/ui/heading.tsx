import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const headingVariants = cva(
  "tracking-tight text-text-primary",
  {
    variants: {
      size: {
        h1: "text-4xl md:text-5xl lg:text-6xl font-bold",
        h2: "text-3xl md:text-4xl font-semibold",
        h3: "text-2xl md:text-3xl font-semibold",
        h4: "text-xl md:text-2xl font-semibold",
      },
      color: {
        default: "text-text-primary",
        primary: "text-primary",
        white: "text-white",
      }
    },
    defaultVariants: {
      size: "h2",
      color: "default",
    },
  }
)

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4"
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, size, color, as, ...props }, ref) => {
    const Component = as || (size === "h1" ? "h1" : size === "h2" ? "h2" : size === "h3" ? "h3" : "h4")
    return (
      <Component
        ref={ref}
        className={cn(headingVariants({ size, color, className }))}
        {...props}
      />
    )
  }
)
Heading.displayName = "Heading"

export { Heading }

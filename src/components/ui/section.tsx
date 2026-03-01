import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "default" | "alternate"
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "py-16 md:py-24",
          variant === "alternate" && "bg-white",
          className
        )}
        {...props}
      />
    )
  }
)
Section.displayName = "Section"

export { Section }

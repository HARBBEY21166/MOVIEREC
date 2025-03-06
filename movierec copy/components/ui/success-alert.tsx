import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { CheckCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        success: "border-green-500/50 text-green-600 dark:border-green-500 [&>svg]:text-green-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
)

const SuccessAlert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant = "success", ...props }, ref) => (
  <div ref={ref} role="alert" className={cn(alertVariants({ variant }), className)} {...props}>
    <CheckCircle className="h-4 w-4" />
    {props.children}
  </div>
))
SuccessAlert.displayName = "SuccessAlert"

const SuccessAlertTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h5 ref={ref} className={cn("mb-1 font-medium leading-none tracking-tight", className)} {...props} />
  ),
)
SuccessAlertTitle.displayName = "SuccessAlertTitle"

const SuccessAlertDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("text-sm [&_p]:leading-relaxed", className)} {...props} />
  ),
)
SuccessAlertDescription.displayName = "SuccessAlertDescription"

export { SuccessAlert, SuccessAlertTitle, SuccessAlertDescription }
import { cn } from "@/lib/utils";
import { motion, MotionProps } from "framer-motion";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  glow?: boolean;
  animate?: boolean;
  motionProps?: MotionProps;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, glow = false, animate = false, motionProps, children, ...props }, ref) => {
    const classes = cn(
      "glass-card rounded-2xl",
      hover && "cursor-pointer transition-all duration-300 hover:-translate-y-1",
      glow && "hover:shadow-glow-violet",
      className
    );

    if (animate) {
      return (
        <motion.div
          ref={ref as any}
          className={classes}
          {...motionProps}
          {...(props as any)}
        >
          {children}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("p-5 border-b border-white/5", className)}
    {...props}
  >
    {children}
  </div>
);

export const CardBody = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("p-5", className)} {...props}>
    {children}
  </div>
);

export const CardFooter = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("p-5 border-t border-white/5", className)}
    {...props}
  >
    {children}
  </div>
);

export default Card;
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, hint, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-xs font-medium text-gray-400">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full py-2.5 bg-[#0F0F1A] border rounded-xl text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:ring-1 transition-all",
              icon ? "pl-9 pr-4" : "px-4",
              error
                ? "border-red-500/40 focus:border-red-500/60 focus:ring-red-500/20"
                : "border-white/8 focus:border-violet-500/40 focus:ring-violet-500/20",
              className
            )}
            {...props}
          />
        </div>
        {error && <p className="text-red-400 text-xs">{error}</p>}
        {hint && !error && <p className="text-gray-600 text-xs">{hint}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;

import { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "destructive";
  icon?: ReactNode;
  isLoading?: boolean;
}

const ActionButton = ({
  children,
  className,
  variant = "primary",
  icon,
  isLoading = false,
  disabled,
  ...props
}: ActionButtonProps) => {
  const variantClasses = {
    primary: "bg-gradient-to-r from-parking-primary to-parking-secondary text-white dark:text-white hover:from-parking-secondary hover:to-parking-primary transition-all duration-500 shadow-md shadow-parking-primary/20 dark:shadow-parking-primary/10",
    secondary: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 shadow-sm",
    destructive: "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-md shadow-red-500/20",
  };

  return (
    <button
      className={cn(
        "relative flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-parking-primary dark:focus:ring-offset-gray-900",
        "shadow-sm hover:shadow-md active:shadow-inner disabled:opacity-50 disabled:cursor-not-allowed",
        "transform transition-all duration-300 active:scale-[0.98]",
        variantClasses[variant],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
          <svg
            className="animate-spin h-5 w-5 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </span>
      )}
      <span className={cn(isLoading && "invisible", "flex items-center gap-2")}>
        {icon && <span className="inline-block">{icon}</span>}
        {children}
      </span>
    </button>
  );
};

export default ActionButton;
